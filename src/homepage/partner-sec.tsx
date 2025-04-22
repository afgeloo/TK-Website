import React, { useState, useEffect, useMemo } from "react";
import Marquee from "react-fast-marquee";
import "./css/partner-sec.css";
import { Link } from "react-router-dom";
import partnerLogo from "../assets/logos/tklogo1.png";
import memberLogo from "../assets/logos/tklogo2.png";
import tklogo from "../assets/logos/tklogo3.png";
import donateicon from "../assets/logos/donateicon.png";

const PartnerSec: React.FC = () => {
  const [showQR, setShowQR] = useState(false);
  const [partnerLogos, setPartnerLogos] = useState<string[]>([]);

  const displayedLogos = useMemo(() => {
    return partnerLogos.length < 6
      ? [...partnerLogos, ...partnerLogos]
      : partnerLogos;
  }, [partnerLogos]);

  useEffect(() => {
    fetch("http://localhost/tara-kabataan/tara-kabataan-backend/api/partners.php")
      .then((res) => res.json())
      .then((data) => {
        const logos = (data.partners || [])
          .map((p: any) => p.partner_image)
          .filter((img: string) => img && img.trim() !== "")
          .map((fullPath: string) => {
            const parts = fullPath.split(/[/\\]/); 
            const filename = parts[parts.length - 1];
            return `http://localhost/tara-kabataan/tara-kabataan-webapp/uploads/partners-images/${filename}`;
          });
        setPartnerLogos(logos);
      })
      .catch((err) => console.error("Error fetching partner logos:", err));
  }, []);  

  return (
    <div className="partner-sec">
      <h1 className="PastPartnership-Text">PAST PARTNERSHIPS</h1>
      <br />
      <div>
      <Marquee key="partner-marquee" speed={60} pauseOnHover loop={0} gradient={false}>
      {displayedLogos.map((logo, index) => (
        <div key={index} style={{ padding: "0 20px" }}>
          <img
            src={logo}
            className="past-partnerships-logo"
            alt={`Partner ${index}`}
            onError={(e) => {
              (e.target as HTMLImageElement).src = "fallback-image.png";
            }}
          />
        </div>
      ))}
    </Marquee>
      </div>
      <hr className="Hr-under-pastpartnership" />
      <div className="partner-member-container">
      <div className="BePartnerMemberSection">
          <h2 className="BePartnerMemberText">BE A PARTNER</h2>
          <div className="BePartnerMemberSection-box">
            <div className="circle-inside-be-a-partner-member">
              <img src={partnerLogo} alt="Partner Logo" className="circle-image partner-image" />
            </div>
            <p className="text-inside-be-a-partner-member-container">
            Partnering with Tara Kabataan means joining a dedicated movement focused on empowering the youth and fostering community development. Your collaboration will support initiatives that promote education, environmental stewardship, and active civic engagement among young individuals.
            </p>
            <Link to="/Contact" className="button-inside-be-a-partner-member">
                BECOME A PARTNER
            </Link>          
        </div>
        </div>

        <div className="BePartnerMemberSection">
          <h2 className="BePartnerMemberText">BE A MEMBER</h2>
          <div className="BePartnerMemberSection-box">
            <div className="circle-inside-be-a-partner-member">
              <img src={memberLogo} alt="Member Logo" className="circle-image member-image" />
            </div>
            <p className="text-inside-be-a-partner-member-container">
            Joining Tara Kabataan as a member means becoming part of a passionate community of youth advocates and changemakers. You’ll have opportunities to engage in meaningful volunteer work and develop your leadership and advocacy skills through community-based activities.
            </p>
            <a
              href="https://docs.google.com/forms/d/e/1FAIpQLSewrSWYnmn5lVqOTbSh9751x80e-IhIp_atvMFaDf3M0n6uVg/viewform"
              target="_blank"
              rel="noopener noreferrer"
              style={{ textDecoration: "none" }}
            >
              <button className="button-inside-be-a-partner-member">
                BECOME A MEMBER
              </button>
            </a>
          </div>
        </div>
      </div>
      <h2 className="support-tk-title">SUPPORT TARA KABATAAN</h2>
      <div className="support-tk-container">
        <div className="support-tk-content-format">
          <div className="logo-inside-donate-now-placing">
            <img src={tklogo} className="logo-inside-donate-now-sizing" alt="Support Logo" />
          </div>
          <div className="support-tk-text">
            <p>
            Your donation is more than just a contribution — it’s a commitment to youth empowerment and inclusive nation-building. Every peso you give fuels Tara Kabataan’s programs that uplift communities, advance human rights, and promote genuine civic engagement.
            Whether it’s through in-kind support or financial assistance, your help goes directly to grassroots initiatives: from relief operations and educational drives to health missions and climate justice actions.
            </p>
          </div>
        </div>
        <button className="donate-now-section" onClick={() => setShowQR(true)}>
          <img src={donateicon} alt="Donate Icon" className="logo-inside-donate-now" />
          <span className="donate-now-text">DONATE NOW</span>
        </button>
      </div>
      {showQR && (
        <div className="qr-popup-overlay" onClick={() => setShowQR(false)}>
          <div className="qr-popup" onClick={(e) => e.stopPropagation()}>
            <button className="close-qr-btn" onClick={() => setShowQR(false)}>×</button>
            <img src={tklogo} alt="QR Code" className="qr-code-img" />
            <p>Or message us directly on Messenger:</p>
            <a
              href="https://www.facebook.com/messages/t/105536985395406"
              target="_blank"
              rel="noopener noreferrer"
              className="messenger-link"
            >
              Tara, Kabataan!
            </a>
          </div>
        </div>
      )}
    </div>
  );
};

export default PartnerSec;
