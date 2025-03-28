import React from "react";
import "./css/welcome-sec.css";
import Marquee from "react-fast-marquee";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";


const Wave: React.FC = () => {
    return (
        <div className="wave-container">
            <svg
                width="100%"
                height="auto"
                version="1.1"
                xmlns="http://www.w3.org/2000/svg"
                xmlnsXlink="http://www.w3.org/1999/xlink"
                style={{
                    fillRule: "evenodd",
                    clipRule: "evenodd",
                    strokeLinecap: "round",
                    strokeLinejoin: "round",
                }}
            >
                <path
                    d="M50,39 C200,10 400,70 600,39 C800,10 1000,70 1200,39 C1400,10 1600,70 1800,39"
                    style={{
                        fill: "none",
                        stroke: "#F875AA",
                        strokeOpacity: 0.5,
                        strokeWidth: 2,
                        strokeDasharray: "280 550 160 600 260 350",
                    }}
                >
                    <animate
                        attributeName="stroke-dashoffset"
                        from="-2200"
                        to="0"
                        dur="32s"
                        repeatCount="indefinite"
                    />
                </path>
            </svg>

            <svg
                width="100%"
                height="auto"
                version="1.1"
                xmlns="http://www.w3.org/2000/svg"
                xmlnsXlink="http://www.w3.org/1999/xlink"
                style={{
                    fillRule: "evenodd",
                    clipRule: "evenodd",
                    strokeLinecap: "round",
                    strokeLinejoin: "round",
                }}
            >
                <path
                    d="M50,39 C200,10 400,70 600,39 C800,10 1000,70 1200,39 C1400,10 1600,70 1800,39"
                    style={{
                        fill: "none",
                        stroke: "#0F82CA",
                        strokeOpacity: 0.5,
                        strokeWidth: 2,
                        strokeDasharray: "180 250 160 700 260 650",
                    }}
                    strokeDashoffset="180"
                >
                    <animate
                        attributeName="stroke-dashoffset"
                        from="-2020"
                        to="180"
                        dur="32s"
                        repeatCount="indefinite"
                    />
                </path>
            </svg>
        </div>
    );
};

function WelcomeSec() {
    const [overview, setOverview] = useState<string>("Loading...");

    useEffect(() => {
        fetch("http://localhost/tara-kabataan-webapp/backend/api/aboutus.php")
            .then((res) => res.json())
            .then((data) => {
                if (data.overview) {
                    setOverview(data.overview);
                } else {
                    setOverview("No overview content found.");
                }
            })
            .catch((error) => {
                console.error("Error fetching overview:", error);
                setOverview("Failed to load overview.");
            });
    }, []);
    
    return (
        <div className="welcome-sec">
            <div className="wave-container">
                <Wave />
            </div>
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
                            {/* <p>Ang <strong>Tara Kabataan (TK)</strong> ay isang organisasyon ng mga kabataan sa Maynila na itinatag para isulong ang kaginhawaan ng bawat kabataan at Manilenyo. Pinapahalagahan ng samahan ang pakikipagkapwa ng mga Pilipino na nakasandig sa ating karapatan at pagkakapantay-pantay. Naniniwala ang TK sa kakayahan ng bawat kabataan, sa loob at labas ng paaralan, na siyang higit na dapat mabigyan ng oportunidad na malinang at mapaunlad. Mula rito, mas makikilala ng kabataan ang kaniyang sarili at matatanaw ang kaniyang mahalagang papel sa komunidad, lipunan, at bayan. Mula sa sarili tungo sa bayan ang siyang hinihikayat ng Tara Kabataan sa kaniyang kapwa.
                            </p> */}
                            <p>{overview}</p>
                        </div>
                    </div>
                    <div className="know-more">
                        <Link to="/About" className="nav-know-more">
                            <img src="./src/assets/homepage/bulb.png" alt="Know More" />
                            KNOW MORE
                        </Link>
                    </div>
                </div>
                <img src="./src/assets/homepage/bot-cloud.png" className="bot-cloud" alt="Bottom Cloud" />
            </div>
        </div>
    );
}

export default WelcomeSec;