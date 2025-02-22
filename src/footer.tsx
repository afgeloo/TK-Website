import "./css/footer.css";

const Footer = () => {
  return (
    <footer className="footer">
      <p>&copy; {new Date().getFullYear()} My Website. All rights reserved.</p>
      <ul className="footer-links">
        <li><button className="footer-button">Privacy Policy</button></li>
        <li><button className="footer-button">Terms of Service</button></li>
        <li><button className="footer-button">Support</button></li>
      </ul>
    </footer>
  );
};

export default Footer;
