import { Link } from "react-router-dom";
import "./global-css/header.css";
import logo from './assets/header/tarakabataanlogo2.png';

const Header = () => {
  return (
    <header className="header">
      <a href="/">
        <img src={logo} alt="Tarakabataan Logo" className="logo" />
      </a>
      <nav>
        <ul className="nav-links">
          <li><Link to="/About" className="nav-button">About</Link></li>
          <li><Link to="/Contact" className="nav-button">Contact</Link></li>
          <li><Link to="/Events" className="nav-button">Events</Link></li>
          <li><Link to="/Blogs" className="nav-button">Blogs</Link></li>
          <li><Link to="/Join" className="nav-join">Join Now</Link></li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
