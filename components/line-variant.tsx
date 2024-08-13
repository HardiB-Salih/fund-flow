import {
  Tooltip,
  XAxis,
  LineChart,
  ResponsiveContainer,
  CartesianGrid,
  Line,
} from "recharts";

import CustomTooltip from "./custom-tooltip";
import { format } from "date-fns";

interface Props {
  data: {
    date: string;
    income: number;
    expenses: number;
  }[];
}

export default function LineVariant({ data }: Props) {
  return (
    <ResponsiveContainer width={"100%"} height={350}>
      <LineChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis
          axisLine={false}
          tickLine={false}
          dataKey="date"
          tickFormatter={(value) => format(value, "dd MMM")}
          style={{ fontSize: "12px" }}
          tickMargin={16}
        />
        <Tooltip content={<CustomTooltip />} />
        <Line
          dataKey="income"
          dot={false}
          stroke="#3d82f6"
          strokeWidth={2}
          className="drop-shadow-sm"
        />
        <Line
          dataKey="expenses"
          dot={false}
          stroke="#f43f5e"
          strokeWidth={2}
          className="drop-shadow-sm"
        />
      </LineChart>
    </ResponsiveContainer>
  );
}
