// try.tsx
import React, { useEffect, useState } from "react";
import "./css/try.css";

interface Blog {
  blog_id: string;
  title: string;
  content: string;
  category: string;
  blog_status: string;
  image_url: string;
}

const Try = () => {
  const [blog, setBlog] = useState<Blog | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editableBlog, setEditableBlog] = useState<Blog | null>(null);

  useEffect(() => {
    fetch("http://localhost/tara-kabataan-webapp/backend/api/blogs.php")
      .then((res) => res.json())
      .then((data) => {
        const firstBlog = data.blogs[0];
        setBlog(firstBlog);
      });
  }, []);

  const handleEdit = () => {
    if (blog) setEditableBlog({ ...blog });
    setIsEditing(true);
  };

  const handleSave = () => {
    if (!editableBlog) return;
    fetch("http://localhost/tara-kabataan-webapp/backend/api/update_blogs.php", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(editableBlog),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setBlog(editableBlog);
          setIsEditing(false);
        }
      });
  };

  if (!blog) return <p>Loading...</p>;

  return (
    <div className="try-container">
      <h2>Edit Blog</h2>
      <div className="try-field">
        <label>Title:</label>
        <input
          type="text"
          value={isEditing ? editableBlog?.title || "" : blog.title}
          disabled={!isEditing}
          onChange={(e) =>
            setEditableBlog((prev) =>
              prev ? { ...prev, title: e.target.value } : null
            )
          }
        />
      </div>

      <div className="try-buttons">
        {!isEditing ? (
          <button className="edit-button" onClick={handleEdit}>Edit</button>
        ) : (
          <button className="save-button" onClick={handleSave}>Save</button>
        )}
      </div>
    </div>
  );
};

export default Try;