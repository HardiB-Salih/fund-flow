import { Button } from "@/components/ui/button";
import { Upload } from "lucide-react";
import { useCSVReader } from "react-papaparse";

interface UploadButtonProps {
  onUpload: (results: any) => void;
  className?: string;
}

export default function UploadButton({
  onUpload,
  className,
}: UploadButtonProps) {
  const { CSVReader } = useCSVReader();

  //TODO: Add a paywall
  return (
    <CSVReader onUploadAccepted={onUpload}>
      {({ getRootProps }: any) => (
        <Button size="sm" className={className} {...getRootProps()}>
          <Upload className="mr-2 size-4" />
          Import
        </Button>
      )}
    </CSVReader>
  );
}
