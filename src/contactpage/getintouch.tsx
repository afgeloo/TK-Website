import "./css/getintouch.css";

function GetInTouch(){
    return(
        <div className="getintouch-sec">
            <div className="getintouch-content">
                <h1 className="getintouch-header">Get in Touch</h1>
                <p className="getintouch-description">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                </p>
            </div>
            <div className="getintouch-sub-sec">
                <div className="getintouch-left">
                    <div className="contact-telephone">
                        <div className="contact-telephone-icon">
                            <img src="./src/assets/contactpage/telephone.png" alt="Telephone Icon" />
                        </div>
                        <div className="contact-telephone-details">
                            <h1 className="contact-telephone-header">Telephone</h1>
                            <p className="contact-telephone-no">
                                8888-1234
                            </p>
                        </div>
                    </div>
                    <div className="contact-email">
                        <div className="contact-email-icon">
                            <img src="./src/assets/contactpage/email.png" alt="Telephone Icon" />
                        </div>
                        <div className="contact-email-details">
                            <h1 className="contact-email-header">Email</h1>
                            <p className="contact-email">
                                tarakabataan@gmail.com
                            </p>
                        </div>
                    </div>
                </div>
                <div className="getintouch-right">
                    <h1 className="getintouch-right">Social Media</h1>
                    <div className="contact-facebook">
                        <img src="./src/assets/contactpage/facebook.png" alt="Telephone Icon" />
                        <p>
                            Tara Kabataan
                        </p>
                    </div>
                    <div className="contact-instagram">
                        <img src="./src/assets/contactpage/instargram.png" alt="Telephone Icon" />
                        <p>
                            Tara Kabataan
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default GetInTouch;