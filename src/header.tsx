import "./css/header.css";
import logo from './assets/tarakabataanlogo2.png';



const Header = () => {
  return (
    <header className="header">
      <a href="/">
        <img src={logo} alt="Tarakabataan Logo" className="logo" />
      </a>
      <nav>
        <ul className="nav-links">
          <li><button className="nav-button">About</button></li>
          <li><button className="nav-button">Contact</button></li>
          <li><button className="nav-button">Events</button></li>
          <li><button className="nav-button">Blogs</button></li>
          <li><button className="nav-join">Join Now</button></li>

        </ul>
      </nav>
    </header>
  );
};

export default Header;
