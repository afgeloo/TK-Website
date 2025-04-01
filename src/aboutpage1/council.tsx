import "./css/council.css";
import { useEffect, useState } from "react";

function Council() {
    const [councilData, setCouncilData] = useState([]);
    const [councilText, setCouncilText] = useState("Loading...");

    useEffect(() => {
        // Fetch council description
        fetch("http://localhost/tara-kabataan-webapp/backend/api/aboutus.php")
            .then(res => res.json())
            .then(data => {
                setCouncilText(data.council || "No data.");
            });

        // Fetch council members
        fetch("http://localhost/tara-kabataan-webapp/backend/api/council.php")
            .then(res => res.json())
            .then(data => setCouncilData(data))
            .catch(err => console.error("Council API error:", err));
    }, []);

    return (
        <div className="council-sec">
            <div className="council-ribbon">
                <img src="./src/assets/aboutpage/council-ribbon.png" alt="ribbon" />
            </div>
            <div className="council-sec-content">
                <h1 className="council-header">Council</h1>
                <p className="council-description"
                    dangerouslySetInnerHTML={{ __html: councilText.replace(/\n/g, "<br />") }}
                />
            </div>

            {/* President Section */}
            <div className="council-president-grid">
                {councilData
                    .filter(member => member.role_name === "President")
                    .map((member, index) => (
                        <div key={index} className="council-card council-card-main">
                            <div className="council-inner-card-1-president">
                                <div className="council-inner-card-2">
                                    <div className="council-member-image">
                                        <img
                                            src={member.user_image || "./src/assets/aboutpage/img-placeholder-guy.png"}
                                            onError={(e) => {
                                                e.currentTarget.src = "./src/assets/aboutpage/img-placeholder-guy.png";
                                            }}
                                            alt="./src/assets/aboutpage/img-placeholder-guy.png"
                                        />
                                    </div>
                                    <h1 className="council-member-name">{member.user_name}</h1>
                                    <p className="council-member-role">{member.role_name}</p>
                                </div>
                            </div>
                        </div>
                    ))}
            </div>

            {/* Other Members Section */}
            <div className="council-grid">
                {councilData
                    .filter(member => member.role_name !== "President")
                    .map((member, index) => (
                        <div key={index} className="council-card">
                            <div className="council-inner-card-1-members">
                                <div className="council-inner-card-2">
                                <div className="council-member-image">
                                    <img
                                        src={member.user_image || "./src/assets/aboutpage/img-placeholder-guy.png"}
                                        onError={(e) => {
                                            e.currentTarget.src = "./src/assets/aboutpage/img-placeholder-guy.png";
                                        }}
                                        alt="./src/assets/aboutpage/img-placeholder-guy.png"
                                    />
                                </div>
                                <h1 className="council-member-name">{member.user_name}</h1>
                                <p className="council-member-role">{member.role_name}</p>
                                </div>
                            </div>
                        </div>
                    ))}
            </div>
        </div>
    );
}

export default Council;
