import "./global-css/footer.css";
import { Link } from "react-router-dom";
import "./global-css/header.css";
import logo from './assets/header/tarakabataanlogo2.png';

function Footer(){
    return (
        <div className="footer-sec">
            <img src="./src/assets/homepage/bot-cloud.png" className="footer-top-cloud" alt="Top Cloud" />
            <img src="./src/assets/homepage/footer-mid.png" className="footer-mid" alt="Top Cloud" />
                <div className="footer-section-main">
                    <div className="footer-content">
                        <div className="footer-left-content">
                            <img src={logo} alt="Tarakabataan Logo" className="footer-tk-logo" />
                            <div className="footer-number">
                                <img src="./src/assets/footer/Telephone.png" alt="Phone" />
                                <p>8888-1234</p>
                            </div>
                            <div className="footer-email">
                                <img src="./src/assets/footer/email.png" alt="Phone" />
                                <p>tarakabataan@gmail.com</p>
                            </div>
                        </div>
                        <div className="footer-mid-content">
                            <h2>About Us</h2>
                            <p>Ang Tara Kabataan (TK) ay isang organisasyon ng mga kabataan sa Maynila na itinatag para isulong ang kaginhawaan ng bawat kabataan at Manilenyo. </p>
                        </div>
                        <div className="footer-right-content">
                            <h2>Social Media</h2>
                            <div className="footer-facebook">
                                <img src="./src/assets/footer/facebook.png" alt="Phone" />
                                <p>Tara Kabataan</p>
                            </div>
                            <div className="footer-instagram">
                                <img src="./src/assets/footer/instagram.png" alt="instagram" />
                                <p>@tarakabataan</p>
                            </div>
                        </div>
                    </div>           
                </div>
            <img src="./src/assets/footer/botcloud.png" className="footer-bot-cloud" alt="Bot Cloud" />
        </div>
    )
}

export default Footer;


