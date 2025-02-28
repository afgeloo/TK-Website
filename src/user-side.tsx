import HomePage from "./homepage/homepage";
import Header from './header';
import Footer from './footer';

function UserSide(){
    return (
        <div>
                <Header />
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