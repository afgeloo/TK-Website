import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Header from "../header";
import Footer from "../footer";
import "./singleblog.css";
import silverPencil from "../assets/logos/silverPencil.png";
import silverTime from "../assets/logos/silverTime.jpg";

interface Blog {
    blog_id: number;
    title: string;
    content: string;
    image_url: string;
    category: string;
    created_at: string;
    author: string;
}

function SingleBlog() {
    const { id } = useParams();
    const [blog, setBlog] = useState<Blog | null>(null);
    const [loading, setLoading] = useState(true);
    http://localhost:8000/api/blogs.php?category=${category}
    useEffect(() => {
        const fetchBlog = async () => {
            try {
                const response = await fetch(`http://localhost/tara-kabataan-webapp/backend/api/blogs.php?blog_id=${id}`);
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
            </div>
    
            <Footer />
        </div>
    );
    
}

export default SingleBlog;
