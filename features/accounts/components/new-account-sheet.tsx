import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { useNewAccount } from "../hooks/use-new-account";
import AccountForm from "./account-form";
import { insertAccountsSchema } from "@/db/schema";
import { z } from "zod";
import { useCreateAccount } from "../api/use-create-account";
import { toast } from "sonner";
import { client } from "@/lib/hono";
import kyInstance from "@/lib/ky";

const formSchema = insertAccountsSchema.pick({
  name: true,
});

type FormValues = z.input<typeof formSchema>;

interface NewAccountSheetProps {
  // Define your props here
}

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
