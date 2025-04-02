import React, { useState } from "react";
import Marquee from "react-fast-marquee";
import "./css/partner-sec.css";
import { Link } from "react-router-dom";
import miami from "../assets/logos/miamilogo.png";
import bulls from "../assets/logos/bullslogo.png";
import lakers from "../assets/logos/lakerslogo.png";
import celtics from "../assets/logos/celticslogo.png";
import spurs from "../assets/logos/spurslogo.png";
import suns from "../assets/logos/sunslogo.png";
import thunder from "../assets/logos/thunderlogo.png";
import warriors from "../assets/logos/warriorslogo.png";
import partnerLogo from "../assets/logos/tklogo1.png";
import memberLogo from "../assets/logos/tklogo2.png";
import tklogo from "../assets/logos/tklogo3.png";
import donateicon from "../assets/logos/donateicon.png";
import qrCode from "../assets/images/tk_qr.png"; // ✅ Add your QR image

const teamLogos: string[] = [miami, celtics, bulls, lakers, spurs, thunder, suns, warriors];

const PartnerSec: React.FC = () => {
  const [showQR, setShowQR] = useState(false);

  return (
    <div className="partner-sec">
      {/* Existing content (unchanged) */}
      <h1 className="PastPartnership-Text">PAST PARTNERSHIPS</h1>
      <br />
      <div>
        <Marquee speed={100} pauseOnHover loop={0} gradient={false}>
          {teamLogos.map((team, index) => (
            <div key={index} style={{ padding: "0 30px" }}>
              <img src={team} className="past-partnerships-logo" alt={`Team ${index}`} />
            </div>
          ))}
        </Marquee>
      </div>
      <hr className="Hr-under-pastpartnership" />

      {/* Partner & Member Sections (unchanged) */}
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

      {/* ✅ QR CODE MODAL */}
      {showQR && (
        <div className="qr-popup-overlay" onClick={() => setShowQR(false)}>
          <div className="qr-popup" onClick={(e) => e.stopPropagation()}>
            <button className="close-qr-btn" onClick={() => setShowQR(false)}>×</button>
            <img src={tklogo} alt="QR Code" className="qr-code-img" />
            <p>Or message us directly on Messenger:</p>
            <a
              href="https://m.me/yourpageusername"
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
