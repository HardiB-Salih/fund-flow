import { useOpenAccount } from "@/features/accounts/hooks/use-open-account";

interface AccountColumnProps {
  account: string;
  accountId: string;
}

export default function AccountColumn({
  account,
  accountId,
}: AccountColumnProps) {
  const { onOpen: onOpenAccount } = useOpenAccount();
  const onClick = () => {
    onOpenAccount(accountId);
  };
  return (
    <div
      onClick={onClick}
      className="flex cursor-pointer items-center hover:underline"
    >
      {account}
    </div>
  );
}
