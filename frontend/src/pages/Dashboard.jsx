import { useEffect, useState } from "react";
import API from "../api";
import ProductForm from "../components/ProductForm";
import ProductList from "../components/ProductList";

function Dashboard() {
  const [stats, setStats] = useState({});
  const [refresh, setRefresh] = useState(false);

  const fetchStats = async () => {
    try {
      const res = await API.get("/dashboard/stats");
      setStats(res.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchStats();
  }, [refresh]);

  const logout = () => {
    localStorage.removeItem("adminToken");
    window.location.href = "/";
  };

  return (
    <div className="dashboard">
      <div className="navbar">
        <h2>Admin Dashboard</h2>
        <button onClick={logout}>Logout</button>
      </div>

      <div className="stats">
        <div className="card">Total Users: {stats.totalUsers}</div>
        <div className="card">Total Orders: {stats.totalOrders}</div>
        <div className="card">Total Products: {stats.totalProducts}</div>
        <div className="card">Total Revenue: ₹{stats.totalRevenue}</div>
      </div>

      <ProductForm setRefresh={setRefresh} />
      <ProductList refresh={refresh} setRefresh={setRefresh} />
    </div>
  );
}

export default Dashboard;