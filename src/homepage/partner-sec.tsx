import React from "react";
import Marquee from "react-fast-marquee";
import "./css/partner-sec.css";
import miami from '../assets/logos/miamilogo.png';
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


const teamLogos: string[] = [
  miami, celtics, bulls, lakers, spurs, thunder, suns, warriors,
];


const PartnerSec: React.FC = () => {
  return (
    <div className="partner-sec">
      <>
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
      {/* Partner & Member Sections */}
      <div className="partner-member-container">
        <div className="BePartnerMemberSection">
          <h2 className="BePartnerMemberText">BE A PARTNER</h2>
          <div className="BePartnerMemberSection-box">
            <div className="circle-inside-be-a-partner-member">
              <img src={partnerLogo} alt="Partner Logo" className="circle-image partner-image" />
            </div>
            <p className="text-inside-be-a-partner-member-container">
              Being a partner will lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
            </p>
            <button className="button-inside-be-a-partner-member">BECOME A PARTNER</button>
          </div>
        </div>

        <div className="BePartnerMemberSection">
          <h2 className="BePartnerMemberText">BE A MEMBER</h2>
          <div className="BePartnerMemberSection-box">
            <div className="circle-inside-be-a-partner-member">
              <img src={memberLogo} alt="Member Logo" className="circle-image member-image" />
            </div>
            <p className="text-inside-be-a-partner-member-container">
              Being a member will lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
            </p>
            <button className="button-inside-be-a-partner-member">BECOME A MEMBER</button>
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
              In-kind donations will go to lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
            </p>
          </div>
        </div>
        <button className="donate-now-section">
          <img src={donateicon} alt="Donate Icon" className="logo-inside-donate-now " />
          <span className="donate-now-text ">DONATE NOW</span>
        </button>

      </div>
    </>
    </div>
    
  );
};

export default PartnerSec;