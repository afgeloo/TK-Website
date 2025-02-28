import './css/welcome-sec.css';
import Marquee from "react-fast-marquee";
import { Link } from "react-router-dom";


function WelcomeSec() {
    return (
        <div className="welcome-sec">
            {/* Moving Flowers */}
            <div className="flower-container top-layer">
                <Marquee gradient={false} speed={50} loop={0}>
                    <div className="flowers1">
                        {[...Array(6)].map((_, index) => (
                            <img key={index} src="./src/assets/homepage/flowers.png" alt="Flower" />
                        ))}
                        <div style={{ width: "50px" }}></div>
                    </div>
                </Marquee>
            </div>
            <div className="flower-container bottom-layer">
                <Marquee gradient={false} speed={90} loop={0} direction="left">
                    <div className="flowers2">
                        {[...Array(6)].map((_, index) => (
                            <img key={index} src="./src/assets/homepage/flowers.png" alt="Flower" />
                        ))}
                        <div style={{ width: "50px" }}></div>
                    </div>
                </Marquee>
            </div>

            {/* Existing Content */}
            <div className="welcome1">
                <img src="./src/assets/homepage/welcome.png" alt="Welcome" />
            </div>
            <div className="cow">
                <img src="./src/assets/homepage/cow.png" alt="Cow" />
            </div>
            <div className="welcome3">
                <img src="./src/assets/homepage/welcome1.png" alt="Welcome 1" />
            </div>

            {/* Clouds & Content Section */}
            <div className="clouds-content-container">
                <img src="./src/assets/homepage/top-cloud.png" className="top-cloud" alt="Top Cloud" />
                {/* Content Area */}
                <div className="content-section-main">
                    <div className="content-section">
                        <div className="tk-logo">
                            <img src="./src/assets/homepage/tk-logo-label.png" alt="Tara Kabataan" />
                        </div>
                        <div className="whatsTK">
                            <h2>What is TARA KABATAAN?</h2>
                            <p>Ang <strong>Tara Kabataan (TK)</strong> ay isang organisasyon ng mga kabataan sa Maynila na itinatag para isulong ang kaginhawaan ng bawat kabataan at Manilenyo. Pinapahalagahan ng samahan ang pakikipagkapwa ng mga Pilipino na nakasandig sa ating karapatan at pagkakapantay-pantay. Naniniwala ang TK sa kakayahan ng bawat kabataan, sa loob at labas ng paaralan, na siyang higit na dapat mabigyan ng oportunidad na malinang at mapaunlad. Mula rito, mas makikilala ng kabataan ang kaniyang sarili at matatanaw ang kaniyang mahalagang papel sa komunidad, lipunan, at bayan. Mula sa sarili tungo sa bayan ang siyang hinihikayat ng Tara Kabataan sa kaniyang kapwa. 
                            </p>
                        </div>
                    </div>
                    <div className="know-more">
                        <Link to="/About" className="nav-know-more">KNOW MORE</Link>
                    </div>
                </div>
                <img src="./src/assets/homepage/bot-cloud.png" className="bot-cloud" alt="Bottom Cloud" />
            </div>
        </div>
    );
}

export default WelcomeSec;
