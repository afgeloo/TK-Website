import "./global-css/footer.css";
import { Link } from "react-router-dom";
import "./global-css/header.css";
import logo from "./assets/header/tarakabataanlogo2.png";

import topCloud from "./assets/homepage/bot-cloud.png";
import footerMid from "./assets/homepage/footer-mid.png";
import botCloud from "./assets/footer/botcloud.png";
import phoneIcon from "./assets/footer/Telephone.png";
import emailIcon from "./assets/footer/email.png";
import facebookIcon from "./assets/footer/facebook.png";
import instagramIcon from "./assets/footer/instagram.png";

function Footer() {
  return (
    <div className="footer-sec">
      <img src={topCloud} className="footer-top-cloud" alt="Top Cloud" />
      <img src={footerMid} className="footer-mid" alt="Footer Mid" />
      <div className="footer-section-main">
        <div className="footer-content">
          {/* Left Section */}
          <div className="footer-left-content">
            <img src={logo} alt="Tarakabataan Logo" className="footer-tk-logo" />
            <div className="footer-number">
              <img src={phoneIcon} alt="Phone" />
              <p>8888-1234</p>
            </div>
            <div className="footer-email">
              <img src={emailIcon} alt="Email" />
              <p>tarakabataan@gmail.com</p>
            </div>
          </div>
          
          {/* Middle Section */}
          <div className="footer-mid-content">
            <h2>About Us</h2>
            <p>Ang Tara Kabataan (TK) ay isang organisasyon ng mga kabataan sa Maynila na itinatag para isulong ang kaginhawaan ng bawat kabataan at Manilenyo.</p>
          </div>
          
          {/* Right Section */}
          <div className="footer-right-content">
            <h2>Social Media</h2>
            <div className="footer-facebook">
              <img src={facebookIcon} alt="Facebook" />
              <p>Tara Kabataan</p>
            </div>
            <div className="footer-instagram">
              <img src={instagramIcon} alt="Instagram" />
              <p>@tarakabataan</p>
            </div>
          </div>
        </div>
      </div>
      <img src={botCloud} className="footer-bot-cloud" alt="Bottom Cloud" />
    </div>
  );
}

export default Footer;
