import "./css/admin-settings.css";
import { FaSearch, FaBell, FaPlus } from "react-icons/fa";
import president from "../assets/aboutpage/council/president.jpg";
import { BsThreeDots } from "react-icons/bs";
import { useState, useEffect } from "react";
import select from "../assets/adminpage/blogs/select.png";


const AdminSettings = () => {

    interface Partner {
        partner_id: string;
        partner_image: string;
        partner_name: string;
        partner_dec: string;
        partner_contact_email: string;
        partner_phone_number: string;
      }      

    const [activeTab, setActiveTab] = useState(0);
    const tabs = ["About Us", "Members", "Partnerships"];
    const [partners, setPartners] = useState<Partner[]>([]);
    const [selectedPartner, setSelectedPartner] = useState<Partner | null>(null);
    const [isEditingPartner, setIsEditingPartner] = useState(false);
    const [editablePartner, setEditablePartner] = useState<Partner | null>(null);
    const [notification, setNotification] = useState("");
    const [editImageUrl, setEditImageUrl] = useState<string | null>(null);
    const [newImageUrl, setNewImageUrl] = useState<string | null>(null);
    const [confirmDeleteVisible, setConfirmDeleteVisible] = useState(false);
    const [selectMode, setSelectMode] = useState(false);
    const [selectedPartnerIds, setSelectedPartnerIds] = useState<string[]>([]);
    const [bulkConfirmVisible, setBulkConfirmVisible] = useState(false);
    const [bulkActionStatus, setBulkActionStatus] = useState<string>("");
    const [bulkActionType, setBulkActionType] = useState<"delete" | "status" | null>(null);

    useEffect(() => {
    fetch("http://localhost/tara-kabataan-webapp/backend/api/partners.php")
        .then((res) => res.json())
        .then((data) => {
        console.log("PARTNERS DATA:", data);
        setPartners(data.partners || []);
        })
        .catch((err) => console.error("Failed to fetch partners:", err));
    }, []);

    const getFullImageUrl = (url: string | null) => {
    if (!url) return "";
    if (url.startsWith("http")) return url;
    if (url.includes("/tara-kabataan-webapp/")) {
        return `http://localhost${url}`;
    }
    return `http://localhost/tara-kabataan-webapp${url.startsWith("/") ? "" : "/"}${url}`;
    };

    const handleSavePartnerUpdate = async () => {
        if (!editablePartner) return;
      
        const updatedPartner = {
          ...editablePartner,
          partner_image:
            editImageUrl !== null
                ? editImageUrl
                : "", 
        };
      
        try {
          const res = await fetch("http://localhost/tara-kabataan-webapp/backend/api/update_partners.php", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(updatedPartner),
          });
      
          const data = await res.json();
      
          if (data.success) {
            setPartners((prev) =>
              prev.map((p) => (p.partner_id === updatedPartner.partner_id ? updatedPartner : p))
            );
      
            setIsEditingPartner(false);
            setSelectedPartner(updatedPartner);
            setEditablePartner(null);      
            setNotification("Partner updated successfully!");
          } else {
            setNotification("Failed to update partner.");
          }
        } catch (error) {
          console.error("Update error:", error);
          setNotification("An error occurred while updating the partner.");
        }
      
        setTimeout(() => setNotification(""), 4000);
      };      

    const [isAddingNewPartner, setIsAddingNewPartner] = useState(false);
    const [newPartner, setNewPartner] = useState<Omit<Partner, "partner_id">>({
    partner_image: "",
    partner_name: "",
    partner_dec: "",
    partner_contact_email: "",
    partner_phone_number: "",
    });

    const handleAddNewPartnerSave = async () => {
        const payload = {
          ...newPartner,
          partner_image: newImageUrl || "",
        };
      
        try {
          const res = await fetch("http://localhost/tara-kabataan-webapp/backend/api/add_new_partner.php", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(payload),
          });
      
          const data = await res.json();
      
          if (data.success && data.partner) {
            setPartners((prev) => {
              const exists = prev.some(p => p.partner_id === data.partner.partner_id);
              if (exists) {
                return prev; // 🚩 Avoid duplication
              }
              return [data.partner, ...prev]; // ✅ Correctly add new partner on top
            });
      
            setNotification("New partner added successfully!");
      
            // ✅ Instantly clear form and reset states clearly to avoid duplication
            setNewPartner({
              partner_image: "",
              partner_name: "",
              partner_dec: "",
              partner_contact_email: "",
              partner_phone_number: "",
            });
            setNewImageUrl(null);
            setIsAddingNewPartner(false);
          } else {
            setNotification("Failed to add new partner.");
          }
        } catch (err) {
          console.error("Add partner error:", err);
          setNotification("An error occurred while adding the partner.");
        }
      
        setTimeout(() => setNotification(""), 4000);
      };
      
      
      const handleImageUpload = async (
        e: React.ChangeEvent<HTMLInputElement>,
        mode: "edit" | "new"
      ) => {
        const file = e.target.files?.[0];
        if (!file) return;
      
        const formData = new FormData();
        formData.append("image", file);
      
        try {
          const res = await fetch(
            "http://localhost/tara-kabataan-webapp/backend/api/upload_partner_image.php",
            {
              method: "POST",
              body: formData,
            }
          );
      
          const data = await res.json();
          if (data.success && data.image_url) {
            if (mode === "edit") {
              setEditImageUrl(data.image_url);
            } else {
              setNewImageUrl(data.image_url);
            }
          } else {
            alert("Image upload failed.");
          }
        } catch (err) {
          console.error("Upload error:", err);
          alert("An error occurred during upload.");
        }
      };
      
      const handleImageRemove = (mode: "edit" | "new") => {
        if (mode === "edit") setEditImageUrl(null);
        else setNewImageUrl(null);
      };      

      const handleSingleDelete = () => {
        setBulkActionType("delete");
        setBulkActionStatus("SINGLE_DELETE");
        setBulkConfirmVisible(true);
      };
      
      const confirmSingleDelete = async () => {
        if (!selectedPartner) return;
      
        try {
          const res = await fetch("http://localhost/tara-kabataan-webapp/backend/api/delete_partners.php", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ partner_id: selectedPartner.partner_id }),
          });
      
          const data = await res.json();
      
          if (data.success) {
            setNotification("Partner deleted successfully!");
            setPartners(prev => prev.filter(p => p.partner_id !== selectedPartner.partner_id));
            setSelectedPartner(null);
          } else {
            setNotification("Failed to delete partner.");
          }
        } catch (error) {
          console.error("Delete error:", error);
          setNotification("An error occurred while deleting.");
        }
      
        setTimeout(() => setNotification(""), 4000);
      };      

      const handleBulkDelete = async () => {
        try {
          const response = await fetch("http://localhost/tara-kabataan-webapp/backend/api/delete_bulk_partners.php", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ partner_ids: selectedPartnerIds }),
          });
      
          const data = await response.json();
      
          if (data.success) {
            setPartners(prev => prev.filter(p => !selectedPartnerIds.includes(p.partner_id)));
            setSelectedPartnerIds([]);
            setSelectMode(false);
            setNotification("Partners deleted successfully!");
          } else {
            alert("Failed to delete partners.");
          }
        } catch (err) {
          console.error("Bulk delete error:", err);
          alert("Error occurred during bulk delete.");
        }
      
        setTimeout(() => setNotification(""), 4000);
      };      
      
    
    return (
    <div className="admin-settings">
        <div className="admin-settings-header">
            <div className="admin-settings-search-container">
                <FaSearch className="admin-settings-search-icon" />
                <input
                    type="text"
                    placeholder="Search"
                />
            </div>
            <div className="admin-settings-header-right">
                <div className="admin-settings-bell-wrapper">
                    <FaBell className="admin-settings-bell-icon" />
                    <span className="admin-settings-bell-dot"></span>
                </div>
                <div className="admin-settings-loggedin-info">
                    <img src={president} className="admin-settings-loggedin-avatar" />
                    <div className="admin-settings-loggedin-desc">
                        <strong>Yugi Revaula</strong>
                        <p>yugirevaula@gmail.com</p>
                    </div>
                </div>
            </div>
        </div>
        <div className="admin-settings-lower-header">
            <h1>Settings</h1>
            <div className="admin-settings-lower-header-right">
            <div className="admin-settings-tabs-wrapper">
            {activeTab === 2 && (
                <>
                    <div className="admin-events-lower-header-select">
                    <button onClick={() => {
                        setSelectMode(!selectMode);
                        setSelectedPartnerIds([]);
                    }}>
                        <img src={select} className="admin-blogs-lower-header-select-img" />
                        {selectMode ? "Cancel" : "Select"}
                    </button>
                    </div>
                    <button
                    className="add-new-partner-btn"
                    onClick={() => {
                        setIsAddingNewPartner(true);
                        setNewPartner({
                        partner_image: "",
                        partner_name: "",
                        partner_dec: "",
                        partner_contact_email: "",
                        partner_phone_number: "",
                        });
                        setNewImageUrl(null);
                    }}
                    >
                    <FaPlus className="admin-icon-left" />
                    Add New Partner
                    </button>
                </>
                )}
                <div className="admin-settings-tabs">
                    {tabs.map((tab, index) => (
                    <button
                        key={index}
                        className={`admin-settings-tab ${activeTab === index ? "active" : ""}`}
                        onClick={() => setActiveTab(index)}
                    >
                        {tab}
                    </button>
                    ))}
                </div>
                </div>

            </div>
        </div>
        {selectMode && (
        <div className="admin-events-bulk-actions">
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
        <div className="admin-settings-main-content">
            {activeTab === 0 && (
                <div className="admin-settings-tab-placeholder">
                    <p>About Us content coming soon...</p>
                </div>
            )}
            {activeTab === 1 && (
                <div className="admin-settings-tab-placeholder">
                    <p>Members content coming soon...</p>
                </div>
            )}
            {activeTab === 2 && (
                <div className="admin-settings-scrollable-table">
                    <table className="admin-settings-table">
                        <thead>
                        <tr>
                            <th>ID</th>
                            <th>Name</th>
                            <th>Description</th>
                            <th>Email</th>
                            <th>Contact No.</th>
                            <th>View</th>
                        </tr>
                        </thead>
                        <colgroup>
                        <col style={{ width: "100px" }} />
                        <col style={{ width: "100px" }} />
                        <col style={{ width: "150px" }} />
                        <col style={{ width: "120px" }} />
                        <col style={{ width: "100px" }} />
                        <col style={{ width: "50px" }} />
                        </colgroup>
                        <tbody>
                            {partners.length > 0 ? (
                                partners.map((partner) => (
                                <tr className="admin-settings-table-content" key={partner.partner_id}>
                                    <td>{partner.partner_id}</td>
                                    <td>{partner.partner_name}</td>
                                    <td>{partner.partner_dec}</td>
                                    <td>{partner.partner_contact_email}</td>
                                    <td>{partner.partner_phone_number}</td>
                                    <td className="admin-settings-view-content">
                                        {selectMode ? (
                                            <input
                                                type="checkbox"
                                                checked={selectedPartnerIds.includes(partner.partner_id)}
                                                onChange={(e) => {
                                                    if (e.target.checked) {
                                                        setSelectedPartnerIds((prev) => [...prev, partner.partner_id]);
                                                    } else {
                                                        setSelectedPartnerIds((prev) =>
                                                            prev.filter((id) => id !== partner.partner_id)
                                                        );
                                                    }
                                }}
                                            />
                                            ) : (
                                                <button onClick={() => {
                                                    setSelectedPartner(partner);
                                                    setNotification(""); 
                                                    setConfirmDeleteVisible(false); 
                                                    }}>
                                                    <BsThreeDots />
                                                </button>
                                            )}
                                    </td>
                                </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan={6}>No Partner Data Available</td>
                                </tr>
                            )}
                            </tbody>
                    </table>
                    {selectedPartner && (
                        <div className="admin-partners-modal">
                            {selectedPartner && notification && (
                                <div
                                    className={`blogs-notification-message ${
                                    notification.includes("successfully") ? "success" : "error"
                                    } show`}
                                >
                                    {notification}
                                </div>
                                )}
                            <div className="admin-partners-modal-content">
                            <div className="admin-partners-float-buttons">
                                {isEditingPartner ? (
                                    <>
                                    <button className="save-btn" onClick={handleSavePartnerUpdate}>Save</button>
                                    <button className="cancel-btn" onClick={() => setIsEditingPartner(false)}>Cancel</button>
                                    </>
                                ) : (
                                    <>
                                    <button
                                    className="edit-btn"
                                    onClick={() => {
                                        setIsEditingPartner(true);
                                        setEditablePartner({ ...selectedPartner! });
                                        setEditImageUrl(selectedPartner?.partner_image || null); 
                                      }}                                      
                                    >
                                    Edit
                                    </button>
                                    <button className="delete-btn" onClick={handleSingleDelete}>
                                    Delete
                                    </button>
                                    </>
                                )}
                                </div>
                                <button
                                className="admin-partners-modal-close"
                                onClick={() => {
                                    setSelectedPartner(null);
                                    setIsEditingPartner(false);
                                    setEditImageUrl(null);
                                    setEditablePartner(null);
                                    setNotification(""); 
                                    setConfirmDeleteVisible(false); 
                                  }}                                  
                                >
                                ✕
                                </button>
                                <div className="admin-partners-inner-modal">
                                    <div className="admin-partners-inner-modal-left">
                                        <h2>Partner Details</h2>
                                        <div className="admin-partners-inner-modal-id">
                                            <p><strong>ID</strong></p>
                                            <p className="admin-partners-inner-modal-id-content">{selectedPartner.partner_id}</p>
                                        </div>
                                        <div className="admin-partners-inner-modal-name">
                                            <p><strong>Name</strong></p>
                                            {isEditingPartner ? (
                                                <input
                                                className="admin-partners-inner-modal-name-content"
                                                value={editablePartner?.partner_name || ""}
                                                onChange={(e) =>
                                                    setEditablePartner((prev) => prev && { ...prev, partner_name: e.target.value })
                                                }
                                                />
                                            ) : (
                                                <p className="admin-partners-inner-modal-name-content">
                                                {selectedPartner.partner_name}
                                                </p>
                                            )}
                                            </div>
                                        <div className="admin-partners-inner-modal-image">
                                            <p><strong>Image</strong></p>
                                            <div className="admin-partners-image-wrapper">
                                                <div className="admin-partners-image-preview">
                                                {isEditingPartner ? (
                                                    editImageUrl ? (
                                                        <img src={getFullImageUrl(editImageUrl)} alt="Partner" />
                                                    ) : (
                                                        <div className="admin-partners-no-image">No Partner Image</div>
                                                    )
                                                    ) : (
                                                    selectedPartner?.partner_image ? (
                                                        <img src={getFullImageUrl(selectedPartner.partner_image)} alt="Partner" />
                                                    ) : (
                                                        <div className="admin-partners-no-image">No Partner Image</div>
                                                    )
                                                    )}
                                                </div>

                                                <div className="admin-partners-image-buttons">
                                                <input
                                                    type="file"
                                                    accept="image/*"
                                                    style={{ display: "none" }}
                                                    id="partner-image-upload"
                                                    onChange={(e) => handleImageUpload(e, "edit")}
                                                    />
                                                <button
                                                    className="partners-upload-btn"
                                                    disabled={!isEditingPartner}
                                                    onClick={() => document.getElementById("partner-image-upload")?.click()}
                                                    >
                                                    Upload
                                                    </button>
                                                    <button
                                                        className="partners-remove-btn"
                                                        disabled={!isEditingPartner}
                                                        onClick={() => handleImageRemove("edit")}
                                                        >
                                                        Remove
                                                        </button>
                                                </div>
                                            </div>
                                            </div>
                                    </div>
                                    <div className="admin-partners-inner-modal-right">
                                    <div className="admin-partners-inner-modal-email">
                                        <p><strong>Email</strong></p>
                                        {isEditingPartner ? (
                                            <input
                                            className="admin-partners-inner-modal-email-content"
                                            value={editablePartner?.partner_contact_email || ""}
                                            onChange={(e) =>
                                                setEditablePartner((prev) => prev && { ...prev, partner_contact_email: e.target.value })
                                            }
                                            />
                                        ) : (
                                            <p className="admin-partners-inner-modal-email-content">
                                            {selectedPartner.partner_contact_email}
                                            </p>
                                        )}
                                        </div>
                                        <div className="admin-partners-inner-modal-contact">
                                            <p><strong>Contact</strong></p>
                                            {isEditingPartner ? (
                                                <input
                                                className="admin-partners-inner-modal-contact-content"
                                                value={editablePartner?.partner_phone_number || ""}
                                                onChange={(e) =>
                                                    setEditablePartner((prev) => prev && { ...prev, partner_phone_number: e.target.value })
                                                }
                                                />
                                            ) : (
                                                <p className="admin-partners-inner-modal-contact-content">
                                                {selectedPartner.partner_phone_number}
                                                </p>
                                            )}
                                            </div>
                                            <div className="admin-partners-inner-modal-desc">
                                                <p><strong>Description</strong></p>
                                                {isEditingPartner ? (
                                                    <textarea
                                                    className="admin-partners-inner-modal-desc-content"
                                                    value={editablePartner?.partner_dec || ""}
                                                    onChange={(e) =>
                                                        setEditablePartner((prev) => prev && { ...prev, partner_dec: e.target.value })
                                                    }
                                                    />
                                                ) : (
                                                    <p className="admin-partners-inner-modal-desc-content">
                                                    {selectedPartner.partner_dec}
                                                    </p>
                                                )}
                                            </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        )}
                        {isAddingNewPartner && (
                            <div className="admin-partners-modal">
                                {isAddingNewPartner && notification && (
                                    <div
                                        className={`blogs-notification-message ${
                                        notification.includes("successfully") ? "success" : "error"
                                        } show`}
                                    >
                                        {notification}
                                    </div>
                                    )}
                                <div className="admin-partners-modal-content">
                                <div className="admin-partners-float-buttons">
                                    <button className="save-btn" onClick={handleAddNewPartnerSave}>Save</button>
                                    <button className="cancel-btn" onClick={() => {
                                    setIsAddingNewPartner(false);
                                    setNotification("");
                                    }}
                                    >Cancel</button>
                                </div>
                                <button className="admin-partners-modal-close" onClick={() => {
                                setIsAddingNewPartner(false);
                                setNotification(""); 
                                }}
                                >✕</button>
                                <div className="admin-partners-inner-modal">
                                    <div className="admin-partners-inner-modal-left">
                                    <h2>New Partner</h2>
                                    <div className="admin-partners-inner-modal-name">
                                        <p><strong>Name</strong></p>
                                        <input
                                        className="admin-partners-inner-modal-name-content"
                                        value={newPartner.partner_name}
                                        onChange={(e) => setNewPartner({ ...newPartner, partner_name: e.target.value })}
                                        />
                                    </div>
                                    <div className="admin-partners-inner-modal-image">
                                        <p><strong>Image</strong></p>
                                        <div className="admin-partners-image-wrapper">
                                        <div className="admin-partners-image-preview">
                                        {getFullImageUrl(newImageUrl) ? (
                                        <img src={getFullImageUrl(newImageUrl)} alt="Partner" />
                                            ) : (
                                            <div className="admin-partners-no-image">No Partner Image</div>
                                            )}
                                        </div>
                                        <div className="admin-partners-image-buttons">
                                        <input
                                            type="file"
                                            accept="image/*"
                                            style={{ display: "none" }}
                                            id="new-partner-image-upload"
                                            onChange={(e) => handleImageUpload(e, "new")}
                                            />
                                            <button
                                            className="partners-upload-btn"
                                            onClick={() => document.getElementById("new-partner-image-upload")?.click()}
                                            >
                                            Upload
                                            </button>
                                            <button
                                                className="partners-remove-btn"
                                                onClick={() => handleImageRemove("new")}
                                                >
                                                Remove
                                                </button>
                                        </div>
                                        </div>
                                    </div>
                                    </div>
                                    <div className="admin-partners-inner-modal-right">
                                    <div className="admin-partners-inner-modal-email">
                                        <p><strong>Email</strong></p>
                                        <input
                                        className="admin-partners-inner-modal-email-content"
                                        value={newPartner.partner_contact_email}
                                        onChange={(e) => setNewPartner({ ...newPartner, partner_contact_email: e.target.value })}
                                        />
                                    </div>
                                    <div className="admin-partners-inner-modal-contact">
                                        <p><strong>Contact</strong></p>
                                        <input
                                        className="admin-partners-inner-modal-contact-content"
                                        value={newPartner.partner_phone_number}
                                        onChange={(e) => setNewPartner({ ...newPartner, partner_phone_number: e.target.value })}
                                        />
                                    </div>
                                    <div className="admin-partners-inner-modal-desc">
                                        <p><strong>Description</strong></p>
                                        <textarea
                                        className="admin-partners-inner-modal-desc-content"
                                        value={newPartner.partner_dec}
                                        onChange={(e) => setNewPartner({ ...newPartner, partner_dec: e.target.value })}
                                        />
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
                                    {bulkActionType === "delete" && bulkActionStatus === "SINGLE_DELETE"
                                    ? "Are you sure you want to delete this partner and all its images?"
                                    : "Are you sure you want to delete the selected partners?"}
                                </p>
                                <div className="blogs-confirmation-actions">
                                    <button
                                    className="confirm-yes"
                                    onClick={() => {
                                        if (bulkActionType === "delete") {
                                        if (bulkActionStatus === "SINGLE_DELETE") {
                                            confirmSingleDelete();
                                        } else {
                                            handleBulkDelete();
                                        }
                                        }
                                        setBulkConfirmVisible(false);
                                    }}
                                    >
                                    Yes
                                    </button>
                                    <button className="confirm-no" onClick={() => setBulkConfirmVisible(false)}>
                                    No
                                    </button>
                                </div>
                                </div>
                            </div>
                            )}
                </div>
            )}
        </div>
    </div>
    );
}
export default AdminSettings;
