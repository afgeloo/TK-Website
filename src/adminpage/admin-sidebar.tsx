import { NavLink } from "react-router-dom";
import "./css/admin-sidebar.css";


const AdminSidebar = () => {
  return (
    <div className="admin-sidebar">
      <NavLink to="blogs" className="admin-link">Blogs</NavLink>
      <NavLink to="events" className="admin-link">Events</NavLink>
      <NavLink to="settings" className="admin-link">Settings</NavLink>
    </div>
  );
};

export default AdminSidebar;
