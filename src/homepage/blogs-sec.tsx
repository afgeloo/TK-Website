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
  created_at?: string; 
}

const BlogsSec: React.FC = () => {
  const [blogs, setBlogs] = useState<Blog[]>([]);

  useEffect(() => {
    fetch("http://172.20.10.2/tara-kabataan/tara-kabataan-backend/api/blogs.php")
      .then((res) => res.json())
      .then((data) => {
        if (data.blogs) {
          const allBlogs: Blog[] = data.blogs;

          const pinnedBlogs = allBlogs
            .filter(blog => blog.blog_status === "PINNED")
            .sort((a, b) => new Date(b.created_at || "").getTime() - new Date(a.created_at || "").getTime());

          const otherBlogs = allBlogs
            .filter(blog => blog.blog_status !== "PINNED")
            .sort((a, b) => new Date(b.created_at || "").getTime() - new Date(a.created_at || "").getTime());

          const finalBlogs = [
            ...pinnedBlogs.slice(0, 3), // get as many PINNED as possible (up to 3)
            ...otherBlogs,
          ].slice(0, 3); // then slice to exactly 3 blogs total

          setBlogs(finalBlogs);
        }
      })
      .catch((err) => console.error("Failed to fetch blogs:", err));
  }, []);

  if (blogs.length === 0) return null;

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
                <Link
                  key={blog_id}
                  to={`/blog/${blog_id}`}
                  className="blog-box" 
                  style={{ textDecoration: 'none', color: 'inherit' }} 
                >
                  <div className="blogs-image-container">
                    <img
                      src={`http://172.20.10.2${image_url}`}
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
                  />
                </Link>
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
