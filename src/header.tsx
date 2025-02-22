import "./css/header.css";

const Header = () => {
  return (
    <header className="header">
      <h1>My Website</h1>
      <nav>
        <ul className="nav-links">
          <li><button className="nav-button">Home</button></li>
          <li><button className="nav-button">About</button></li>
          <li><button className="nav-button">Services</button></li>
          <li><button className="nav-button">Contact</button></li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
