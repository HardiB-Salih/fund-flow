import {
  PolarAngleAxis,
  PolarGrid,
  PolarRadiusAxis,
  Radar,
  RadarChart,
  ResponsiveContainer,
  Tooltip,
} from "recharts";
import CategoryTooltip from "./category-tooltip";

interface Props {
  data: {
    name: string;
    value: number;
  }[];
}

export default function RadarVariant({ data }: Props) {
  return (
    <ResponsiveContainer width={"100%"} height={350}>
      <RadarChart cx="50%" cy="50%" outerRadius="60%" data={data}>
        <PolarGrid />
        <PolarAngleAxis style={{ fontSize: "12px" }} dataKey="name" />
        <PolarRadiusAxis style={{ fontSize: "12px" }} />
        <Radar
          dataKey="value"
          stroke="#3b82f6"
          fill="#3b82f6"
          fillOpacity={0.6}
        />

        <Tooltip content={<CategoryTooltip />} />
      </RadarChart>
    </ResponsiveContainer>
  );
}
