import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";

const ChartView = ({ data }) => {
  return (
    <div className="chart-section">
      <h2>Sales by Month</h2>

      <ResponsiveContainer width="100%" height={350}>
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="Month" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="Sales" fill="#4f46e5" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default ChartView;
