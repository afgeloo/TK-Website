import "./css/admin-blogs.css";
import { FaSearch, FaBell, FaPlus } from "react-icons/fa";
import { BsThreeDots } from "react-icons/bs";
import president from "../assets/aboutpage/council/president.jpg";
import filter from "../assets/adminpage/blogs/filter.png";
import select from "../assets/adminpage/blogs/select.png";
import { useState, useEffect } from "react";

interface Blog {
  blog_id: string;
  title: string;
  category: string;
  author: string;
  blog_status: string;
  created_at: string;
}

const AdminBlogs = () => {
  const [count, setCount] = useState(-1);
  const [open, setOpen] = useState(false);
  const [blogs, setBlogs] = useState<Blog[]>([]);

  const [openCreatedAt, setOpenCreatedAt] = useState(false);
  const [openCategory, setOpenCategory] = useState(false);
  const [openStatus, setOpenStatus] = useState(false);

  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedStatus, setSelectedStatus] = useState("All");
  const [createdSortOrder, setCreatedSortOrder] = useState("Newest First");

  const [selectedBlog, setSelectedBlog] = useState<Blog | null>(null);

  const formatDate = (timestamp: string): string => {
    const date = new Date(timestamp);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  useEffect(() => {
    fetch("http://localhost/tara-kabataan-webapp/backend/api/blogs.php")
      .then((res) => res.json())
      .then((data) => {
        setBlogs(data.blogs);
      })
      .catch((err) => console.error("Failed to fetch blogs:", err));
  }, []);

  const filteredBlogs = blogs
    .filter((blog) => {
      const matchCategory =
        selectedCategory === "All" ||
        blog.category.toLowerCase() === selectedCategory.toLowerCase();

      const matchStatus =
        selectedStatus === "All" ||
        blog.blog_status.toLowerCase() === selectedStatus.toLowerCase();

      return matchCategory && matchStatus;
    })
    .sort((a, b) => {
      // Prioritize 'Pinned' blogs first
      const isPinnedA = a.blog_status.toLowerCase() === 'pinned';
      const isPinnedB = b.blog_status.toLowerCase() === 'pinned';

      if (isPinnedA && !isPinnedB) return -1;
      if (!isPinnedA && isPinnedB) return 1;

      const dateA = new Date(a.created_at).getTime();
      const dateB = new Date(b.created_at).getTime();
      return createdSortOrder === "Newest First" ? dateB - dateA : dateA - dateB;
    })
    .slice(0, count === -1 ? blogs.length : count);

  return (
    <div className="admin-blogs">
      {/* Header */}
      <div className="admin-blogs-header">
        <div className="admin-blogs-search-container">
          <FaSearch className="admin-blogs-search-icon" />
          <input type="text" placeholder="Search" />
        </div>
        <div className="admin-blogs-header-right">
          <div className="admin-blogs-bell-wrapper">
            <FaBell className="admin-blogs-bell-icon" />
            <span className="admin-blogs-bell-dot"></span>
          </div>
          <div className="admin-blogs-loggedin-info">
            <img src={president} className="admin-blogs-loggedin-avatar" />
            <div className="admin-blogs-loggedin-desc">
              <strong>Yugi Revaula</strong>
              <p>yugirevaula@gmail.com</p>
            </div>
          </div>
        </div>
      </div>

      {/* Lower Header */}
      <div className="admin-blogs-lower-header">
        <h1>Blogs</h1>
        <div className="admin-blogs-lower-header-right">
          <div className="admin-blogs-lower-header-show">
            <p>Showing</p>
            <div className="admin-blogs-lower-header-count" onClick={() => setOpen(!open)}>
              {count === -1 ? 'All' : count}
              <span className="dropdown-arrow">▾</span>
              {open && (
                <div className="admin-blogs-dropdown-menu">
                  {[-1,...Array.from({ length: 20 }, (_, i) => i + 1)].map((val) => (
                    <div
                      key={val}
                      className="admin-blogs-dropdown-item"
                      onClick={() => {
                        setCount(val);
                        setOpen(false);
                      }}
                    >
                      {val === -1 ? 'All' : val}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          <div className="admin-blogs-lower-header-select">
            <button>
              <img src={select} className="admin-blogs-lower-header-select-img" />
              Select
            </button>
          </div>
          <div className="admin-blogs-lower-header-new-blog">
            <button>
              <FaPlus className="admin-icon-left" />
              Add New Blog
            </button>
          </div>
        </div>
      </div>

      {/* Table Header */}
      <div className="admin-blogs-main-content">
        <div className="admin-blogs-table-header">
          <div className="admin-blogs-id"><p>ID</p></div>
          <div className="admin-blogs-category-dropdown">
            <div className="admin-blogs-dropdown-trigger" onClick={() => setOpenCategory(!openCategory)}>
              Category <span className="admin-header-dropdown-arrow">▾</span>
              {openCategory && (
                <div className="admin-header-dropdown-menu">
                  {["All", "Kalusugan", "Kalikasan", "Karunungan", "Kultura", "Kasarian"].map((item) => (
                    <div
                      key={item}
                      className="admin-header-dropdown-item"
                      onClick={() => {
                        setSelectedCategory(item);
                        setOpenCategory(false);
                      }}
                    >
                      {item}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
          <div className="admin-blogs-title"><p>Blog Title</p></div>
          <div className="admin-blogs-author"><p>Author</p></div>
          <div className="admin-blogs-status-dropdown">
            <div className="admin-blogs-dropdown-trigger" onClick={() => setOpenStatus(!openStatus)}>
              Status <span className="admin-header-dropdown-arrow">▾</span>
              {openStatus && (
                <div className="admin-header-dropdown-menu">
                  {["All", "Draft", "Published", "Pinned", "Archived"].map((status) => (
                    <div
                      key={status}
                      className="admin-header-dropdown-item"
                      onClick={() => {
                        setSelectedStatus(status);
                        setOpenStatus(false);
                      }}
                    >
                      {status}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
          <div className="admin-blogs-created-at-dropdown">
            <div className="admin-blogs-dropdown-trigger" onClick={() => setOpenCreatedAt(!openCreatedAt)}>
              Created At <span className="admin-header-dropdown-arrow">▾</span>
              {openCreatedAt && (
                <div className="admin-header-dropdown-menu">
                  {["Newest First", "Oldest First"].map((order) => (
                    <div
                      key={order}
                      className="admin-header-dropdown-item"
                      onClick={() => {
                        setCreatedSortOrder(order);
                        setOpenCreatedAt(false);
                      }}
                    >
                      {order}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
          <div className="admin-blogs-view"><p>View</p></div>
          <div className="admin-blogs-actions-header"><p></p></div>
        </div>

        {/* Table Body */}
        <div className="admin-blogs-scrollable-table">
          <table className="admin-blogs-table">
            <tbody>
              {filteredBlogs.map((blog) => (
                <tr className="admin-blogs-table-content" key={blog.blog_id}>
                  <td className="admin-blogs-id-content">{blog.blog_id}</td>
                  <td className="admin-blogs-category-content category-tag">{blog.category}</td>
                  <td className="admin-blogs-title-content">{blog.title}</td>
                  <td className="admin-blogs-author-content">{blog.author}</td>
                  <td className={`admin-blogs-status-content status-${blog.blog_status.toLowerCase()}`}>
                    {blog.blog_status}
                  </td>
                  <td className="admin-blogs-created-at-content">{formatDate(blog.created_at)}</td>
                  <td className="admin-blogs-more-button">
                    <button onClick={() => setSelectedBlog(blog)}>
                      <BsThreeDots />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {selectedBlog && (
        <div className="admin-blogs-view-more">
            <div className="admin-blogs-modal">
                <div className="admin-blogs-modal-content">
                    <button className="admin-blogs-modal-close" onClick={() => setSelectedBlog(null)}>
                    ✕
                    </button>
                    <h2>Blog Details</h2>
                    <p><strong>ID:</strong> {selectedBlog.blog_id}</p>
                    <p><strong>Title:</strong> {selectedBlog.title}</p>
                    <p><strong>Category:</strong> {selectedBlog.category}</p>
                    <p><strong>Author:</strong> {selectedBlog.author}</p>
                    <p><strong>Status:</strong> {selectedBlog.blog_status}</p>
                    <p><strong>Created At:</strong> {formatDate(selectedBlog.created_at)}</p>
                </div>
            </div>
        </div>
      )}
    </div>
  );
};

export default AdminBlogs;
