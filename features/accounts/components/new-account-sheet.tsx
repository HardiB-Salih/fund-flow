import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { insertAccountsSchema } from "@/db/schema";
import { z } from "zod";
import { useCreateAccount } from "../api/use-create-account";
import { useNewAccount } from "../hooks/use-new-account";
import AccountForm from "./account-form";

const formSchema = insertAccountsSchema.pick({
  name: true,
});

type FormValues = z.input<typeof formSchema>;

export default function NewAccountSheet() {
  const { isOpen, onClose } = useNewAccount();
  const mutation = useCreateAccount();

  function onSubmit(values: FormValues) {
    mutation.mutate(values, {
      onSuccess: () => {
        onClose();
      },
      onError(error) {
        console.error(error);
      },
    });
  }
  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent className="space-y-4">
        <SheetHeader>
          <SheetTitle>New Account</SheetTitle>
          <SheetDescription>
            Create a new account to track your transactions.
          </SheetDescription>
        </SheetHeader>
        <AccountForm
          onSubmit={onSubmit}
          disabled={mutation.isPending}
          defaultValues={{ name: "" }}
        />
      </SheetContent>
    </Sheet>
  );
}
