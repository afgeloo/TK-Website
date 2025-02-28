import Footer from "../footer";
import Header from "../header";

function BlogsPage(){
    return (
        <div className="blogs-page">
            <div>
                <Header />
            </div>
            <div className="blogs-page-content">
                <h1 className="blogs-page-header">BLOGS</h1>
            </div>
            <div>
                <Footer />
            </div>
        </div>
    )
}

export default BlogsPage;