import './css/welcome-sec.css';
import Marquee from "react-fast-marquee";

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
                <div className="content-section">
                    <h2>Your Content Here</h2>
                    <p>This is where you can add your content between the clouds.</p>
                </div>
                <img src="./src/assets/homepage/bot-cloud.png" className="bot-cloud" alt="Bottom Cloud" />
            </div>
        </div>
    );
}

export default WelcomeSec;
