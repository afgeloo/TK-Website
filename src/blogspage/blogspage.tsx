import { useEffect, useState } from "react";
import Footer from "../footer";
import Header from "../header";
import "./blogspage.css";
import timeiconwhite from "../assets/logos/time.png";
import authoriconwhite from "../assets/logos/authorwhiteicon.png"
import timeblack from "../assets/logos/timeblack.png"
import authorblack from "../assets/logos/pencilblack.jpg"
import { useNavigate } from "react-router-dom"; 
import Preloader from "../preloader";


interface Blog {
    blog_id: number;
    title: string;
    image_url: string;
    category: string;
    created_at: string;
    author: string;
}

const placeholderImage = "https://ddragon.leagueoflegends.com/cdn/img/champion/splash/Zilean_0.jpg";

function BlogsPage() {
    const [blogs, setBlogs] = useState<Blog[]>([]);
    const [pinnedBlogs, setPinnedBlogs] = useState<Blog[]>([]);
    const [selectedCategory, setSelectedCategory] = useState("ALL");
    const [searchQuery, setSearchQuery] = useState("");
    const [showAllBlogs, setShowAllBlogs] = useState(false);
    const [loading, setLoading] = useState(true);

    const fetchBlogs = async (category: string) => {
        setLoading(true);
        try {
            const response = await fetch(`http://localhost/tara-kabataan-webapp/backend/api/blogs.php?category=${category}`);
            const data = await response.json();
            if (data && data.pinned && data.blogs) {
                setPinnedBlogs(data.pinned);
                setBlogs(data.blogs);
            } else {
                console.error("Unexpected API response format:", data);
            }
            setLoading(false); 
            } catch (error) {
            console.error("Error fetching blogs:", error);
            setLoading(false); 
            }
        
    };
    

    const navigate = useNavigate(); 

    const handleBlogClick = (blog_id: number) => {
        navigate(`/blog/${blog_id}`); 
    };
    
    useEffect(() => {
        fetchBlogs(selectedCategory === "ALL" ? "ALL" : selectedCategory);
    }, [selectedCategory]);

    const categories = ["ALL", "KALUSUGAN", "KALIKASAN", "KARUNUNGAN", "KULTURA", "KASARIAN"];

    const filteredBlogs = blogs.filter(blog =>
        blog.title.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const displayedBlogs = showAllBlogs ? filteredBlogs : filteredBlogs.slice(0, 4);

    return (
        <div className="blogs-page">
            <Header />

            {/* Pinned Blogs Header (Title + Search Bar) */}
            <div className="blogs-page-pinned-header">
                <h2>Pinned Blogs</h2>
                <input
                    type="text"
                    className="blogs-page-search-bar"
                    placeholder="tanggalin na tong search bar"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                />
            </div>

            {/* Pinned Blogs Section */}
            <div className="blogs-page-pinned-blogs">
                {pinnedBlogs.length > 0 && (
                    <div className="blogs-page-pinned-container">
                        <div
                            className="blogs-page-pinned-main"
                            style={{ "--bg-image": `url(${pinnedBlogs[0].image_url || placeholderImage})` } as React.CSSProperties}
                            onClick={() => handleBlogClick(pinnedBlogs[0].blog_id)} 
                        >
                            <div className="blogs-page-pinned-overlay">
                                <p className="blogs-page-pinned-category-1">{pinnedBlogs[0].category}</p>
                                <h3 className="blogs-page-pinned-title-1">{pinnedBlogs[0].title}</h3>
                                <p className="blogs-page-pinned-meta-1">
                                    <img src={timeiconwhite} className="blogs-page-timeiconwhite" />
                                    {new Date(pinnedBlogs[0].created_at).toLocaleDateString("en-US", { 
                                        year: "numeric", 
                                        month: "long", 
                                        day: "numeric" 
                                    })} 
                                    <img src={authoriconwhite} className="blogs-page-authoriconwhite" />
                                    {pinnedBlogs[0].author}
                                </p>
                            </div>
                        </div>

                        <div className="blogs-page-pinned-side">
                            {pinnedBlogs.slice(1, 3).map((blog) => (
                                <div
                                    key={blog.blog_id}
                                    className="blogs-page-pinned-item"
                                    style={{ "--bg-image": `url(${blog.image_url || placeholderImage})` } as React.CSSProperties}
                                    onClick={() => handleBlogClick(blog.blog_id)} 
                                >
                                    <div className="blogs-page-pinned-overlay">
                                        <p className="blogs-page-pinned-category-2">{blog.category}</p>
                                        <h3 className="blogs-page-pinned-title-2">{blog.title}</h3>
                                        <p className="blogs-page-pinned-meta-2">
                                            <img src={timeiconwhite} className="blogs-page-timeiconwhite" />
                                            {new Date(blog.created_at).toLocaleDateString("en-US", { 
                                                year: "numeric", 
                                                month: "long", 
                                                day: "numeric" 
                                            })} 
                                            <img src={authoriconwhite} className="blogs-page-authoriconwhite" />
                                            {blog.author}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>

           {/* Blog Categories Section */}
           <div className="blogs-page-blog-categories">
                <h2 className="blogs-page-blogs-header">Blogs</h2>
                <div className="blogs-page-category-list">
                    {categories.map(category => (
                        <span
                            key={category}
                            className={selectedCategory === category ? "active-category" : ""}
                            onClick={() => setSelectedCategory(category)}
                        >
                            {category}
                        </span>
                    ))}
                </div>
            </div>
            <hr className="blogs-page-Hr"></hr>

            {/* Latest Blogs Section */}
            <div className="blogs-page-blogs-list">
                {loading ? (
                    <Preloader />
                ) : displayedBlogs.length > 0 ? (
                    <div className="blogs-page-blogs-grid">
                        {displayedBlogs.map((blog) => (
                            <div key={blog.blog_id} className="blogs-page-blog-item">
                                <img 
                                    src={blog.image_url || placeholderImage} 
                                    alt={blog.title} 
                                    onClick={() => handleBlogClick(blog.blog_id)} 
                                    style={{ cursor: "pointer" }} 
                                />
                                <div className="blogs-page-pinned-overlay">
                                    <p className="blogs-page-pinned-category-3">{blog.category}</p>
                                    <h3 
                                        className="blogs-page-pinned-title-3"
                                        onClick={() => handleBlogClick(blog.blog_id)} 
                                        style={{ cursor: "pointer" }}
                                    >
                                        {blog.title}
                                    </h3>
                                    <p className="blogs-page-pinned-meta-3">
                                        <img src={timeblack} className="blogs-page-time-black" />
        
                                        {new Date(blog.created_at).toLocaleDateString("en-US", { 
                                            year: "numeric", 
                                            month: "long", 
                                            day: "numeric" 
                                        })}
        
                                        <img src={authorblack} className="blogs-page-author-black" />
                                        {blog.author}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div style={{ display: "flex", justifyContent: "center"}}>
                        <p>No blogs found.</p>
                    </div>
                )}
            </div>

            {/* See More Button */}
            {filteredBlogs.length > 4 && (
                <button className="blogs-page-see-more-btn" onClick={() => setShowAllBlogs(!showAllBlogs)}>
                    {showAllBlogs ? "Show Less" : "See More"}
                </button>
            )}

            <Footer />
        </div>
    );
}

export default BlogsPage;
