import { useOpenCategory } from "@/features/categories/hooks/use-open-category";
import { useOpenTransaction } from "@/features/transactions/hooks/use-open-transaction";
import { cn } from "@/lib/utils";
import { TriangleAlertIcon } from "lucide-react";

interface CategoryColumnProps {
  id: string;
  category?: string | null;
  categoryId?: string | null;
}

export default function CategoryColumn({
  id,
  category,
  categoryId,
}: CategoryColumnProps) {
  const { onOpen: onOpenCategory } = useOpenCategory();
  const { onOpen: onOpenTransaction } = useOpenTransaction();
  const onClick = () => {
    if (categoryId) {
      onOpenCategory(categoryId);
    } else {
      onOpenTransaction(id);
    }
  };
  return (
    <div
      onClick={onClick}
      className={cn(
        "flex cursor-pointer items-center hover:underline",
        !category && "text-rose-500",
      )}
    >
      {!category && <TriangleAlertIcon className="mr-2 size-4 shrink-0" />}
      {category || "Uncategorize"}
    </div>
  );
}
