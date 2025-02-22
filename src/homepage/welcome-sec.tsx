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
                            <img key={index} src="./src/assets/flowers.png" alt="Flower" />
                        ))}
                        {/* Add an empty space at the end to create a gap */}
                        <div style={{ width: "50px" }}></div>
                    </div>
                </Marquee>
            </div>
            <div className="flower-container bottom-layer">
                <Marquee gradient={false} speed={90} loop={0} direction="left">
                    <div className="flowers2">
                        {[...Array(6)].map((_, index) => (
                            <img key={index} src="./src/assets/flowers.png" alt="Flower" />
                        ))}
                        {/* Add an empty space at the end to create a gap */}
                        <div style={{ width: "50px" }}></div>
                    </div>
                </Marquee>
            </div>
            

            {/* Existing Content */}
            <div className="welcome1">
                <img src="./src/assets/welcome.png" alt="Welcome" />
            </div>
            <div className="cow">
                <img src="./src/assets/cow.png" alt="Cow" />
            </div>
            <div className="welcome3">
                <img src="./src/assets/welcome1.png" alt="Welcome 1" />
            </div>
        </div>
    );
}

export default WelcomeSec;
