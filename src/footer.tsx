import "./css/footer.css";
import logo from './assets/tarakabataanlogo2.png';
import emailIcon from './assets/email.png';
import facebookIcon from './assets/facebook.png';
import locationIcon from './assets/Location.png';
import phoneIcon from './assets/Telephone.png';
import twitterIcon from './assets/twitter.png';
import xIcon from './assets/x.png';
import cloudTop from './assets/topcloud.png';  // Import top cloud
import cloudBottom from './assets/botcloud.png';  // Import bottom cloud
import curve from './assets/Subtract.png';  // Import bottom cloud

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        {/* curve */}
        <img src={curve} alt="Curve Footer" className="curve" />
        {/* Top Cloud */}
        <img src={cloudTop} alt="Top Cloud" className="cloud-top" />

        <div className="footer-container">
          {/* Left Section: Logo & Contact Info */}
          <div className="footer-section">
            <a href="/">
              <img src={logo} alt="Tarakabataan Logo" className="logo-footer" />
            </a>
            <ul className="contact-info">
              <li>
                <div className="contact-item">
                  <img src={locationIcon} alt="Location Icon" className="contact-icon" />
                  <span>2077 Smith St., Malate Manila</span>
                </div>
              </li>
              <li>
                <div className="contact-item">
                  <img src={phoneIcon} alt="Phone Icon" className="contact-icon" />
                  <span>8888-1234</span>
                </div>
              </li>
              <li>
                <div className="contact-item">
                  <img src={emailIcon} alt="Email Icon" className="contact-icon" />
                  <span>TaraKabataan@gmail.com</span>
                </div>
              </li>
            </ul>
          </div>

          {/* Middle Section: About */}
          <div className="footer-section2">
            <h3>About Us</h3>
            <p>
              Ang Tara Kabataan (TK) ay isang organisasyon ng mga kabataan sa Maynila
              na itinatag para isulong ang kaginhawaan ng bawat kabataan at Manileño.
            </p>
          </div>

{/* Right Section: Social Media */}
<div className="footer-section2">
  <h3>Social Media</h3>
  <ul className="social-media">
    <li>
      <a href="https://www.facebook.com/TaraKabataanMNL" target="_blank" rel="noopener noreferrer">
        <img src={facebookIcon} alt="Facebook Icon" className="social-media" />
        <span>Tara Kabataan</span>
      </a>
    </li>
    <li>
      <a href="https://www.facebook.com/TaraKabataanMNL" target="_blank" rel="noopener noreferrer">
        <img src={twitterIcon} alt="Instagram Icon" className="social-media" />
        <span>@tarakabataan</span>
      </a>
    </li>
    <li>
      <a href="https://www.facebook.com/TaraKabataanMNL" target="_blank" rel="noopener noreferrer">
        <img src={xIcon} alt="X (Twitter) Icon" className="social-media" />
        <span>@TaraKabataan</span>
      </a>
    </li>
  </ul>
</div>

        </div>
      </div>
 {/* Bottom Cloud */}
 <img src={cloudBottom} alt="Bottom Cloud" className="cloud-bottom" />
    </footer>
  );
};

export default Footer;
