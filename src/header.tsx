import { Link } from "react-router-dom";
import "./global-css/header.css";
import logo from "./assets/header/tarakabataanlogo2.png";

const navLinks = [
  { path: "/About", label: "About" },
  { path: "/Contact", label: "Contact" },
  { path: "/Events", label: "Events" },
  { path: "/Blogs", label: "Blogs" },
];

const Header = () => {
  return (
    <header className="header">
      <Link to="/">
        <img src={logo} alt="Tarakabataan Logo" className="logo" />
      </Link>
      <nav>
        <ul className="nav-links">
          {navLinks.map(({ path, label }) => (
            <li key={path}>
              <Link to={path} className="nav-button">
                {label}
              </Link>
            </li>
          ))}
          <a
            href="https://docs.google.com/forms/d/e/1FAIpQLSewrSWYnmn5lVqOTbSh9751x80e-IhIp_atvMFaDf3M0n6uVg/viewform"
            target="_blank"
            rel="noopener noreferrer"
            className="nav-join"
          >
            Join Now
          </a>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
