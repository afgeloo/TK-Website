import Footer from "./footer";
import Header from "./header";
import HomePage from "./homepage/homepage";

function UserSide(){
    return (
        <div>
            <div>
                <Header />
            </div>
            <div>
                <HomePage />
            </div>
            <div>
                <Footer />
            </div>
        </div>
    )
}   

export default UserSide;