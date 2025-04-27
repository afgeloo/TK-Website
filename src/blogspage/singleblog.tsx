// SingleBlog.tsx
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Header from "../header";
import Footer from "../footer";
import Preloader from "../preloader";
import "./singleblog.css";

import silverPencil from "../assets/logos/silverPencil.png";
import silverTime from "../assets/logos/silverTime.jpg";
import attachIcon from "../assets/logos/attachicon.jpg";

interface Blog {
  blog_id: string;
  title: string;
  content: string;
  image_url: string;
  category: string;
  created_at: string;
  author: string;
}

const getSafeImageUrl = (url: string | null | undefined): string => {
  if (!url) return "";
  return url.startsWith("http") || url.startsWith("/") ? `http://localhost${url}` : url;
};

function SingleBlog() {
  const { id } = useParams();
  const [blog, setBlog] = useState<Blog | null>(null);
  const [loading, setLoading] = useState(true);
  const [copied, setCopied] = useState(false); // NEW

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const response = await fetch(`http://localhost/tara-kabataan/tara-kabataan-backend/api/blogs.php?blog_id=${id}`);
        const data = await response.json();
        if (data && data.blog_id) {
          setBlog(data);
        } else {
          console.error("No blog found");
        }
      } catch (error) {
        console.error("Error fetching blog:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchBlog();
  }, [id]);

  const copyBlogLink = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000); 
    } catch (err) {
      console.error("Failed to copy link:", err);
    }
  };

  if (loading) return <Preloader />;
  if (!blog) return <div className="single-blog-not-found">Blog not found.</div>;

  function formatContent(content: string) {
    return content
      .replace(/\n/g, "<br>") 
      .replace(/  /g, " &nbsp;"); 
  }  

  return (
    <div className="single-blog-container">
      <Header />

      <main className="single-blog-main">
        <div className="single-blog-image-wrapper">
          <img src={getSafeImageUrl(blog.image_url)} alt={blog.title} className="single-blog-image" />
        </div>

        <div className="single-blog-info">
          <span className="single-blog-category">{blog.category}</span>
          <h1 className="single-blog-title">{blog.title}</h1>

          <div className="single-blog-meta">
            <div className="single-blog-meta-item">
              <img src={silverTime} alt="Time Icon" className="single-blog-icon" />
              <span>{new Date(blog.created_at).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}</span>
            </div>
            <div className="single-blog-meta-item">
              <img src={silverPencil} alt="Author Icon" className="single-blog-icon" />
              <span>{blog.author}</span>
            </div>
          </div>
          <div
            className="single-blog-content"
            dangerouslySetInnerHTML={{ __html: formatContent(blog.content) }}
          ></div>
          <button className="single-blog-copy-link" onClick={copyBlogLink}>
            <img src={attachIcon} alt="Copy Link" />
            <span>{copied ? "Link Copied!" : "Copy Blog Link"}</span>
          </button>
        </div>
      </main>

      <Footer />
    </div>
  );
}

export default SingleBlog;
