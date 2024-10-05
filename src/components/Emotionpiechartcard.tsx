// src/components/EmotionPieChart.tsx
import React from "react";
import {
  PieChart,
  Pie,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Cell,
} from "recharts";
import { emotionColors } from "../assets/emotionColors";

type AggregatedEmotionEntry = {
  name: string;
  value: number;
  fill?: string;
};

interface EmotionPieChartProps {
  data: AggregatedEmotionEntry[];
  title: string;
}

const EmotionPieChart: React.FC<EmotionPieChartProps> = ({ data, title }) => {
  const dataWithColors = data.map((entry) => ({
    ...entry,
    fill: emotionColors[entry.name] || "#cccccc",
  }));

  return (
    <div style={{ width: "100%", height: "100%" }}>
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={dataWithColors}
            dataKey="value"
            nameKey="name"
            cx="50%"
            cy="50%"
            outerRadius={80}
            label
          />
          {dataWithColors.map((entry, index) => (
            <Cell key={index} fill={entry.fill} />
          ))}
          <Tooltip />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default EmotionPieChart;
