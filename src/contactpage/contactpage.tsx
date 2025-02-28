import Footer from "../footer";
import Header from "../header";

function ContactPage(){
    return (
        <div className="contact-page">
            <div>
                <Header />
            </div>
            <div className="contact-page-content">
                <h1 className="contact-page-header">CONTACT</h1>
            </div>
            <div>
                <Footer />
            </div>
        </div>
    )
}

export default ContactPage;