"use client";

import DataCharts from "@/components/data-charts";
import DataGrid from "@/components/data-grid";
import { useNewAccount } from "@/features/accounts/hooks/use-new-account";

export default function DashboardPage() {
  const { onOpen } = useNewAccount();

  return (
    <div className="mx-auto -mt-24 w-full max-w-screen-2xl pb-10">
      <DataGrid />
      <DataCharts />
    </div>
  );
}
