import { Outlet } from "react-router-dom";
import AdminSidebar from "./admin-sidebar";
import "./css/adminpage.css";


const AdminPage = () => {
  return (
    <div className="admin-container">
      <AdminSidebar />
      <div className="admin-content">
        <Outlet />
      </div>
    </div>
  );
};

export default AdminPage;
