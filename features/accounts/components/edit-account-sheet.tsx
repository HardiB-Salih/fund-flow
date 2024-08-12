import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { insertAccountsSchema } from "@/db/schema";
import { Loader2 } from "lucide-react";
import { z } from "zod";
import { useEditAccount } from "../api/use-edit-account";
import { useGetAccountById } from "../api/use-get-account-by-id";
import { useOpenAccount } from "../hooks/use-open-account";
import AccountForm from "./account-form";
import { useDeleteAccount } from "../api/use-delete-account";
import { useConfirm } from "@/hooks/use-confirm";

const formSchema = insertAccountsSchema.pick({
  name: true,
});

type FormValues = z.input<typeof formSchema>;

export default function EditAccountSheet() {
  const { isOpen, onClose, id } = useOpenAccount();
  const [ConfirmDialog, confirm] = useConfirm(
    "Are you sure?",
    "You are about to delete this account",
  );

  const accountQuery = useGetAccountById(id);
  const editMutation = useEditAccount(id);
  const deleteMutation = useDeleteAccount(id);

  const isLoading = accountQuery.isLoading;
  const isPending = editMutation.isPending || deleteMutation.isPending;

  function onSubmit(values: FormValues) {
    editMutation.mutate(values, {
      onSuccess: () => {
        onClose();
      },
    });
  }

  async function handleDelete() {
    const ok = await confirm();

    if (ok) {
      deleteMutation.mutate(undefined, {
        onSuccess: () => {
          onClose();
        },
      });
    }
  }
  const defaultValues = accountQuery.data
    ? {
        name: accountQuery.data.name,
      }
    : { name: "" };

  return (
    <>
      <ConfirmDialog />
      <Sheet open={isOpen} onOpenChange={onClose}>
        <SheetContent className="space-y-4">
          <SheetHeader>
            <SheetTitle>Edit Account</SheetTitle>
            <SheetDescription>Edit an existing account.</SheetDescription>
          </SheetHeader>

          {isLoading ? (
            <div className="absolute inset-0 items-center justify-center">
              <Loader2 className="size-4 animate-spin text-muted-foreground" />
            </div>
          ) : (
            <AccountForm
              id={id}
              onSubmit={onSubmit}
              disabled={isPending}
              defaultValues={defaultValues}
              onDelete={handleDelete}
            />
          )}
        </SheetContent>
      </Sheet>
    </>
  );
}
