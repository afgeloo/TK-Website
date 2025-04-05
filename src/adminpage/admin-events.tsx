import React, { useEffect, useState } from "react";
import "./css/admin-try.css";

interface Blog {
  blog_id: string;
  title: string;
  content: string;
  category: string;
  blog_status: string;
  image_url: string;
}

const AdminEvents = () => {
  const [blog, setBlog] = useState<Blog | null>(null);
  const [form, setForm] = useState<Partial<Blog>>({});
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    fetch("http://localhost/tara-kabataan-webapp/backend/api/blogs.php")
      .then((res) => res.json())
      .then((data) => {
        const first = data.blogs[0];
        setBlog(first);
        setForm(first); // initialize form with blog
      });
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = async () => {
    if (!form.blog_id) {
      alert("Blog ID missing.");
      return;
    }

    try {
      const res = await fetch("http://localhost/tara-kabataan-webapp/backend/api/update_blogs.php", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json();
        console.log("Raw response:", data);
      if (data.success) {
        setBlog((prev) => ({ ...prev!, ...form }));
        alert("Updated successfully!");
        setIsEditing(false);
      } else {
        console.error(data);
        alert("Update failed: " + data.error);
      }
    } catch (err) {
      console.error(err);
      alert("Error during update.");
    }
  };

  if (!blog) return <p>Loading...</p>;

  return (
    <div className="try-container">
      <h2>Edit Blog</h2>

      <label>Title</label>
      <input
        name="title"
        type="text"
        value={form.title || ""}
        disabled={!isEditing}
        onChange={handleChange}
      />

      <label>Category</label>
      <input
        name="category"
        type="text"
        value={form.category || ""}
        disabled={!isEditing}
        onChange={handleChange}
      />

      <label>Status</label>
      <input
        name="blog_status"
        type="text"
        value={form.blog_status || ""}
        disabled={!isEditing}
        onChange={handleChange}
      />

      <label>Content</label>
      <input
        name="content"
        type="text"
        value={form.content || ""}
        disabled={!isEditing}
        onChange={handleChange}
      />

      <label>Image URL</label>
      <input
        name="image_url"
        type="text"
        value={form.image_url || ""}
        disabled={!isEditing}
        onChange={handleChange}
      />

      <div className="try-buttons">
        {!isEditing ? (
          <button onClick={() => setIsEditing(true)}>Edit</button>
        ) : (
          <>
            <button onClick={handleSave}>Save</button>
            <button onClick={() => setIsEditing(false)}>Cancel</button>
          </>
        )}
      </div>
    </div>
  );
};

export default AdminEvents;
