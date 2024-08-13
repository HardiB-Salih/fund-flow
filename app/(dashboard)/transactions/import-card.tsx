import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import ImportTabel from "./import-tabel";
import { convertAmountToMilliunit } from "@/lib/utils";
import { format, parse } from "date-fns";

const dateFormat = "yyyy-MM-dd HH:mm:ss";
const outputFormat = "yyyy-MM-dd";

const requiredOptions = ["amount", "date", "payee"];
interface SelectColumState {
  [key: string]: string | null;
}

interface ImportCardProps {
  data: string[][];
  onCancel: () => void;
  onSubmit: (data: any) => void;
}

export default function ImportCard({
  data,
  onCancel,
  onSubmit,
}: ImportCardProps) {
  const [selectedColumns, setSelectedColumns] = useState<SelectColumState>({});
  const headers = data[0];
  const body = data.slice(1);
  const onTableHeadSelectChange = (
    columnIndex: number,
    value: string | null,
  ) => {
    setSelectedColumns((prev) => {
      const newSelectedColumns = { ...prev };

      for (const key in newSelectedColumns) {
        if (newSelectedColumns[key] === value) {
          newSelectedColumns[key] = null;
        }
      }

      if (value === "skip") {
        value = null;
      }

      newSelectedColumns[`column_${columnIndex}`] = value;
      return newSelectedColumns;
    });
  };

  const progress = Object.values(selectedColumns).filter(Boolean).length;

  const handleContnue = () => {
    const getColumnIndex = (column: string) => {
      return column.split("_")[1];
    };

    const mappedData = {
      headers: headers.map((_header, index) => {
        const columnIndex = getColumnIndex(`column_${index}`);
        return selectedColumns[`column_${columnIndex}`] || null;
      }),

      body: body
        .map((row) => {
          const transformRow = row.map((cell, index) => {
            const columnIndex = getColumnIndex(`column_${index}`);
            return selectedColumns[`column_${columnIndex}`] ? cell : null;
          });

          return transformRow.every((item) => item === null)
            ? []
            : transformRow;
        })
        .filter((row) => row.length > 0),
    };

    const arrayOfData = mappedData.body.map((row) => {
      return row.reduce((acc: any, cell, index) => {
        const header = mappedData.headers[index];
        if (header !== null) {
          acc[header] = cell;
        }
        return acc;
      }, {});
    });

    const foratedData = arrayOfData.map((item) => ({
      ...item,
      amount: convertAmountToMilliunit(item.amount),
      date: format(parse(item.date, dateFormat, new Date()), outputFormat),
    }));
    // console.log({ foratedData });
    onSubmit(foratedData);
  };

  return (
    <div className="mx-auto -mt-24 w-full max-w-screen-2xl pb-10">
      <Card className="border-none drop-shadow-sm">
        <CardHeader className="gap-y-2 lg:flex-row lg:items-center lg:justify-between">
          <CardTitle className="line-clamp-1 text-xl">
            Import transactions
          </CardTitle>

          <div className="flex items-center justify-center gap-x-2">
            <Button size="sm" onClick={onCancel} className="flex-1">
              Cancel
            </Button>
            <Button
              className="flex-1"
              size="sm"
              onClick={handleContnue}
              disabled={progress < requiredOptions.length}
            >
              Continue ({progress} / {requiredOptions.length})
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <ImportTabel
            headers={headers}
            body={body}
            selectedColumns={selectedColumns}
            onTableHeadSelectChange={onTableHeadSelectChange}
          />
        </CardContent>
      </Card>
    </div>
  );
}
