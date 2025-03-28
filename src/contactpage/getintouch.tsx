import "./css/getintouch.css";
import { useEffect, useState } from "react";

function GetInTouch() {
  const [contactNo, setContactNo] = useState<string>("Loading...");
  const [email, setEmail] = useState<string>("Loading...");

  useEffect(() => {
    fetch("http://localhost/tara-kabataan-webapp/backend/api/aboutus.php")
      .then((res) => res.json())
      .then((data) => {
        if (data.contact_no) setContactNo(data.contact_no);
        if (data.about_email) setEmail(data.about_email);
      })
      .catch((err) => {
        console.error("Error fetching contact info:", err);
        setContactNo("Unavailable");
        setEmail("Unavailable");
      });
  }, []);

  return (
    <div className="getintouch-sec">
      <div className="getintouch-content">
        <h1 className="getintouch-header">Get in Touch</h1>
        <p className="getintouch-description">
          Reach out to us through any of our contact points below. We're here to listen and connect with you!
        </p>
      </div>

      <div className="getintouch-sub-sec">
        {/* Left Contact Info */}
        <div className="getintouch-left">
          <div className="contact-telephone">
            <div className="contact-telephone-icon">
              <img
                src="./src/assets/contactpage/telephone.png"
                alt="Telephone Icon"
                draggable="false"
              />
            </div>
            <div className="contact-telephone-details">
              <h1 className="contact-telephone-header">Telephone</h1>
              <p className="contact-telephone-no">{contactNo}</p>
            </div>
          </div>

          <div className="contact-email">
            <div className="contact-email-icon">
              <img
                src="./src/assets/contactpage/email.png"
                alt="Email Icon"
                draggable="false"
              />
            </div>
            <div className="contact-email-details">
              <h1 className="contact-email-header">Email</h1>
              <p className="contact-email">{email}</p>
            </div>
          </div>
        </div>

        {/* Right Socials */}
        <div className="getintouch-right">
          <h1 className="getintouch-right-header">Social Media</h1>
          <div className="contact-facebook">
            <img
              src="./src/assets/contactpage/facebook.png"
              alt="Facebook Icon"
              draggable="false"
            />
            <p>Tara Kabataan</p>
          </div>
          <div className="contact-instagram">
            <img
              src="./src/assets/contactpage/instargram.png"
              alt="Instagram Icon"
              draggable="false"
            />
            <p>@tarakabataan</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default GetInTouch;
