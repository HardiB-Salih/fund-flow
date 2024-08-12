"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useNewAccount } from "@/features/accounts/hooks/use-new-account";
import { Plus } from "lucide-react";
import { columns, Payment } from "./columns";
import { DataTable } from "@/components/data-table";

const data: Payment[] = [
  {
    id: "728ed52f",
    amount: 100,
    status: "success",
    email: "m@example.com",
  },
  {
    id: "728ed52fdfgh",
    amount: 10,
    status: "pending",
    email: "d@example.com",
  },
];

export default function AccountsPage() {
  const newAccount = useNewAccount();
  return (
    <div className="mx-auto -mt-24 w-full max-w-screen-2xl pb-10">
      <Card className="border-none drop-shadow-sm">
        <CardHeader className="gap-y-2 lg:flex-row lg:items-center lg:justify-between">
          <CardTitle className="line-clamp-1 text-xl">Accounts Page</CardTitle>
          <Button size="sm" onClick={newAccount.onOpen}>
            <Plus className="mr-2 size-4" /> Add new
          </Button>
        </CardHeader>
        <CardContent>
          <DataTable
            columns={columns}
            data={data}
            filterKey="email"
            onDelete={() => {}}
            disabled={false}
          />
        </CardContent>
      </Card>
    </div>
  );
}
