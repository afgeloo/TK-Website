import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Header from "../header";
import Footer from "../footer";
import "./singleblog.css";
import silverPencil from "../assets/logos/silverPencil.png";
import silverTime from "../assets/logos/silverTime.jpg";
import Preloader from "../preloader";
// Update the interface
interface Blog {
    blog_id: string;
    title: string;
    content: string;
    image_url: string;
    category: string;
    created_at: string;
    author: string;
    blog_status?: string;
}

function SingleBlog() {
    const { id } = useParams();
    const [blog, setBlog] = useState<Blog | null>(null);
    const [loading, setLoading] = useState(true);
    
    useEffect(() => {
        const fetchBlog = async () => {
            try {
                const response = await fetch(`http://localhost/tkwebsites/TK-website/backend/api/blogs.php?blog_id=${id}`);
                const data = await response.json();
                if (data) {
                    setBlog(data);
                } else {
                    console.error("No blog found");
                }
            } catch (error) {
                console.error("Error fetching blog:", error);
            }
            setLoading(false);
        };

        fetchBlog();
    }, [id]);

    const copyBlogLink = () => {
        const currentUrl = window.location.href;
        navigator.clipboard.writeText(currentUrl)
            .catch(err => {
                console.error("Failed to copy link: ", err);
            });
    };

    if (loading) return <Preloader/>;
    if (!blog) return <p>Blog not found.</p>;

    return (
        <div className="single-blog-blog-detail-page">
            <Header /> {/* Keep header unaffected */}
            
            <div className="single-blog-blog-content-wrapper"> {/* New wrapper to center content */}
                <img src={blog.image_url} alt={blog.title} className="single-blog-blog-image" />
    
                <p className="single-blog-blog-category">{blog.category}</p>
    
                <h1 className="single-blog-blog-title">{blog.title}</h1>
    
                <div className="single-blog-blog-meta">
                    <img src={silverTime}  className="single-blog-blog-time-icon" />
                    {new Date(blog.created_at).toLocaleDateString("en-US", { 
                        year: "numeric", 
                        month: "long", 
                        day: "numeric" 
                    })}
                    
                    <img src={silverPencil} className="single-blog-blog-author-icon" />
                    {blog.author}
                </div>
    
                <p className="single-blog-blog-content">{blog.content}</p>
                
                {/* Copy Link to Blog section */}
                <div className="single-blog-copy-link-container">
                    <span className="single-blog-copy-link-text">Copy Link to Blog</span>
                    <div className="single-blog-copy-link-icon-container" onClick={copyBlogLink}>
                        <div className="single-blog-copy-link-icon">
                            {/* This would be your link icon */}
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M10 13C10.87 14.14 12.13 15 13.5 15C14.87 15 16.13 14.14 17 13L20.25 9.75C21.32 8.68 21.32 7.01 20.25 5.94C19.18 4.87 17.51 4.87 16.44 5.94L14.5 7.88" stroke="#FF5A89" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                <path d="M14 11C13.13 9.86 11.87 9 10.5 9C9.13 9 7.87 9.86 7 11L3.75 14.25C2.68 15.32 2.68 16.99 3.75 18.06C4.82 19.13 6.49 19.13 7.56 18.06L9.5 16.12" stroke="#FF5A89" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                            </svg>
                        </div>
                    </div>
                </div>
            </div>
    
            <Footer />
        </div>
    );
    
}

export default SingleBlog;