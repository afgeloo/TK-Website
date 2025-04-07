import "./css/admin-events.css";
import president from "../assets/aboutpage/council/president.jpg";
import { BsThreeDots } from "react-icons/bs";
import { FaSearch, FaBell, FaPlus } from "react-icons/fa";
import { useEffect, useState, useRef } from "react";
import { FaBold, FaItalic, FaUnderline, FaImage, FaListUl, FaUndo, FaRedo } from "react-icons/fa";
import select from "../assets/adminpage/blogs/select.png";

const AdminEvents = () => {

  interface Event {
    event_id: string;
    image_url: string;
    category: string;
    title: string;
    event_date: string;
    event_start_time: string;
    event_end_time: string;
    event_venue: string;
    content: string;
    event_speakers: string;
    event_going: number;
    event_status: string;
    created_at: string;
    updated_at: string | null;
  }  

  const [events, setEvents] = useState<Event[]>([]);
  const [openCategory, setOpenCategory] = useState(false);
  const [openStatus, setOpenStatus] = useState(false);
  const [openCreatedAt, setOpenCreatedAt] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedStatus, setSelectedStatus] = useState("All");
  const [createdSortOrder, setCreatedSortOrder] = useState("Newest First");
  const [count, setCount] = useState(-1);
  const [open, setOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
  const [dropdownCategory, setDropdownCategory] = useState<string | null>(null);
  const [dropdownStatus, setDropdownStatus] = useState<string | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editableEvent, setEditableEvent] = useState<Event | null>(null);
  const [tempImageUrl, setTempImageUrl] = useState<string | null>(null);
  const textareaRef = useRef<HTMLDivElement>(null); 
  const selectionRef = useRef<Range | null>(null);
  const [selectMode, setSelectMode] = useState(false);
  const [selectedEventIds, setSelectedEventIds] = useState<string[]>([]);
  const [bulkConfirmVisible, setBulkConfirmVisible] = useState(false);
  const [bulkActionStatus, setBulkActionStatus] = useState<string>("");
  const [bulkActionType, setBulkActionType] = useState<"delete" | "status" | null>(null);
  const [isAddingNew, setIsAddingNew] = useState(false);
  
  useEffect(() => {
    if (selectedEvent) {
      setDropdownCategory(selectedEvent.category);
      setDropdownStatus(selectedEvent.event_status);
    }
  }, [selectedEvent]);
  
  useEffect(() => {
    fetch("http://localhost/tara-kabataan-webapp/backend/api/events1.php")
      .then((res) => res.json())
      .then((data) => {
        console.log("EVENTS DATA:", data); 
        setEvents(data.events || []);
      })
      .catch((err) => console.error("Failed to fetch events:", err));
  }, []);

  const filteredEvents = events
  .filter((event) => {
    const matchCategory =
      selectedCategory === "All" ||
      event.category.toLowerCase() === selectedCategory.toLowerCase();

    const matchStatus =
      selectedStatus === "All" ||
      event.event_status.toLowerCase() === selectedStatus.toLowerCase();

    return matchCategory && matchStatus;
  })
  .sort((a, b) => {
    const dateA = new Date(a.event_date).getTime();
    const dateB = new Date(b.event_date).getTime();
    return createdSortOrder === "Newest First" ? dateB - dateA : dateA - dateB;
  });  

  const formatDate = (timestamp: string): string => {
    const date = new Date(timestamp);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const formatTime = (timeString: string): string => {
    const [hour, minute] = timeString.split(":").map(Number);
    const date = new Date();
    date.setHours(hour);
    date.setMinutes(minute);
    return date.toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "2-digit",
    });
  };

  const handleEdit = () => {
    if (selectedEvent) {
      setEditableEvent({ ...selectedEvent });
      setIsEditing(true);
      setTimeout(() => {
        if (textareaRef.current) {
          textareaRef.current.innerHTML = selectedEvent.content || "";
        }
      }, 0);
    }
  };  
  
  const handleCancel = () => {
    setIsEditing(false);
    setEditableEvent(null);
  };
  
  const handleSave = () => {
    if (!editableEvent) return;
  
    if (tempImageUrl !== null) {
      editableEvent.image_url = tempImageUrl;
    }
  
    fetch("http://localhost/tara-kabataan-webapp/backend/api/update_event.php", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(editableEvent),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          // ✨ update saved image locally too
          const updated = { ...editableEvent };
          setEvents((prev) =>
            prev.map((e) => (e.event_id === updated.event_id ? updated : e))
          );
          setSelectedEvent(updated);
          setEditableEvent(null);
          setTempImageUrl(null); // clear preview
          setIsEditing(false);
          alert("Event updated successfully!");
        } else {
          alert("Failed to update event.");
        }
      })
      .catch((err) => {
        console.error("Update error:", err);
        alert("An error occurred while updating.");
      });
  };

  const handleDelete = async () => {
    if (!selectedEvent) return;
  
    const confirm = window.confirm("Are you sure you want to delete this event and all its images?");
    if (!confirm) return;
  
    try {
      const res = await fetch("http://localhost/tara-kabataan-webapp/backend/api/delete_event.php", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ event_id: selectedEvent.event_id })
      });
  
      const data = await res.json();
  
      if (data.success) {
        alert("Event deleted successfully!");
        setEvents(prev => prev.filter(e => e.event_id !== selectedEvent.event_id));
        setSelectedEvent(null);
        setIsEditing(false);
      } else {
        alert("Failed to delete event: " + (data.message || "Unknown error"));
      }
    } catch (error) {
      console.error("Delete error:", error);
      alert("An error occurred while deleting.");
    }
  };  
  
  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
  
    const formData = new FormData();
    formData.append("image", file);
  
    try {
      const res = await fetch("http://localhost/tara-kabataan-webapp/backend/api/upload_event_image.php", {
        method: "POST",
        body: formData,
      });
  
      const data = await res.json();
  
      if (data.success && data.image_url) {
        console.log("Uploaded image URL:", data.image_url);
        setTempImageUrl(data.image_url); 
      } else {
        alert("Image upload failed.");
      }
    } catch (error) {
      console.error("Upload error:", error);
      alert("An error occurred during upload.");
    }
  };  
  
  const handleImageRemove = () => {
    setTempImageUrl(null); 
    if (editableEvent) {
      setEditableEvent({ ...editableEvent, image_url: "" }); 
    }
  };
  
  const getFullImageUrl = (url: string | null) => {
    if (!url) return "";
    if (url.startsWith("http")) return url;
    if (url.includes("/tara-kabataan-webapp/")) {
      return `http://localhost${url}`;
    }
    return `http://localhost/tara-kabataan-webapp${url.startsWith("/") ? "" : "/"}${url}`;
  };  

  const saveSelection = () => {
    const sel = window.getSelection();
    if (sel && sel.rangeCount > 0) {
      selectionRef.current = sel.getRangeAt(0);
    }
  };
  
  const restoreSelection = () => {
    const sel = window.getSelection();
    if (selectionRef.current && sel) {
      sel.removeAllRanges();
      sel.addRange(selectionRef.current);
    }
  };
  
  const applyFormatting = (command: 'bold' | 'italic' | 'underline') => {
    restoreSelection();
    document.execCommand(command, false);
  };
  
  const applyList = () => {
    restoreSelection();
    document.execCommand("insertUnorderedList", false);
  };

  const handleBulkDelete = async () => {
    try {
      const response = await fetch("http://localhost/tara-kabataan-webapp/backend/api/delete_bulk_events.php", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ event_ids: selectedEventIds }),
      });
  
      const data = await response.json();
  
      if (data.success) {
        setEvents(prev => prev.filter(e => !selectedEventIds.includes(e.event_id)));
        setSelectedEventIds([]);
        setSelectMode(false);
      } else {
        alert("Failed to delete events.");
      }
    } catch (err) {
      console.error("Bulk delete error:", err);
      alert("Error occurred during bulk delete.");
    }
  };

  const applyBulkStatus = async (newStatus: string) => {
    try {
      const response = await fetch("http://localhost/tara-kabataan-webapp/backend/api/update_bulk_event_status.php", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          event_ids: selectedEventIds,
          new_status: newStatus,
        }),
      });
  
      const data = await response.json();
  
      if (data.success) {
        setEvents(prev =>
          prev.map(event =>
            selectedEventIds.includes(event.event_id)
              ? { ...event, event_status: newStatus }
              : event
          )
        );
        setSelectedEventIds([]);
        setSelectMode(false);
      } else {
        alert("Failed to update status.");
      }
    } catch (err) {
      console.error("Bulk status update error:", err);
      alert("Error occurred during bulk status update.");
    }
  };  
  
  
  return (
    <div className="admin-events">
      <div className="admin-events-header">
        <div className="admin-events-search-container">
          <FaSearch className="admin-events-search-icon" />
          <input type="text" placeholder="Search" />
        </div>
        <div className="admin-events-header-right">
          <div className="admin-events-bell-wrapper">
            <FaBell className="admin-events-bell-icon" />
            <span className="admin-events-bell-dot"></span>
          </div>
          <div className="admin-events-loggedin-info">
            <img src={president} className="admin-events-loggedin-avatar" />
            <div className="admin-events-loggedin-desc">
              <strong>Yugi Revaula</strong>
              <p>yugirevaula@gmail.com</p>
            </div>
          </div>
        </div>
      </div>
      <div className="admin-events-lower-header">
        <h1>Events</h1>
        <div className="admin-events-lower-header-right">
        <div className="admin-events-lower-header-show">
          <p>Showing</p>
            <div className="admin-events-lower-header-count" onClick={() => setOpen(!open)}>
              {count === -1 ? 'All' : count}
              <span className="dropdown-arrow">▾</span>
              {open && (
                <div className="admin-events-dropdown-menu">
                  {[-1,...Array.from({ length: 20 }, (_, i) => i + 1)].map((val) => (
                    <div
                      key={val}
                      className="admin-events-dropdown-item"
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
          <div className="admin-events-lower-header-select">
            <button onClick={() => {
              setSelectMode(!selectMode);
              setSelectedEventIds([]); 
            }}>
              <img src={select} className="admin-blogs-lower-header-select-img" />
              {selectMode ? "Cancel" : "Select"}
            </button>
          </div>
          <div className="admin-events-lower-header-new-event">
            <button onClick={() => setIsAddingNew(true)}>
              <FaPlus className="admin-icon-left" />
              Add New Event
            </button>
          </div>
        </div>
      </div>
      {selectMode && (
        <div className="admin-events-bulk-actions">
          {["UPCOMING", "ONGOING", "COMPLETED", "CANCELLED"].map((status) => (
            <button
              key={status}
              onClick={() => {
                setBulkActionStatus(status);
                setBulkActionType("status"); 
                setBulkConfirmVisible(true);
              }}
            >
              {status}
            </button>
          ))}
          <button
            className="bulk-delete-btn"
            onClick={() => {
              setBulkActionType("delete"); 
              setBulkConfirmVisible(true);
            }}
          >
            Delete
          </button>
        </div>
      )}
      <div className="admin-events-main-content">
        <div className="admin-events-scrollable-table">
          <table className="admin-events-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>
                  <div className="admin-events-dropdown-trigger" onClick={() => setOpenCategory(!openCategory)}>
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
                <th>Title</th>
                <th>
                  <div className="admin-events-dropdown-trigger" onClick={() => setOpenCreatedAt(!openCreatedAt)}>
                    Date <span className="admin-header-dropdown-arrow">▾</span>
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
                <th>Venue</th>
                <th>
                  <div className="admin-events-dropdown-trigger" onClick={() => setOpenStatus(!openStatus)}>
                    Status <span className="admin-header-dropdown-arrow">▾</span>
                    {openStatus && (
                      <div className="admin-header-dropdown-menu">
                        {["All", "Upcoming", "Ongoing", "Completed", "Cancelled"].map((status) => (
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
                <th>View</th>
              </tr>
            </thead>
            <colgroup>
              <col style={{ width: "80px" }} />
              <col style={{ width: "70px" }} />
              <col style={{ width: "80px" }} />
              <col style={{ width: "70px" }} />
              <col style={{ width: "80px" }} />
              <col style={{ width: "60px" }} />
              <col style={{ width: "40px" }} />
            </colgroup>
            <tbody>
            {(count === -1 ? filteredEvents : filteredEvents.slice(0, count)).length > 0 ? (
              (count === -1 ? filteredEvents : filteredEvents.slice(0, count)).map((event) => (
                  <tr className="admin-events-table-content" key={event.event_id}>
                    <td className="admin-events-id-content">{event.event_id}</td>
                    <td className="admin-events-category-content category-tag">
                      {event.category.toUpperCase()}
                    </td>
                    <td className="admin-events-title-content">{event.title}</td>
                    <td className="admin-events-date-content">{formatDate(event.event_date)}</td>
                    <td className="admin-events-venue-content">{event.event_venue}</td>
                    <td className={`event-status status-${event.event_status.toLowerCase()}`}>
                      {event.event_status.toUpperCase()}
                    </td>
                    <td className="admin-events-more-button">
                      {selectMode ? (
                        <input
                          type="checkbox"
                          checked={selectedEventIds.includes(event.event_id)}
                          onChange={(e) => {
                            if (e.target.checked) {
                              setSelectedEventIds((prev) => [...prev, event.event_id]);
                            } else {
                              setSelectedEventIds((prev) =>
                                prev.filter((id) => id !== event.event_id)
                              );
                            }
                          }}
                        />
                      ) : (
                        <button onClick={() => setSelectedEvent(event)}>
                          <BsThreeDots />
                        </button>
                      )}
                    </td>
                  </tr>
                ))
              ) : (
                <tr className="admin-blogs-table-content no-blogs-row">
                  <td colSpan={7} className="no-blogs-message">
                    No Event Found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
      {selectedEvent && (
        <div className="admin-events-view-more">
          <div className="admin-events-modal">
            <div className="admin-events-modal-content">
            <div className="admin-events-float-buttons">
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
              className="admin-events-modal-close"
              onClick={() => {
                setIsEditing(false);
                setEditableEvent(null);
                setTempImageUrl(null);
                setSelectedEvent(null);
              }}
            >
              ✕
            </button>
              <div className="admin-events-inner-content-modal">
                <div className="admin-events-inner-content-modal-top">
                  <div className="admin-events-inner-content-modal-top-left">
                    <h2>Event Details</h2>
                    <div className="admin-events-inner-content-modal-id">
                      <p><strong>ID</strong></p>
                      <p className="admin-events-inner-content-modal-id-content">{selectedEvent.event_id}</p>
                    </div>
                    <div className="admin-events-inner-content-modal-title">
                      <p><strong>Title</strong></p>
                      {isEditing ? (
                        <input
                          type="text"
                          value={editableEvent?.title || ""}
                          onChange={(e) =>
                            setEditableEvent({ ...editableEvent!, title: e.target.value })
                          }
                          className="admin-events-inner-content-modal-title-content"
                        />
                      ) : (
                        <p className="admin-events-inner-content-modal-title-content">{selectedEvent.title}</p>
                      )}
                    </div>
                    <div className="admin-events-inner-content-modal-category">
                      <p><strong>Category</strong></p>
                      <select
                        className="admin-events-inner-content-modal-category-content pink-category"
                        value={dropdownCategory ?? ''}
                        onChange={(e) => {
                          setDropdownCategory(e.target.value);
                          setEditableEvent(prev => prev ? { ...prev, category: e.target.value } : prev);
                        }}
                        disabled={!isEditing}
                      >
                        {["KALUSUGAN", "KALIKASAN", "KARUNUNGAN", "KULTURA", "KASARIAN"].map((cat) => (
                          <option key={cat} value={cat}>{cat}</option>
                        ))}
                      </select>
                    </div>
                    <div className="admin-events-inner-content-modal-venue">
                      <p><strong>Venue</strong></p>
                      {isEditing ? (
                        <input
                          type="text"
                          value={editableEvent?.event_venue || ""}
                          onChange={(e) =>
                            setEditableEvent({ ...editableEvent!, event_venue: e.target.value })
                          }
                          className="admin-events-inner-content-modal-venue-content"
                        />
                      ) : (
                        <p className="admin-events-inner-content-modal-venue-content">{selectedEvent.event_venue}</p>
                      )}
                    </div>
                    <div className="admin-events-inner-content-modal-status">
                      <p><strong>Status</strong></p>
                      <select
                        className={`admin-events-inner-content-modal-status-content status-${dropdownStatus?.toLowerCase()}`}
                        value={dropdownStatus ?? ''}
                        onChange={(e) => {
                          setDropdownStatus(e.target.value);
                          setEditableEvent(prev => prev ? { ...prev, event_status: e.target.value } : prev);
                        }}
                        disabled={!isEditing}
                      >
                        {["UPCOMING", "ONGOING", "COMPLETED", "CANCELLED"].map((stat) => (
                          <option key={stat} value={stat}>{stat}</option>
                        ))}
                      </select>
                    </div>
                  </div>
                  <div className="admin-events-inner-content-modal-top-right">
                    <div className="admin-events-inner-content-modal-date">
                      <p><strong>Date</strong></p>
                      {isEditing ? (
                        <input
                          type="date"
                          value={editableEvent?.event_date || ""}
                          onChange={(e) =>
                            setEditableEvent({ ...editableEvent!, event_date: e.target.value })
                          }
                          className="admin-events-inner-content-modal-date-content"
                        />
                      ) : (
                        <p className="admin-events-inner-content-modal-date-content">
                          {formatDate(selectedEvent.event_date)}
                        </p>
                      )}
                    </div>
                    <div className="admin-events-inner-content-modal-time">
                      <div className="admin-events-inner-content-modal-time-start">
                        <p><strong>Start Time:</strong></p>
                        {isEditing ? (
                          <input
                            type="time"
                            value={editableEvent?.event_start_time || ""}
                            onChange={(e) =>
                              setEditableEvent({ ...editableEvent!, event_start_time: e.target.value })
                            }
                            className="admin-events-inner-content-modal-time-start-content"
                          />
                        ) : (
                          <p className="admin-events-inner-content-modal-time-start-content">
                            {formatTime(selectedEvent.event_start_time)}
                          </p>
                        )}
                      </div>
                      <div className="admin-events-inner-content-modal-time-end">
                        <p><strong>End Time:</strong></p>
                        {isEditing ? (
                          <input
                            type="time"
                            value={editableEvent?.event_end_time || ""}
                            onChange={(e) =>
                              setEditableEvent({ ...editableEvent!, event_end_time: e.target.value })
                            }
                            className="admin-events-inner-content-modal-time-end-content"
                          />
                        ) : (
                          <p className="admin-events-inner-content-modal-time-end-content">
                            {formatTime(selectedEvent.event_end_time)}
                          </p>
                        )}
                      </div>
                    </div>
                    <div className="admin-events-inner-content-modal-speakers">
                      <p><strong>Speaker/s</strong></p>
                      {isEditing ? (
                        <textarea
                          value={editableEvent?.event_speakers || ""}
                          onChange={(e) =>
                            setEditableEvent({ ...editableEvent!, event_speakers: e.target.value })
                          }
                          className="admin-events-inner-content-modal-speakers-content"
                        />
                      ) : (
                        <p className="admin-events-inner-content-modal-speakers-content">
                          {selectedEvent.event_speakers}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
                <div className="admin-events-inner-content-modal-bot">
                  <div className="admin-events-inner-content-modal-bot-left">
                    <div className="admin-events-inner-content-modal-image">
                      <p><strong>Image</strong></p>
                        {getFullImageUrl(
                          isEditing
                            ? tempImageUrl !== null
                              ? tempImageUrl
                              : editableEvent?.image_url || ""
                            : selectedEvent.image_url
                        ) ? (
                          <img
                            src={getFullImageUrl(
                              isEditing
                                ? tempImageUrl !== null
                                  ? tempImageUrl
                                  : editableEvent?.image_url || ""
                                : selectedEvent.image_url
                            )}
                            alt="Event"
                          />
                        ) : (
                          <div style={{
                            width: "100%",
                            height: "200px",
                            maxWidth: "100%",
                            maxHeight: "300px",
                            backgroundColor: "#f2f2f2",
                            color: "#888",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            fontStyle: "italic",
                            border: "1px dashed #ccc"
                          }}>
                            No Blog Image
                          </div>
                        )}
                        <input
                          type="file"
                          accept="image/*"
                          style={{ display: "none" }}
                          id="event-image-upload"
                          onChange={handleImageUpload}
                        />

                        <div className="admin-blogs-image-buttons">
                          <button
                            className="upload-btn"
                            disabled={!isEditing}
                            onClick={() => document.getElementById("event-image-upload")?.click()}
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
                  <div className="admin-events-inner-content-modal-bot-right">
                    <div className="admin-events-inner-content-modal-desc">
                      <p><strong>Event Content</strong></p>
                      {isEditing ? (
                      <>
                        <div className="admin-blogs-content-image-tools">
                        <button
                          className="format-btn undo"
                          onMouseDown={(e) => {
                            e.preventDefault(); 
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
                          onMouseDown={(e) => e.preventDefault()}
                          onClick={() => document.getElementById("new-content-image-input")?.click()}
                        >
                          <FaImage />
                        </button>
                        <input
                          type="file"
                          accept="image/*"
                          id="new-content-image-input"
                          style={{ display: "none" }}
                          onChange={async (e) => {
                            const file = e.target.files?.[0];
                            if (!file) return;

                            const formData = new FormData();
                            formData.append("image", file);

                            try {
                              const res = await fetch("http://localhost/tara-kabataan-webapp/backend/api/upload_event_image.php", {
                                method: "POST",
                                body: formData,
                              });

                              const data = await res.json();
                              if (data.success && data.image_url) {
                                const img = `<img src="http://localhost${data.image_url}" alt="event image" style="max-width:100%; margin: 10px 0; display:block;" />`;
                                const div = document.getElementById("new-event-content-editor");
                                if (div) {
                                  div.innerHTML += img;
                                  setEditableEvent(prev => prev ? { ...prev, content: div.innerHTML } : prev);
                                }
                              } else {
                                alert("Image upload failed.");
                              }
                            } catch (err) {
                              console.error("Upload failed:", err);
                              alert("An error occurred during upload.");
                            }
                          }}
                        />
                        </div>
                        <div
                          id="new-event-content-editor"
                          ref={textareaRef}
                          className="admin-blogs-modal-desc-content editable"
                          contentEditable
                          onBlur={() => {
                            if (textareaRef.current) {
                              const updatedContent = textareaRef.current.innerHTML;
                              setEditableEvent(prev =>
                                prev ? { ...prev, content: updatedContent } : prev
                              );
                            }
                          }}
                        />

                      </>
                    ) : (
                      <div className="admin-blogs-modal-desc-content">
                        <div className="admin-blogs-content-images-wrapper">
                          <div dangerouslySetInnerHTML={{ __html: selectedEvent.content }} />
                        </div>
                      </div>
                    )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      {bulkConfirmVisible && (
      <div className="blogs-confirmation-popup show">
        <div className="blogs-confirmation-box">
          <p>
          {bulkActionType === "delete"
            ? "Are you sure you want to delete the selected events?"
            : `Do you really want to mark the selected events as ${bulkActionStatus}?`}
          </p>
          <div className="blogs-confirmation-actions">
            <button
              className="confirm-yes"
              onClick={() => {
                if (bulkActionType === "delete") {
                  handleBulkDelete();
                } else {
                  applyBulkStatus(bulkActionStatus);
                }
                setBulkConfirmVisible(false);
              }}
            >
              Yes
            </button>
            <button
              className="confirm-no"
              onClick={() => setBulkConfirmVisible(false)}
            >
              No
            </button>
          </div>
        </div>
      </div>
    )}
    {isAddingNew && (
      <div className="admin-new-event">
        <div className="admin-new-event-modal">
          <div className="admin-new-event-modal-content">
            <div className="admin-new-event-float-buttons">
              <button className="save-btn">Save</button>
              <button className="cancel-btn">Cancel</button>
            </div>
            <button
              className="admin-new-event-modal-close"
              onClick={() => setIsAddingNew(false)}
            >
              ✕
            </button>
            <div className="admin-new-event-inner-content-modal">
                <div className="admin-new-event-inner-content-modal-top">
                  <div className="admin-new-event-inner-content-modal-top-left">
                    <h2>Event Details</h2>
                    <p><strong>Title</strong></p>
                    <p className="admin-new-event-inner-content-modal-title-content">title</p>
                  </div>
                  <div className="admin-new-event-inner-content-modal-category">
                    <p><strong>Category</strong></p>
                    <p className="admin-new-event-inner-content-modal-category-content pink-category">category</p>
                  </div>
                  <div className="admin-new-event-inner-content-modal-venue">
                    <p><strong>Venue</strong></p>
                    <p className="admin-new-event-inner-content-modal-venue-content">venue</p>
                  </div>
                  <div className="admin-new-event-inner-content-modal-status">
                    <p><strong>Status</strong></p>
                    <p className="admin-new-event-inner-content-modal-status-content">status</p>
                  </div>
                  <div className="admin-new-event-inner-content-modal-top-right">
                    <div className="admin-new-event-inner-content-modal-date">
                      <p><strong>Date</strong></p>
                    </div>
                    <div className="admin-new-event-inner-content-modal-time">
                      <div className="admin-new-event-inner-content-modal-time-start">
                        <p><strong>Start Time:</strong></p>
                        <p className="admin-new-event-inner-content-modal-time-start-content">start time</p>
                      </div>
                      <div className="admin-new-event-inner-content-modal-time-end">
                        <p><strong>End Time:</strong></p>
                        <p className="admin-new-event-inner-content-modal-time-end-content">end time</p>
                      </div>
                    </div>
                    <div className="admin-events-inner-content-modal-speakers">
                      <p><strong>Speaker/s</strong></p>
                      <p className="admin-new-event-inner-content-modal-speakers-content">speakers</p>
                    </div>
                  </div>
                </div>
                <div className="admin-new-event-inner-content-modal-bot">
                  <div className="admin-new-event-inner-content-modal-bot-left">
                    <div className="admin-new-event-inner-content-modal-bot-left">
                      <div className="admin-new-event-inner-content-modal-image">
                        <p><strong>Image</strong></p>
                      </div>
                    </div>
                  </div>
                  <div className="admin-new-event-inner-content-modal-bot-right">
                    <div className="admin-new-event-inner-content-modal-desc">
                      <p><strong>Event Content</strong></p>
                      <p className="admin-new-event-inner-content-modal-desc-content">event content</p>
                    </div>
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

export default AdminEvents;
