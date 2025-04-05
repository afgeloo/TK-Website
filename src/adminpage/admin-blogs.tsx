import "./css/admin-blogs.css";
import { FaSearch, FaBell, FaPlus } from "react-icons/fa";
import { BsThreeDots } from "react-icons/bs";
import president from "../assets/aboutpage/council/president.jpg";
import filter from "../assets/adminpage/blogs/filter.png";
import select from "../assets/adminpage/blogs/select.png";
import { useState, useEffect, useRef } from "react";
import { FaBold, FaItalic, FaUnderline, FaImage, FaListUl, FaUndo, FaRedo } from "react-icons/fa";


interface Blog {
  blog_id: string;
  title: string;
  category: string;
  author: string;
  blog_status: string;
  created_at: string;
  content: string;
  image_url: string;
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

  const [isEditing, setIsEditing] = useState(false);
  const [editableBlog, setEditableBlog] = useState<Blog | null>(null);


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
      const isPinnedA = a.blog_status.toLowerCase() === 'pinned';
      const isPinnedB = b.blog_status.toLowerCase() === 'pinned';

      if (isPinnedA && !isPinnedB) return -1;
      if (!isPinnedA && isPinnedB) return 1;

      const dateA = new Date(a.created_at).getTime();
      const dateB = new Date(b.created_at).getTime();
      return createdSortOrder === "Newest First" ? dateB - dateA : dateA - dateB;
    })
    .slice(0, count === -1 ? blogs.length : count);

    const handleEdit = () => {
      setEditableBlog({ ...selectedBlog! });
      setIsEditing(true);
    };
    
    const handleCancel = () => {
      setIsEditing(false);
      setEditableBlog(null);
    };
    
    const handleSave = () => {
      fetch("http://localhost/tara-kabataan-webapp/backend/api/update_blogs.php", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(editableBlog),
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.success) {
            setBlogs((prev) =>
              prev.map((b) => (b.blog_id === editableBlog?.blog_id ? editableBlog : b))
            );
            setSelectedBlog(editableBlog);
            setIsEditing(false);
            setNotification("Blog updated successfully!");
            setTimeout(() => setNotification(""), 4000);
          } else {
            setNotification("Failed to update blog.");
            setTimeout(() => setNotification(""), 4000);
          }
        })
        .catch((err) => {
          console.error("Failed to update:", err);
          setNotification("Error occurred while updating blog.");
          setTimeout(() => setNotification(""), 4000);
        });
    };
    
    const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (!file || !editableBlog) return;
    
      const formData = new FormData();
      formData.append("image", file);
    
      try {
        const res = await fetch("http://localhost/tara-kabataan-webapp/backend/api/upload_blog_image.php", {
          method: "POST",
          body: formData,
        });
        const data = await res.json();
    
        if (data.success && data.image_url) {
          setEditableBlog({ ...editableBlog, image_url: data.image_url });
        } else {
          alert("Image upload failed.");
        }
      } catch (error) {
        console.error("Upload error:", error);
        alert("An error occurred during upload.");
      }
    };

    const handleImageRemove = () => {
      if (!editableBlog) return;
      setEditableBlog({ ...editableBlog, image_url: "" });
    };
    
    const [notification, setNotification] = useState("");

    const handleDelete = () => {
      const confirmDelete = window.confirm("Are you sure to delete this blog?");
      if (!confirmDelete || !selectedBlog) return;
    
      fetch("http://localhost/tara-kabataan-webapp/backend/api/delete_blogs.php", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ blog_id: selectedBlog.blog_id }),
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.success) {
            setBlogs((prev) => prev.filter((b) => b.blog_id !== selectedBlog.blog_id));
            setNotification("Blog deleted successfully!");
    
            setTimeout(() => {
              setNotification(""); 
              setSelectedBlog(null); 
            }, 2500);
          } else {
            setNotification("Failed to delete blog.");
            setTimeout(() => setNotification(""), 4000);
          }
        })
        .catch((err) => {
          console.error("Delete error:", err);
          setNotification("Error occurred while deleting blog.");
          setTimeout(() => setNotification(""), 4000);
        });
    };    

    const handleContentImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (!file || !editableBlog) return;
    
      const formData = new FormData();
      formData.append("image", file);
    
      try {
        const res = await fetch("http://localhost/tara-kabataan-webapp/backend/api/upload_blog_image.php", {
          method: "POST",
          body: formData,
        });
        const data = await res.json();
    
        if (data.success && data.image_url) {
          const imageTag = `<img src="http://localhost${data.image_url}" alt="inserted image" style="max-width:100%;" />`;
          setEditableBlog((prev) =>
            prev
              ? { ...prev, content: (prev.content || "") + `\n${imageTag}\n` }
              : prev
          );
        } else {
          alert("Failed to upload image to content.");
        }
      } catch (err) {
        console.error("Content image upload error:", err);
        alert("Error occurred while uploading image to content.");
      }
    };

    const textareaRef = useRef<HTMLDivElement>(null); 

    const applyFormatting = (command: 'bold' | 'italic' | 'underline') => {
      document.execCommand(command, false);
    };

    const selectionRef = useRef<Range | null>(null);

    const saveSelection = () => {
      const sel = window.getSelection();
      if (sel && sel.rangeCount > 0) {
        selectionRef.current = sel.getRangeAt(0);
      }
    };
  
    const applyList = () => {
      restoreSelection();
      document.execCommand("insertUnorderedList", false);
    };
    
    const restoreSelection = () => {
      const sel = window.getSelection();
      if (selectionRef.current && sel) {
        sel.removeAllRanges();
        sel.addRange(selectionRef.current);
      }
    };

    useEffect(() => {
      if (isEditing && textareaRef.current && editableBlog?.content) {
        textareaRef.current.innerHTML = editableBlog.content;
      }
    }, [isEditing, editableBlog]);
    
    
  return (
    <div className="admin-blogs">
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
      <div className="admin-blogs-scrollable-table">
        <table className="admin-blogs-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>
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
                </th>
                <th>Blog Title</th>
                <th>Author</th>
                <th>
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
                </th>
                <th>
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
                </th>
                <th>View</th>
              </tr>
            </thead>
            <colgroup>
              <col style={{ width: "80px" }} />
              <col style={{ width: "70px" }} />
              <col style={{ width: "100px" }} />
              <col style={{ width: "90px" }} />
              <col style={{ width: "70px" }} />
              <col style={{ width: "80px" }} />
              <col style={{ width: "40px" }} />
            </colgroup>

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
            <div className="admin-blogs-float-buttons">
                {isEditing ? (
                  <>
                    <button className="save-btn" onClick={handleSave}>Save</button>
                    <button className="cancel-btn" onClick={handleCancel}>Cancel</button>
                  </>
                ) : (
                  <>
                    <button className="edit-btn" onClick={handleEdit}>Edit</button>
                    <button className="delete-btn" onClick={handleDelete}>Delete</button>
                  </>
                )}
              </div>

            <button
              className="admin-blogs-modal-close"
              onClick={() => {
                if (isEditing) {
                  handleCancel(); 
                }
                setSelectedBlog(null); 
              }}
            >
              ✕
            </button>
              <div className="admin-blogs-modal-inner-content">
                  {notification && (
                  <div className={`blogs-notification-message ${notification.includes("successfully") ? "success" : "error"} show`}>
                    {notification}
                  </div>
                )}
                <div className="admin-blogs-modal-inner-content-top">
                  <div className="admin-blogs-modal-left">
                    <h2>Blog Details</h2>
                    <div className="admin-blogs-modal-id">
                      <p><strong>ID</strong></p>
                      <p className="admin-blogs-modal-id-content">{selectedBlog.blog_id}</p>
                    </div>
                    <div className="admin-blogs-modal-title">
                      <p><strong>Title</strong></p>
                      {isEditing ? (
                        <input
                          type="text"
                          value={editableBlog?.title || ""}
                          onChange={(e) => setEditableBlog({ ...editableBlog!, title: e.target.value })}
                          className="admin-blogs-modal-title-content"
                        />
                      ) : (
                        <p className="admin-blogs-modal-title-content">{selectedBlog.title}</p>
                      )}
                    </div>
                    <div className="admin-blogs-modal-category">
                      <p><strong>Category</strong></p>
                      <select
                        className={`admin-blogs-modal-select modal-category-${(isEditing ? editableBlog?.category : selectedBlog.category).toLowerCase()}`}
                        value={isEditing ? editableBlog?.category : selectedBlog.category}
                        disabled={!isEditing}
                        onChange={(e) => setEditableBlog({ ...editableBlog!, category: e.target.value })}
                      >
                        {["KALUSUGAN", "KALIKASAN", "KARUNUNGAN", "KULTURA", "KASARIAN"].map((cat) => (
                          <option key={cat} value={cat}>{cat}</option>
                        ))}
                      </select>
                    </div>
                    <div className="admin-blogs-modal-author">
                      <p><strong>Author</strong></p>
                      <p className="admin-blogs-modal-author-content">{selectedBlog.author}</p>
                    </div> 
                    <div className="admin-blogs-modal-status">
                      <p><strong>Status</strong></p>
                      <select
                        className={`admin-blogs-modal-select modal-status-${(isEditing ? editableBlog?.blog_status : selectedBlog.blog_status).toLowerCase()}`}
                        value={isEditing ? editableBlog?.blog_status : selectedBlog.blog_status}
                        disabled={!isEditing}
                        onChange={(e) => setEditableBlog({ ...editableBlog!, blog_status: e.target.value })}
                      >
                        {["DRAFT", "PUBLISHED", "PINNED", "ARCHIVED"].map((status) => (
                          <option key={status} value={status}>{status}</option>
                        ))}
                      </select>
                    </div> 
                  </div>
                  <div className="admin-blogs-modal-right">
                    <div className="admin-blogs-modal-date">
                      <p><strong>Created At</strong></p>
                      <p className="admin-blogs-modal-date-content">{formatDate(selectedBlog.created_at)}</p>
                    </div>
                    <div className="admin-blogs-modal-image">
                      <p><strong>Image</strong></p>
                      <img
                        src={
                          selectedBlog &&
                          (isEditing ? editableBlog?.image_url : selectedBlog.image_url) &&
                          ((isEditing ? editableBlog?.image_url : selectedBlog.image_url).startsWith("http") ||
                            (isEditing ? editableBlog?.image_url : selectedBlog.image_url).startsWith("/"))
                            ? `http://localhost${isEditing ? editableBlog?.image_url : selectedBlog.image_url}`
                            : (isEditing ? editableBlog?.image_url : selectedBlog.image_url) || ""
                        }
                      />
                        <input
                            type="file"
                            accept="image/*"
                            style={{ display: "none" }}
                            id="upload-image-input"
                            onChange={(e) => handleImageUpload(e)}
                          />
                          <div className="admin-blogs-image-buttons">
                            <button
                              className="upload-btn"
                              disabled={!isEditing}
                              onClick={() => {
                                if (isEditing) document.getElementById("upload-image-input")?.click();
                              }}
                            >
                              Upload
                            </button>
                            <button
                              className="remove-btn"
                              disabled={!isEditing}
                              onClick={handleImageRemove}
                            >
                              Remove
                            </button>
                          </div>
                    </div>
                </div>
                </div>
                <div className="admin-blogs-modal-inner-content-bot">
                  <div className="admin-blogs-modal-desc">
                    <p><strong>Blog Content</strong></p>
                    {isEditing ? (
                      <>
                        <div className="admin-blogs-content-image-tools">
                        <button
                          className="format-btn undo"
                          onMouseDown={(e) => {
                            e.preventDefault(); // Preserve focus in contentEditable
                            saveSelection();
                          }}
                          onClick={() => document.execCommand("undo", false)}
                        >
                          <FaUndo />
                        </button>

                        <button
                          className="format-btn redo"
                          onMouseDown={(e) => {
                            e.preventDefault();
                            saveSelection();
                          }}
                          onClick={() => document.execCommand("redo", false)}
                        >
                          <FaRedo />
                        </button>
                        <button
                          className="format-btn bold"
                          onMouseDown={(e) => {
                            e.preventDefault();
                            saveSelection();
                          }}
                          onClick={() => applyFormatting("bold")}
                        >
                          <FaBold />
                        </button>

                        <button
                          className="format-btn italic"
                          onMouseDown={(e) => {
                            e.preventDefault();
                            saveSelection();
                          }}
                          onClick={() => applyFormatting("italic")}
                        >
                          <FaItalic />
                        </button>

                        <button
                          className="format-btn underline"
                          onMouseDown={(e) => {
                            e.preventDefault();
                            saveSelection();
                          }}
                          onClick={() => applyFormatting("underline")}
                        >
                          <FaUnderline />
                        </button>

                        <button
                          className="format-btn bullet"
                          onMouseDown={(e) => {
                            e.preventDefault();
                            saveSelection();
                          }}
                          onClick={applyList}
                        >
                          <FaListUl />
                        </button>

                        <button
                          className="format-btn image"
                          onMouseDown={(e) => {
                            e.preventDefault();
                            saveSelection();
                          }}
                          onClick={() => document.getElementById("content-image-input")?.click()}
                        >
                          <FaImage />
                        </button>

                        <input
                          type="file"
                          accept="image/*"
                          id="content-image-input"
                          style={{ display: "none" }}
                          onChange={handleContentImageUpload}
                        />

                        </div>
                        <div
                          ref={textareaRef}
                          className="admin-blogs-modal-desc-content editable"
                          contentEditable
                          onBlur={() => {
                            if (textareaRef.current) {
                              const updatedContent = textareaRef.current.innerHTML;
                              setEditableBlog(prev =>
                                prev ? { ...prev, content: updatedContent } : prev
                              );
                            }
                          }}
                        />
                      </>
                    ) : (
                      <div className="admin-blogs-modal-desc-content">
                        <div className="admin-blogs-content-images-wrapper">
                          <div dangerouslySetInnerHTML={{ __html: selectedBlog.content }} />
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminBlogs;
