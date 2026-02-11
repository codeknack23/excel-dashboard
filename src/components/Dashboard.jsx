import { useEffect, useState } from "react";
import { parseExcel } from "../utils/parseExcel";
import DataTable from "./DataTable";
import ChartView from "./ChartView";
import "../styles/dashboard.css";

const Dashboard = () => {
  const [data, setData] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      try {
        const result = await parseExcel();
        setData(result);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  const totalSales = data.reduce((sum, item) => sum + item.Sales, 0);
  const totalProfit = data.reduce((sum, item) => sum + item.Profit, 0);

  return (
    <div className="dashboard">
      <div className="dashboard-header">
        <h1>Excel Sales Dashboard</h1>
        <p>Auto-loaded file: sample-data.xlsx</p>
      </div>

      {loading && <p>Loading data...</p>}
      {error && <p className="error">{error}</p>}

      {data.length > 0 && (
        <>
          <div className="stats-container">
            <div className="stat-card">
              <h3>Total Sales</h3>
              <p>₹{totalSales.toLocaleString()}</p>
            </div>

            <div className="stat-card">
              <h3>Total Profit</h3>
              <p>₹{totalProfit.toLocaleString()}</p>
            </div>

            <div className="stat-card">
              <h3>Total Records</h3>
              <p>{data.length}</p>
            </div>
          </div>

          <div className="card">
            <ChartView data={data} />
          </div>

          <div className="card">
            <DataTable data={data} />
          </div>
        </>
      )}
    </div>
  );
};

export default Dashboard;
