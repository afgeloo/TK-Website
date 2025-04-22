import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./css/blogs-sec.css";

interface Blog {
  blog_id: string;
  title: string;
  image_url?: string;
  category: string;
  content?: string;
  blog_status?: string;
}

const BlogsSec: React.FC = () => {
  const [blogs, setBlogs] = useState<Blog[]>([]);

  useEffect(() => {
    fetch("http://localhost/tara-kabataan/tara-kabataan-backend/api/blogs.php")
      .then((res) => res.json())
      .then((data) => {
        if (data.blogs) {
          const pinned = data.blogs.filter((blog: Blog) => blog.blog_status === "PINNED");
          setBlogs(pinned);
        }
      })
      .catch((err) => console.error("Failed to fetch blogs:", err));
  }, []);

  return (
    <div className="blogs-sec">
      <div className="blogs-bg">
        <img
          className="blogs-bg-tk"
          src="./src/assets/homepage/blogs-bg.png"
          alt="Blogs Background"
        />
        <div className="blogs-content">
          <div className="blogs-container-sec">
            <h1 className="blogs-header">BLOGS</h1>
            <div className="blogs-container">
            {blogs.map(({ blog_id, title, image_url, category, content }) => (
              <div key={blog_id} className="blog-box">
                <div className="blogs-image-container">
                  <img
                    src={`http://localhost${image_url}`}
                    alt={`Blog ${blog_id}`}
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = "./src/assets/homepage/default-blog.png";
                    }}
                  />
                </div>
                <div className="blog-title">
                  <h1>{title}</h1>
                </div>
                <div className="blog-category">
                  <p>{category}</p>
                </div>
                <div
                className="blog-description"
                dangerouslySetInnerHTML={{
                  __html: content || "",
                }}
              ></div>
              </div>
            ))}
            </div>
          </div>
          <div className="blogs-sec-nav">
            <Link to="/Blogs" className="nav-blogs">
              <img src="./src/assets/homepage/book.png" alt="Read More Icon" />
              READ MORE
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogsSec;
