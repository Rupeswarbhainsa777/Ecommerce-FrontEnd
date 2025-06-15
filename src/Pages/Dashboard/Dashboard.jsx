import { useEffect, useState } from "react";
import { fetchDashBoard } from "../../service/DashBoard.js";
import toast from "react-hot-toast";
import './Dashboard.css';

const Dashboard = () => {
    const [data, setData] = useState({
        todaySales: 0,
        todayOrderCount: 0,
        recentOrder: []
    });

    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadData = async () => {
            try {
                const response = await fetchDashBoard();
                console.log("Dashboard response:", response);
                setData(response.data || {
                    todaySales: 0,
                    todayOrderCount: 0,
                    recentOrder: []
                });
            } catch (error) {
                console.error(error);
                toast.error("Unable to view the data");
            } finally {
                setLoading(false);
            }
        };
        loadData();
    }, []);

    if (loading) {
        return <div className="loading">Loading dashboard...</div>;
    }

    return (
        <div className="dashboard-wrapper">
            <div className="dashboard-container">
                <div className="stats-grid">
                    <div className="stat-card">
                        <div className="stat-icon">
                            <i className="bi bi-currency-rupee"></i>
                        </div>
                        <div className="stat-content">
                            <h3>Today's Sales</h3>
                            <p>₹{data.todaySales?.toFixed(2)}</p>
                        </div>
                    </div>

                    <div className="stat-card">
                        <div className="stat-icon">
                            <i className="bi bi-cart-check"></i>
                        </div>
                        <div className="stat-content">
                            <h3>Today's Orders</h3>
                            <p>{data.todayOrderCount}</p>
                        </div>
                    </div>
                </div>

                <div className="recent-orders-card">
                    <h3 className="recent-orders-title">
                        <i className="bi bi-clock-history"></i>
                        Recent Orders
                    </h3>

                    <div className="orders-table-container">
                        <table className="orders-table">
                            <thead>
                            <tr>
                                <th>Order Id</th>
                                <th>Customer</th>
                                <th>Amount</th>
                                <th>Phone</th>
                                <th>Time</th>
                            </tr>
                            </thead>
                            <tbody>
                            {data.recentOrder?.length > 0 ? (
                                data.recentOrder.map((order) => (
                                    <tr key={order.orderId}>
                                        <td>{order.orderId?.substring(0, 8)}...</td>
                                        <td>{order.customerName}</td>
                                        <td>₹{order.subtotal?.toFixed(2)}</td>
                                        <td>{order.phoneNumber || "N/A"}</td>
                                        <td>
                                            {order.createAt
                                                ? new Date(order.createAt).toLocaleString([], {
                                                    hour: "2-digit",
                                                    minute: "2-digit",
                                                    day: "2-digit",
                                                    month: "short",
                                                    year: "numeric"
                                                })
                                                : "N/A"}
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="5">No recent orders found.</td>
                                </tr>
                            )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;

























