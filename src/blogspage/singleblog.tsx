import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Header from "../header";
import Footer from "../footer";
import "./singleblog.css";
import silverPencil from "../assets/logos/silverPencil.png";
import silverTime from "../assets/logos/silverTime.jpg";
import attachIcon from "../assets/logos/attachicon.jpg";
import Preloader from "../preloader";

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

const getSafeImageUrl = (url: string | null | undefined): string => {
  if (!url) return "";
  return url.startsWith("http") || url.startsWith("/") ? `http://localhost${url}` : url;
};

function SingleBlog() {
  const { id } = useParams();
  const [blog, setBlog] = useState<Blog | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const response = await fetch(
          `http://localhost/tara-kabataan/tara-kabataan-backend/api/blogs.php?blog_id=${id}`
        );
        const data = await response.json();
        if (data && data.blog_id) {
          setBlog(data);
        } else {
          console.error("No blog found");
          setBlog(null);
        }
      } catch (error) {
        console.error("Error fetching blog:", error);
        setBlog(null);
      } finally {
        setLoading(false);
      }
    };

    fetchBlog();
  }, [id]);

  const copyBlogLink = () => {
    const currentUrl = window.location.href;
    navigator.clipboard.writeText(currentUrl).catch((err) => {
      console.error("Failed to copy link: ", err);
    });
  };

  if (loading) return <Preloader />;
  if (!blog) return <p>Blog not found.</p>;

  return (
    <div className="single-blog-blog-detail-page">
      <Header />

      <div className="single-blog-blog-content-wrapper">
        <img
          src={getSafeImageUrl(blog.image_url)}
          alt={blog.title}
          className="single-blog-blog-image"
        />

        <p className="single-blog-blog-category">{blog.category}</p>

        <h1 className="single-blog-blog-title">{blog.title}</h1>

        <div className="single-blog-blog-meta">
          <img src={silverTime} className="single-blog-blog-time-icon" />
          {new Date(blog.created_at).toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
          })}

          <img src={silverPencil} className="single-blog-blog-author-icon" />
          {blog.author}
        </div>

        <div
          className="single-blog-blog-content"
          dangerouslySetInnerHTML={{ __html: blog.content }}
        ></div>

        <div className="single-blog-copy-link-container">
          <span className="single-blog-copy-link-text">Copy Link to Blog</span>
          <div className="single-blog-copy-link-icon-container" onClick={copyBlogLink}>
            <div className="single-blog-copy-link-icon">
              <img src={attachIcon} alt="Copy link" className="single-blog-attach-icon" />
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default SingleBlog;
