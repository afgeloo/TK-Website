import Footer from "../footer";
import Header from "../header";

function AboutPage(){
    return (
        <div className="about-page">
            <div>
                <Header />
            </div>
            <div className="about-page-content">
                <h1 className="about-page-header">ABOUT</h1>
            </div>
            <div>
                <Footer />
            </div>
        </div>
    )
}

export default AboutPage;