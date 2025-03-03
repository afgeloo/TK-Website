import "./css/council.css";

const councilPresident = [
    { 
        name: "Ferdinand Sanchez II", 
        role: "President",
        image: "./src/assets/aboutpage/img-placeholder-guy.png" 
    }
];

const councilMembers = [
    { name: "Marion Navarro", role: "Partnerships", image: "./src/assets/aboutpage/img-placeholder-women.png" },
    { name: "Joshua Barbo", role: "Research & Advocacy", image: "./src/assets/aboutpage/img-placeholder-guy.png" },
    { name: "Mildred Collado", role: "Finance", image: "./src/assets/aboutpage/img-placeholder-women.png" },
    { name: "Eunice Santiago", role: "Secretary", image: "./src/assets/aboutpage/img-placeholder-women.png" },
    { name: "Isaac Hernandez", role: "Online Engagement", image: "./src/assets/aboutpage/img-placeholder-guy.png" },
    { name: "Raf Ranin", role: "Programs & Events", image: "./src/assets/aboutpage/img-placeholder-guy.png" },
    { name: "Chester Carreon", role: "Documentation", image: "./src/assets/aboutpage/img-placeholder-guy.png" },
    { name: "Aaron Sumampong", role: "Creatives", image: "./src/assets/aboutpage/img-placeholder-guy.png" },
    { name: "Enrico Villegas", role: "Internals", image: "./src/assets/aboutpage/img-placeholder-guy.png" }
];


function Council() {
    return (
        <div className="council-sec">
            <div className="council-ribbon">
                <img src="./src/assets/aboutpage/council-ribbon.png" alt="ribbon" />
            </div>
            <div className="council-sec-content">
                <h1 className="council-header">Council</h1>
                <p className="council-description">
                    Ang TK Council ang pangunahing namamahala sa mga gawaing administratibo ng organisasyon at nagsisiguro sa maayos na kalagayan ng mga miyembro. Sila ang nangangasiwa sa pagpaplano, pagsasagawa, at pagsusubaybay ng mga proyekto upang matiyak na natutupad ang layunin at adbokasiya ng Tara Kabataan. Bukod dito, binibigyan nila ng pansin ang kapakanan ng mga miyembro sa pamamagitan ng pagbibigay ng suporta at mga programa na nagpapalakas ng kanilang kakayahan at samahan bilang isang komunidad.
                </p>
            </div>
            
            {/* President Section */}
            <div className="council-president-grid">
                {councilPresident.map((member, index) => (
                    <div key={index} className="council-card council-card-main">
                        <div className="council-inner-card-1-president">
                            <div className="council-inner-card-2">
                                <div className="council-member-image">
                                    <img 
                                        src={member.image || "./assets/aboutpage/img-placeholder-guy.png"} 
                                        alt={`${member.name}'s photo`} 
                                    />
                                </div>
                                <h1 className="council-member-name">{member.name}</h1>
                                <p className="council-member-role">{member.role}</p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Other Members Section */}
            <div className="council-grid">
                {councilMembers.map((member, index) => (
                    <div key={index} className="council-card">
                        <div className="council-inner-card-1-members">
                            <div className="council-inner-card-2">
                                <div className="council-member-image">
                                    <img 
                                        src={member.image} 
                                        alt={`${member.name}'s photo`} 
                                    />
                                </div>
                                <h1 className="council-member-name">{member.name}</h1>
                                <p className="council-member-role">{member.role}</p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Council;

