"use client";

import { DataTable } from "@/components/data-table";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { useBulkDeleteTransactions } from "@/features/transactions/api/use-bulk-delete-transactions";
import { useGetTransactions } from "@/features/transactions/api/use-get-transactions";
import { useNewTransaction } from "@/features/transactions/hooks/use-new-transaction";
import { client } from "@/lib/hono";
import { InferResponseType } from "hono";
import { Loader2, Plus } from "lucide-react";
import { columns } from "./columns";
import { useState } from "react";
import UploadButton from "./upload-button";
import ImportCard from "./import-card";
import { transactions as transactionsSchema } from "@/db/schema";
import { useSelectAccount } from "@/features/accounts/hooks/use-select-account";
import { toast } from "sonner";
import { useBulkCreateTransactions } from "@/features/transactions/api/use-bulk-create-transactions";

enum VARIANTS {
  LIST = "LIST",
  IMPORT = "IMPORT",
}

const INITAL_IMPORT_RESULTS = {
  data: [],
  errors: [],
  meta: {},
};

export type ResponseType = InferResponseType<
  typeof client.api.accounts.$get,
  200
>;
export default function TransactionPage() {
  const [variant, setVariant] = useState<VARIANTS>(VARIANTS.LIST);
  const [importResults, setImportResults] = useState(INITAL_IMPORT_RESULTS);

  const [AccountDialog, confirm] = useSelectAccount();
  const newTransaction = useNewTransaction();
  const transactionsQuery = useGetTransactions();
  const transactions = transactionsQuery.data || [];
  const deleteTransactions = useBulkDeleteTransactions();
  const bulkCreateMutation = useBulkCreateTransactions();

  const isDisabled =
    transactionsQuery.isLoading || deleteTransactions.isPending;

  const onUploadCSVImport = (results: typeof INITAL_IMPORT_RESULTS) => {
    // console.log(results);
    setImportResults(results);
    setVariant(VARIANTS.IMPORT);
  };

  const onCancelCSVImport = () => {
    setImportResults(INITAL_IMPORT_RESULTS);
    setVariant(VARIANTS.LIST);
  };

  const onSubmitCSVImport = async (
    values: (typeof transactionsSchema.$inferInsert)[],
  ) => {
    const accountId = await confirm();

    if (!accountId) {
      return toast.error("Please select an account to continue.");
    }

    const data = values.map((value) => ({
      ...value,
      accountId: accountId as string,
    }));

    bulkCreateMutation.mutate(data, {
      onSuccess: () => {
        onCancelCSVImport();
      },
    });
  };

  if (transactionsQuery.isLoading) {
    return (
      <div className="mx-auto -mt-24 w-full max-w-screen-2xl pb-10">
        <Card className="border-none drop-shadow-sm">
          <CardHeader>
            <Skeleton className="h-8 w-[200px]" />
          </CardHeader>
          <CardContent>
            <div className="flex h-[500px] w-full items-center justify-center">
              <Loader2 className="size-6 animate-spin text-slate-600" />
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (variant === VARIANTS.IMPORT) {
    return (
      <>
        <AccountDialog />
        <ImportCard
          data={importResults.data}
          onCancel={onCancelCSVImport}
          onSubmit={onSubmitCSVImport}
        />
      </>
    );
  }

  return (
    <div className="mx-auto -mt-24 w-full max-w-screen-2xl pb-10">
      <Card className="border-none drop-shadow-sm">
        <CardHeader className="gap-y-2 lg:flex-row lg:items-center lg:justify-between">
          <CardTitle className="line-clamp-1 text-xl">
            Transactions History
          </CardTitle>

          <div className="flex items-center justify-center gap-x-2">
            <Button
              size="sm"
              className="flex-1"
              onClick={newTransaction.onOpen}
            >
              <Plus className="mr-2 size-4" /> Add new
            </Button>
            <UploadButton className="flex-1" onUpload={onUploadCSVImport} />
          </div>
        </CardHeader>
        <CardContent>
          <DataTable
            columns={columns}
            data={transactions}
            filterKey="payee"
            onDelete={(row) => {
              const ids = row.map((r) => r.original.id);
              deleteTransactions.mutate({ ids });
            }}
            disabled={isDisabled}
          />
        </CardContent>
      </Card>
    </div>
  );
}
