import { NavLink, Link } from "react-router-dom";
import { useState } from "react";
import {
  FaBars,
  FaRegNewspaper,
  FaCalendarAlt,
  FaCog,
  FaSignOutAlt
} from "react-icons/fa";
import "./css/admin-sidebar.css";
import logo from "../assets/header/tarakabataanlogo2.png";

const AdminSidebar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => setIsOpen(!isOpen);

  return (
    <>
      {/* Hamburger button */}
      <button className="admin-sidebar-toggle" onClick={toggleSidebar}>
        <FaBars />
      </button>

      <div className={`admin-sidebar ${isOpen ? "open" : ""}`}>
        <header className="admin-sidebar-header">
          <Link to="/">
            <img src={logo} alt="Tarakabataan Logo" className="admin-logo" />
          </Link>
        </header>

        <NavLink
          to="blogs"
          className={({ isActive }) =>
            isActive ? "admin-link active" : "admin-link"
          }
          onClick={() => setIsOpen(false)}
        >
          <FaRegNewspaper className="admin-icon" />
          Blogs
        </NavLink>
        <NavLink
          to="events"
          className={({ isActive }) =>
            isActive ? "admin-link active" : "admin-link"
          }
          onClick={() => setIsOpen(false)}
        >
          <FaCalendarAlt className="admin-icon" />
          Events
        </NavLink>
        <NavLink
          to="settings"
          className={({ isActive }) =>
            isActive ? "admin-link active" : "admin-link"
          }
          onClick={() => setIsOpen(false)}
        >
          <FaCog className="admin-icon" />
          Settings
        </NavLink>

        {/* Logout link at bottom with smaller size */}
        <NavLink
          to="/"
          className="admin-logout-link"
          onClick={() => setIsOpen(false)}
        >
          <FaSignOutAlt className="admin-logout-icon" />
          Logout
        </NavLink>
      </div>
    </>
  );
};

export default AdminSidebar;
