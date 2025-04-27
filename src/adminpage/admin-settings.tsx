import "./css/admin-settings.css";
import { FaSearch, FaBell, FaPlus, FaEdit, FaPhone, FaEnvelope, FaMapMarkerAlt, FaFacebookF, FaInstagram } from "react-icons/fa";
import president from "../assets/aboutpage/council/president.jpg";
import { BsThreeDots } from "react-icons/bs";
import { useState, useEffect } from "react";
import select from "../assets/adminpage/blogs/select.png";
import placeholderImg from "../assets/aboutpage/img-placeholder-guy.png";

const AdminSettings = () => {
  interface Member {
    member_id: string;
    member_name: string;
    member_image: string;
    role_id: string;
    role_name: string;
  }

  const [members, setMembers] = useState<Member[]>([]);

  useEffect(() => {
    fetch("http://localhost/tara-kabataan/tara-kabataan-backend/api/members.php")
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setMembers(data.members);
        }
      })
      .catch((err) => console.error("Failed to fetch members:", err));
  }, []);

  const [selectedMember, setSelectedMember] = useState<Member | null>(null);
  const [isEditingMember, setIsEditingMember] = useState(false);
  const [editableMember, setEditableMember] = useState<Member | null>(null);
  const [memberImageUrl, setMemberImageUrl] = useState<string | null>(null);

  const handleMemberImageUpload = async (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = e.target.files?.[0];
    if (!file || !editableMember?.role_id) return;
  
    const formData = new FormData();
    formData.append("image", file);
    formData.append("member_id", editableMember.member_id);
  
    try {
      const res = await fetch(
        "http://localhost/tara-kabataan/tara-kabataan-backend/api/upload_member_image.php",
        {
          method: "POST",
          body: formData,
        }
      );
      const data = await res.json();
      if (data.success && data.image_url) {
        setMemberImageUrl(`${data.image_url}?t=${Date.now()}`);
        setNotification("Member image uploaded successfully!");
      } else {
        setNotification("Member image upload failed.");
      }
      
      setTimeout(() => setNotification(""), 4000);
      
    } catch (err) {
      console.error("Member image upload error:", err);
      setNotification("Error occurred during member image upload.");
      setTimeout(() => setNotification(""), 4000);
    }
  };
  
  const handleMemberImageRemove = () => {
    setMemberImageUrl(null);
  };  

  const handleAddNewMemberSave = async () => {
    try {
      const response = await fetch("http://localhost/tara-kabataan/tara-kabataan-backend/api/add_new_member.php", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...newMember, member_image: "" }),
      });
  
      const data = await response.json();
  
      if (data.success && data.member) {
        const newId = data.member.member_id;
        let imageUrl = "";
  
        const fileInput = document.getElementById("new-member-image-upload") as HTMLInputElement;
        const file = fileInput?.files?.[0];
        if (file) {
          const formData = new FormData();
          formData.append("image", file);
          formData.append("member_id", newId);
  
          const uploadRes = await fetch("http://localhost/tara-kabataan/tara-kabataan-backend/api/upload_member_image.php", {
            method: "POST",
            body: formData,
          });
  
          const uploadData = await uploadRes.json();
          if (uploadData.success && uploadData.image_url) {
            imageUrl = uploadData.image_url;
  
            await fetch("http://localhost/tara-kabataan/tara-kabataan-backend/api/update_member.php", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                ...data.member,
                member_image: imageUrl,
              }),
            });
          }
        }
        setMembers((prev) => [
          { ...data.member, member_image: imageUrl },
          ...prev
        ]);        
        setIsAddingNewMember(false);
        setNewMember({ member_name: "", member_image: "", role_id: "" });
        setMemberImageUrl(null);
        setNotification("New member added successfully!");
      } else {
        setNotification("Failed to add member.");
      }
    } catch (err) {
      console.error("Add member error:", err);
      setNotification("An error occurred while adding the member.");
    }
  
    setTimeout(() => setNotification(""), 4000);
  };
  
  const [isAddingNewMember, setIsAddingNewMember] = useState(false);
  const [newMember, setNewMember] = useState<Omit<Member, "member_id" | "role_name">>({
    member_name: "",
    member_image: "",
    role_id: "",
  });

  const [confirmMemberDeleteVisible, setConfirmMemberDeleteVisible] = useState(false);

  const handleDeleteMember = async () => {
    if (!selectedMember) return;
  
    try {
      const res = await fetch("http://localhost/tara-kabataan/tara-kabataan-backend/api/delete_member.php", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ member_id: selectedMember.member_id }),
      });
  
      const data = await res.json();
      if (data.success) {
        setMembers((prev) => prev.filter((m) => m.member_id !== selectedMember.member_id));
        setNotification("Member deleted successfully!");
        setIsEditingMember(false);
        setSelectedMember(null);
        setEditableMember(null);
        setMemberImageUrl(null);
      } else {
        setNotification("Failed to delete member.");
      }
    } catch (err) {
      console.error("Delete member error:", err);
      setNotification("An error occurred while deleting the member.");
    }
  
    setTimeout(() => setNotification(""), 4000);
  };  

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
  const [bulkActionType, setBulkActionType] = useState<
    "delete" | "status" | null
  >(null);

  useEffect(() => {
    fetch("http://localhost/tara-kabataan/tara-kabataan-backend/api/partners.php")
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
    if (url.includes("/tara-kabataan/")) {
      return `http://localhost${url}`;
    }
    return `http://localhost/tara-kabataan${url.startsWith("/") ? "" : "/"}${url}`;
  };

  const getFullImageUrlCouncil = (url: string | null) => {
    if (!url || url.trim() === "") return placeholderImg;
    if (url.startsWith("http")) return url;
  
    const [path, query] = url.split("?");
    const fullPath = path.includes("/tara-kabataan/")
      ? `http://localhost${path}`
      : `http://localhost/tara-kabataan/${path.startsWith("/") ? "" : "/"}${path}`;
  
    return query ? `${fullPath}?${query}` : fullPath;
  };  

  const handleSavePartnerUpdate = async () => {
    if (!editablePartner) return;

    const updatedPartner = {
      ...editablePartner,
      partner_image: editImageUrl !== null ? editImageUrl : "",
    };

    try {
      const res = await fetch(
        "http://localhost/tara-kabataan/tara-kabataan-backend/api/update_partners.php",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updatedPartner),
        },
      );

      const data = await res.json();

      if (data.success) {
        setPartners((prev) =>
          prev.map((p) =>
            p.partner_id === updatedPartner.partner_id ? updatedPartner : p,
          ),
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
      partner_image: newPartner.partner_image || "",
    };
  
    try {
      const res = await fetch(
        "http://localhost/tara-kabataan/tara-kabataan-backend/api/add_new_partner.php",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        }
      );
  
      const data = await res.json();
  
      if (data.success && data.partner) {
        const newId = data.partner.partner_id;
  
        if (newImageUrl) {
          const imageFileInput = document.getElementById("new-partner-image-upload") as HTMLInputElement;
          const file = imageFileInput?.files?.[0];
  
          if (file) {
            const formData = new FormData();
            formData.append("image", file);
            formData.append("partner_id", newId);
  
            const imgRes = await fetch(
              "http://localhost/tara-kabataan/tara-kabataan-backend/api/upload_partner_image.php",
              {
                method: "POST",
                body: formData,
              }
            );
  
            const imgData = await imgRes.json();
  
            if (imgData.success && imgData.image_url) {
              data.partner.partner_image = imgData.image_url;
              await fetch("http://localhost/tara-kabataan/tara-kabataan-backend/api/update_partners.php", {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify({
                  ...data.partner,
                  partner_image: imgData.image_url,
                }),
              });
            }
          }
        }
  
        setPartners((prev) => [data.partner, ...prev]);
  
        setNotification("New partner added successfully!");
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
  
    const tempPreviewUrl = URL.createObjectURL(file);
  
    if (mode === "edit") {
      setEditImageUrl(tempPreviewUrl);
    } else {
      setNewImageUrl(tempPreviewUrl);
      return;
    }
  
    const formData = new FormData();
    formData.append("image", file);
  
    if (editablePartner?.partner_id) {
      formData.append("partner_id", editablePartner.partner_id);
    }
  
    try {
      const uploadUrl =
        "http://localhost/tara-kabataan/tara-kabataan-backend/api/upload_partner_image.php";
  
      const res = await fetch(uploadUrl, {
        method: "POST",
        body: formData,
      });
  
      const data = await res.json();
      if (data.success && data.image_url) {
        const finalUrl = `${data.image_url}?t=${Date.now()}`;
        setEditImageUrl(finalUrl);
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
      const res = await fetch(
        "http://localhost/tara-kabataan/tara-kabataan-backend/api/delete_partners.php",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ partner_id: selectedPartner.partner_id }),
        },
      );

      const data = await res.json();

      if (data.success) {
        setNotification("Partner deleted successfully!");
        setPartners((prev) =>
          prev.filter((p) => p.partner_id !== selectedPartner.partner_id),
        );
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
      const response = await fetch(
        "http://localhost/tara-kabataan/tara-kabataan-backend/api/delete_bulk_partners.php",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ partner_ids: selectedPartnerIds }),
        },
      );

      const data = await response.json();

      if (data.success) {
        setPartners((prev) =>
          prev.filter((p) => !selectedPartnerIds.includes(p.partner_id)),
        );
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

  interface AboutUs {
    aboutus_id: string;
    background: string;
    overview: string;
    core_kapwa: string;
    core_kalinangan: string;
    core_kaginhawaan: string;
    mission: string;
    vision: string;
    council: string;
    adv_kalusugan: string;
    adv_kalikasan: string;
    adv_karunungan: string;
    adv_kultura: string;
    adv_kasarian: string;
    contact_no: string;
    about_email: string;
    facebook: string;
    instagram: string;
    address: string;
  }  

  const [aboutData, setAboutData] = useState<AboutUs | null>(null);

  useEffect(() => {
    fetch("http://localhost/tara-kabataan/tara-kabataan-backend/api/aboutus.php")
      .then((res) => res.json())
      .then((data) => {
        if (!data.error) {
          setAboutData(data);
        }
      })
      .catch((err) => console.error("Failed to fetch About Us data:", err));
  }, []);

  const [isEditingContact, setIsEditingContact] = useState(false);
  const [editableContact, setEditableContact] = useState<AboutUs | null>(null);
  const [emailError, setEmailError] = useState("");
  const [phoneError, setPhoneError] = useState("");
  const [emailInvalid, setEmailInvalid] = useState(false);
  const [phoneInvalid, setPhoneInvalid] = useState(false);
  const [isEditingPageContent, setIsEditingPageContent] = useState(false);
  const [pageContentField, setPageContentField] = useState<keyof AboutUs | null>(null);
  const [editablePageContent, setEditablePageContent] = useState("");
  const [isEditingCoreValues, setIsEditingCoreValues] = useState(false);

  const [editableCoreValues, setEditableCoreValues] = useState({
    core_kapwa: "",
    core_kalinangan: "",
    core_kaginhawaan: "",
  });

  const [isEditingAdvocacies, setIsEditingAdvocacies] = useState(false);
  const [editableAdvocacies, setEditableAdvocacies] = useState({
    adv_kalusugan: "",
    adv_kalikasan: "",
    adv_karunungan: "",
    adv_kultura: "",
    adv_kasarian: "",
  });

  const handleSaveCoreValues = async () => {
    if (!aboutData) return;
  
    try {
      const updated = { ...aboutData, ...editableCoreValues };
      const res = await fetch("http://localhost/tara-kabataan/tara-kabataan-backend/api/update_aboutus.php", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updated),
      });
  
      const data = await res.json();
      if (data.success) {
        setAboutData(updated);
        setNotification("Core Values updated successfully!");
      } else {
        setNotification("Failed to update Core Values.");
      }
    } catch (err) {
      console.error("Error updating Core Values:", err);
      setNotification("An error occurred while updating Core Values.");
    }
    setIsEditingCoreValues(false);
    setTimeout(() => setNotification(""), 4000);
  };
  
  const handleSaveAdvocacies = async () => {
    if (!aboutData) return;
  
    try {
      const updated = { ...aboutData, ...editableAdvocacies };
      const res = await fetch("http://localhost/tara-kabataan/tara-kabataan-backend/api/update_aboutus.php", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updated),
      });
  
      const data = await res.json();
      if (data.success) {
        setAboutData(updated);
        setNotification("Advocacies updated successfully!");
      } else {
        setNotification("Failed to update Advocacies.");
      }
    } catch (err) {
      console.error("Error updating Advocacies:", err);
      setNotification("An error occurred while updating Advocacies.");
    }
    setIsEditingAdvocacies(false);
    setTimeout(() => setNotification(""), 4000);
  };  

  const [selectedCoreValue, setSelectedCoreValue] = useState<keyof typeof editableCoreValues>("core_kapwa");
  const [selectedAdvocacy, setSelectedAdvocacy] = useState<keyof typeof editableAdvocacies>("adv_kalusugan");

  return (
    <div className="admin-settings">
      {notification && (
        <div
          className={`blogs-notification-message ${
            notification.includes("successfully") ? "success" : "error"
          } show`}
        >
          {notification}
        </div>
      )}
      <div className="admin-settings-header">
        <div className="admin-settings-search-container">
          <FaSearch className="admin-settings-search-icon" />
          <input type="text" placeholder="Search" />
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
                  <button
                    onClick={() => {
                      setSelectMode(!selectMode);
                      setSelectedPartnerIds([]);
                    }}
                  >
                    <img
                      src={select}
                      className="admin-blogs-lower-header-select-img"
                    />
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
            <div className="admin-settings-aboutus">
              <div className="admin-settings-aboutus-contact-info">
                <div className="admin-settings-aboutus-contact-info-left">
                <h1 className="admin-settings-aboutus-contact-info-left-h1">Contact Information</h1>
                  <div className="admin-settings-aboutus-contact-info-phone">
                    <div className="admin-settings-aboutus-contact-info-phone-icon">
                      <FaPhone />
                    </div>
                    <div className="admin-settings-aboutus-contact-info-phone-desc">
                      <h1>Phone</h1>
                      <p>{aboutData?.contact_no || "N/A"}</p>
                    </div>
                  </div>
                  <div className="admin-settings-aboutus-contact-info-email">
                    <div className="admin-settings-aboutus-contact-info-email-icon">
                      <FaEnvelope />
                    </div>
                    <div className="admin-settings-aboutus-contact-info-email-desc">
                      <h1>Email</h1>
                      <p>{aboutData?.about_email || "N/A"}</p>
                    </div>
                  </div>
                  <div className="admin-settings-aboutus-contact-info-address">
                    <div className="admin-settings-aboutus-contact-info-address-icon">
                      <FaMapMarkerAlt />
                    </div>
                    <div className="admin-settings-aboutus-contact-info-address-desc">
                      <h1>Address</h1>
                      <p>{aboutData?.address || "N/A"}</p>
                    </div>
                  </div>
                </div>
                <div className="admin-settings-aboutus-contact-info-right">
                  <div className="admin-settings-aboutus-contact-info-right-edit">
                    <FaEdit
                      className="aboutus-edit-icon"
                      onClick={() => {
                        setEditableContact({ ...aboutData! });
                        setIsEditingContact(true);
                      }}
                    />
                  </div>
                  <div className="admin-settings-aboutus-contact-info-facebook">
                    <div className="admin-settings-aboutus-contact-info-facebook-icon">
                      <FaFacebookF />
                    </div>
                    <div className="admin-settings-aboutus-contact-info-facebook-desc">
                      <h1>Facebook</h1>
                      <p>{aboutData?.facebook || "N/A"}</p>
                    </div>
                  </div>
                  <div className="admin-settings-aboutus-contact-info-instagram">
                    <div className="admin-settings-aboutus-contact-info-instagram-icon">
                      <FaInstagram />
                    </div>
                    <div className="admin-settings-aboutus-contact-info-instagram-desc">
                      <h1>Instagram</h1>
                      <p>{aboutData?.instagram || "N/A"}</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="admin-settings-aboutus-page-contents">
                <div className="admin-settings-aboutus-page-contents-left">
                  <h1 className="admin-settings-aboutus-page-contents-left-h1">Page Contents</h1>
                  <div className="admin-settings-aboutus-core-val">
                    <div className="admin-settings-aboutus-core-val-left">
                      <h1>Core Values</h1>
                      <p>Kapwa, Kalinagan, Kaginhawaan</p>
                    </div>
                    <div className="admin-settings-aboutus-core-val-right">
                    <FaEdit 
                      className="aboutus-page-contents-edit-icon" 
                      onClick={() => {
                        setEditableCoreValues({
                          core_kapwa: aboutData?.core_kapwa || "",
                          core_kalinangan: aboutData?.core_kalinangan || "",
                          core_kaginhawaan: aboutData?.core_kaginhawaan || "",
                        });
                        setIsEditingCoreValues(true);
                      }}
                    />
                    </div>
                  </div>
                  <div className="admin-settings-aboutus-mission">
                    <div className="admin-settings-aboutus-mission-left">
                      <h1>Mission</h1>
                      <p>
                        {aboutData?.mission
                          ? aboutData.mission.length > 50
                            ? aboutData.mission.slice(0, 50) + "..."
                            : aboutData.mission
                          : "No mission found."}
                      </p>                    
                    </div>
                    <div className="admin-settings-aboutus-mission-right">
                    <FaEdit
                      className="aboutus-page-contents-edit-icon"
                      onClick={() => {
                        setPageContentField("mission");
                        setEditablePageContent(aboutData?.mission || "");
                        setIsEditingPageContent(true);
                      }}
                    />
                    </div>
                  </div>
                  <div className="admin-settings-aboutus-vision">
                    <div className="admin-settings-aboutus-vision-left">
                      <h1>Vision</h1>
                      <p>
                        {aboutData?.vision
                          ? aboutData.vision.length > 50
                            ? aboutData.vision.slice(0, 50) + "..."
                            : aboutData.vision
                          : "No vision found."}
                      </p>                       </div>
                    <div className="admin-settings-aboutus-vision-right">
                    <FaEdit
                      className="aboutus-page-contents-edit-icon"
                      onClick={() => {
                        setPageContentField("vision");
                        setEditablePageContent(aboutData?.vision || "");
                        setIsEditingPageContent(true);
                      }}
                    />
                    </div>
                  </div>
                </div>
                <div className="admin-settings-aboutus-page-contents-right">
                  <div className="admin-settings-aboutus-background-text">
                    <div className="admin-settings-aboutus-background-text-left">
                      <h1>Background</h1>
                      <p>
                        {aboutData?.background
                          ? aboutData.background.length > 50
                            ? aboutData.background.slice(0, 50) + "..."
                            : aboutData.background
                          : "No background found."}
                      </p>
                    </div>
                    <div className="admin-settings-aboutus-background-text-right">
                    <FaEdit
                      className="aboutus-page-contents-edit-icon"
                      onClick={() => {
                        setPageContentField("background");
                        setEditablePageContent(aboutData?.background || "");
                        setIsEditingPageContent(true);
                      }}
                    />
                    </div>
                  </div>
                  <div className="admin-settings-aboutus-council-text">
                    <div className="admin-settings-aboutus-council-text-left">
                      <h1>Council</h1>
                      <p>
                        {aboutData?.council
                          ? aboutData.council.length > 50
                            ? aboutData.council.slice(0, 50) + "..."
                            : aboutData.council
                          : "No council found."}
                      </p>
                    </div>
                    <div className="admin-settings-aboutus-council-text-right">
                    <FaEdit
                      className="aboutus-page-contents-edit-icon"
                      onClick={() => {
                        setPageContentField("council");
                        setEditablePageContent(aboutData?.council || "");
                        setIsEditingPageContent(true);
                      }}
                    />
                    </div>
                  </div>
                  <div className="admin-settings-aboutus-advocacies">
                    <div className="admin-settings-aboutus-advocacies-left">
                      <h1>Advocacies</h1>
                      <p>Kalusugan, Kalikasan, Karunungan, Kultura, Kasarian</p>
                    </div>
                    <div className="admin-settings-aboutus-advocacies-right">
                    <FaEdit 
                      className="aboutus-page-contents-edit-icon" 
                      onClick={() => {
                        setEditableAdvocacies({
                          adv_kalusugan: aboutData?.adv_kalusugan || "",
                          adv_kalikasan: aboutData?.adv_kalikasan || "",
                          adv_karunungan: aboutData?.adv_karunungan || "",
                          adv_kultura: aboutData?.adv_kultura || "",
                          adv_kasarian: aboutData?.adv_kasarian || "",
                        });
                        setIsEditingAdvocacies(true);
                      }}
                    />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {isEditingPageContent && pageContentField && (
            <div className="admin-contact-modal">
              <div className="admin-contact-modal-content">
                <button
                  className="admin-contact-modal-close"
                  onClick={() => {
                    setIsEditingPageContent(false);
                    setPageContentField(null);
                  }}
                >
                  ✕
                </button>
                <h1>Edit {pageContentField.replace("_", " ").replace(/^\w/, (c) => c.toUpperCase())}</h1>
                <textarea
                  className="admin-pagecontent-text"
                  value={editablePageContent}
                  onChange={(e) => setEditablePageContent(e.target.value)}
                />
                <div className="admin-contact-edit-actions">
                  <button
                    className="save-btn"
                    onClick={async () => {
                      if (!aboutData || !pageContentField) return;
                      try {
                        const updated = { ...aboutData, [pageContentField]: editablePageContent };
                        const res = await fetch("http://localhost/tara-kabataan/tara-kabataan-backend/api/update_aboutus.php", {
                          method: "POST",
                          headers: { "Content-Type": "application/json" },
                          body: JSON.stringify(updated),
                        });
                        const data = await res.json();
                        if (data.success) {
                          setAboutData(updated);
                          setNotification("Page content updated successfully!");
                        } else {
                          setNotification("Failed to update page content.");
                        }
                      } catch (err) {
                        console.error("Error updating page content:", err);
                        setNotification("An error occurred while updating page content.");
                      }
                      setTimeout(() => setNotification(""), 4000);

                      setIsEditingPageContent(false);
                      setPageContentField(null);
                    }}
                  >
                    Save
                  </button>
                  <button
                    className="cancel-btn"
                    onClick={() => {
                      setIsEditingPageContent(false);
                      setPageContentField(null);
                    }}
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          )}
              {isEditingCoreValues && (
                <div className="admin-contact-modal">
                  <div className="admin-contact-modal-content">
                    <button
                      className="admin-contact-modal-close"
                      onClick={() => setIsEditingCoreValues(false)}
                    >
                      ✕
                    </button>
                    <h1>Edit Core Values</h1>
                    <div className="admin-contact-edit-fields">
                      <label>Select Core Value</label>
                      <select
                        className="admin-contact-edit-select"
                        value={selectedCoreValue}
                        onChange={(e) =>
                          setSelectedCoreValue(e.target.value as keyof typeof editableCoreValues)
                        }
                      >
                        <option value="core_kapwa">Kapwa</option>
                        <option value="core_kalinangan">Kalinangan</option>
                        <option value="core_kaginhawaan">Kaginhawaan</option>
                      </select>
                      <label>Edit Text</label>
                      <textarea
                        value={editableCoreValues[selectedCoreValue]}
                        onChange={(e) =>
                          setEditableCoreValues((prev) => ({
                            ...prev,
                            [selectedCoreValue]: e.target.value,
                          }))
                        }
                        className="admin-corevalue-textarea"
                      />
                    </div>
                    <div className="admin-contact-edit-actions">
                      <button className="save-btn" onClick={handleSaveCoreValues}>
                        Save
                      </button>
                      <button
                        className="cancel-btn"
                        onClick={() => setIsEditingCoreValues(false)}
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                </div>
              )}
              {isEditingAdvocacies && (
              <div className="admin-contact-modal">
                <div className="admin-contact-modal-content">
                  <button
                    className="admin-contact-modal-close"
                    onClick={() => setIsEditingAdvocacies(false)}
                  >
                    ✕
                  </button>
                  <h1>Edit Advocacies</h1>
                  <div className="admin-contact-edit-fields">
                    <label>Select Advocacy</label>
                    <select
                      className="admin-contact-edit-select"
                      value={selectedAdvocacy}
                      onChange={(e) =>
                        setSelectedAdvocacy(e.target.value as keyof typeof editableAdvocacies)
                      }
                    >
                      <option value="adv_kalusugan">Kalusugan</option>
                      <option value="adv_kalikasan">Kalikasan</option>
                      <option value="adv_karunungan">Karunungan</option>
                      <option value="adv_kultura">Kultura</option>
                      <option value="adv_kasarian">Kasarian</option>
                    </select>
                    <label>Edit Text</label>
                    <textarea
                      value={editableAdvocacies[selectedAdvocacy]}
                      onChange={(e) =>
                        setEditableAdvocacies((prev) => ({
                          ...prev,
                          [selectedAdvocacy]: e.target.value,
                        }))
                      }
                      className="admin-corevalue-textarea"
                    />
                  </div>
                  <div className="admin-contact-edit-actions">
                    <button className="save-btn" onClick={handleSaveAdvocacies}>
                      Save
                    </button>
                    <button
                      className="cancel-btn"
                      onClick={() => setIsEditingAdvocacies(false)}
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              </div>
            )}
            {isEditingContact && editableContact && (
            <div className="admin-contact-modal">
              <div className="admin-contact-modal-content">
                <button
                  className="admin-contact-modal-close"
                  onClick={() => {
                    setIsEditingContact(false);
                    setEditableContact(null);
                  }}
                >
                  ✕
                </button>
                <h1>Edit Contact Information</h1>
                <div className="admin-contact-edit-fields">
                <label>Phone Number</label>
                  <input
                    type="text"
                    value={editableContact.contact_no || ""}
                    maxLength={11}
                    className={phoneInvalid ? "error-input" : ""}
                    onChange={(e) => {
                      const newValue = e.target.value.replace(/\D/g, ''); 
                      if (newValue.length <= 11) {
                        setEditableContact((prev) => prev ? { ...prev, contact_no: newValue } : prev);
                      }
                      setPhoneInvalid(false); 
                    }}
                  />
                  {phoneError && <p className="error-message">{phoneError}</p>}

                  <label>Email</label>
                    <input
                      type="text"
                      value={editableContact.about_email || ""}
                      className={emailInvalid ? "error-input" : ""}
                      onChange={(e) => {
                        setEditableContact((prev) => prev ? { ...prev, about_email: e.target.value } : prev);
                        setEmailInvalid(false); 
                      }}
                    />
                  {emailError && <p className="error-message">{emailError}</p>}

                  <label>Address</label>
                  <input
                    type="text"
                    value={editableContact.address || ""}
                    onChange={(e) =>
                      setEditableContact((prev) => prev ? { ...prev, address: e.target.value } : prev)
                    }
                  />

                  <label>Facebook</label>
                  <input
                    type="text"
                    value={editableContact.facebook || ""}
                    onChange={(e) =>
                      setEditableContact((prev) => prev ? { ...prev, facebook: e.target.value } : prev)
                    }
                  />

                  <label>Instagram</label>
                  <input
                    type="text"
                    value={editableContact.instagram || ""}
                    onChange={(e) =>
                      setEditableContact((prev) => prev ? { ...prev, instagram: e.target.value } : prev)
                    }
                  />
                </div>
                <div className="admin-contact-edit-actions">
                <button
                  className="save-btn"
                  onClick={async () => {
                    if (!editableContact) return;
                  
                    let hasError = false;
                    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                    const phoneRegex = /^09\d{9}$/;
                  
                    if (!emailRegex.test(editableContact.about_email)) {
                      setEmailInvalid(true);
                      hasError = true;
                    }
                  
                    if (!phoneRegex.test(editableContact.contact_no)) {
                      setPhoneInvalid(true);
                      hasError = true;
                    }
                  
                    if (hasError) return; 
                  
                    try {
                      const res = await fetch("http://localhost/tara-kabataan/tara-kabataan-backend/api/update_aboutus.php", {
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify(editableContact),
                      });
                  
                      const data = await res.json();
                  
                      if (data.success) {
                        setAboutData(editableContact);
                        setNotification("Contact Information updated successfully!");
                      } else {
                        setNotification("Failed to update Contact Information.");
                      }
                    } catch (err) {
                      console.error("Error updating Contact Information:", err);
                      setNotification("An error occurred while updating Contact Information.");
                    }
                  
                    setTimeout(() => setNotification(""), 4000);
                    setIsEditingContact(false);
                    setEditableContact(null);
                  }}                  
                >
                  Save
                </button>
                  <button
                    className="cancel-btn"
                    onClick={() => {
                      setIsEditingContact(false);
                      setEditableContact(null);
                    }}
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          )}
          </div>
        )}
        {activeTab === 1 && (
          <div className="admin-settings-tab-placeholder">
            <div className="admin-settings-members">
              <div className="admin-settings-members-cards">
                {members.map((member) => (
                  <div
                    key={member.member_id}
                    className="admin-settings-members-cards-content"
                  >
                    <div className="admin-settings-members-cards-content-photo">
                      <img
                        src={getFullImageUrlCouncil(member.member_image)}
                        alt="member"
                        className="admin-settings-members-cards-content-inner-photo"
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          target.onerror = null;
                          target.src = placeholderImg;
                        }}
                      />
                    </div>
                    <div className="admin-settings-members-cards-content-bg">
                      <div className="admin-settings-members-cards-inner-content">
                        <div className="admin-settings-members-cards-inner-desc">
                          <div className="admin-settings-members-cards-inner-content-name">
                            {member.member_name}
                          </div>
                          <div className="admin-settings-members-cards-inner-content-position">
                            {member.role_name}
                          </div>
                        </div>
                        <FaEdit
                        className="admin-settings-member-edit-icon"
                        title="Edit"
                        onClick={() => {
                          setSelectedMember(member);
                          setEditableMember({ ...member });
                          setMemberImageUrl(member.member_image);
                          setIsEditingMember(true);
                        }}
                      />
                      </div>
                    </div>
                  </div>
                ))}
                <div
                  className="admin-settings-members-cards-content admin-settings-add-member-card"
                  onClick={() => {
                    setIsAddingNewMember(true);
                    setNewMember({ member_name: "", member_image: "", role_id: "" });
                    setMemberImageUrl(null);
                  }}
                >
                  <div className="admin-settings-members-cards-content-photo add-member-photo">
                    <span className="add-member-plus">+</span>
                  </div>
                  <div className="admin-settings-members-cards-content-bg">
                    <div className="admin-settings-members-cards-inner-content">
                      <div className="admin-settings-members-cards-inner-desc">
                        <div className="admin-settings-members-cards-inner-content-name">
                          Add Member
                        </div>
                        <div className="admin-settings-members-cards-inner-content-position">
                          Click to add
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              {isEditingMember && selectedMember && (
                <div className="admin-member-modal">
                  {notification && (
                  <div
                    className={`blogs-notification-message ${
                      notification.includes("successfully") ? "success" : "error"
                    } show`}
                  >
                    {notification}
                  </div>
                )}
                  <div className="admin-member-modal-content">
                    <button
                      className="admin-member-modal-close"
                      onClick={() => {
                        setIsEditingMember(false);
                        setSelectedMember(null);
                        setEditableMember(null);
                        setMemberImageUrl(null);
                      }}
                    >
                      ✕
                    </button>
                    <h1>Edit Member</h1>
                    <div className="admin-member-edit-section">
                      <div className="admin-member-edit-image-wrapper">
                        {memberImageUrl ? (
                          <img
                            src={getFullImageUrlCouncil(memberImageUrl)}
                            alt="Preview"
                            className="admin-member-edit-photo"
                          />
                        ) : (
                          <div className="admin-member-no-image">No Image</div>
                        )}
                        <input
                        type="file"
                        accept="image/*"
                        id="member-image-upload"
                        style={{ display: "none" }}
                        onChange={handleMemberImageUpload}
                      />
                      <div className="admin-member-image-buttons">
                        <button onClick={() => document.getElementById("member-image-upload")?.click()}>
                          Upload
                        </button>
                        <button onClick={handleMemberImageRemove}>Remove</button>
                      </div>
                      </div>
                      <div className="admin-member-edit-fields">
                        <label>Name</label>
                        <input
                          type="text"
                          value={editableMember?.member_name || ''}
                          onChange={(e) =>
                            setEditableMember((prev) =>
                              prev ? { ...prev, member_name: e.target.value } : prev
                            )
                          }
                        />
                        <label>Role</label>
                        <input
                          type="text"
                          value={editableMember?.role_id || ''}
                          onChange={(e) =>
                            setEditableMember((prev) =>
                              prev ? { ...prev, role_id: e.target.value } : prev
                            )
                          }
                        />
                      </div>
                    </div>
                    <div className="admin-member-edit-actions">
                      <button
                      className="delete-member-btn"
                      onClick={() => setConfirmMemberDeleteVisible(true)}
                      >
                        Delete
                      </button>
                      <button
                        className="save-btn"
                        onClick={async () => {
                          if (!editableMember) return;
                        
                          const originalImage = selectedMember?.member_image;
                          const updatedImage = memberImageUrl || "";
                        
                          if (!memberImageUrl && originalImage) {
                            await fetch("http://localhost/tara-kabataan/tara-kabataan-backend/api/delete_member_image.php", {
                              method: "POST",
                              headers: { "Content-Type": "application/json" },
                              body: JSON.stringify({ image_url: originalImage }),
                            });
                          }
                          const updatedMember = {
                            ...editableMember,
                            member_image: updatedImage,
                          };
                        
                          try {
                            const response = await fetch(
                              "http://localhost/tara-kabataan/tara-kabataan-backend/api/update_member.php",
                              {
                                method: "POST",
                                headers: { "Content-Type": "application/json" },
                                body: JSON.stringify(updatedMember),
                              }
                            );
                            const result = await response.json();
                            if (result.success && result.member) {
                              setMembers((prev) =>
                                prev.map((u) =>
                                  u.member_id === result.member.member_id ? result.member : u
                                )
                              );
                              setIsEditingMember(false);
                              setSelectedMember(null);
                              setEditableMember(null);
                              setMemberImageUrl(null);
                              setNotification("Member updated successfully!");
                            } else {
                              setNotification("Failed to update member: " + result.message);
                            }
                            setTimeout(() => setNotification(""), 4000);                            
                          } catch (error) {
                            console.error("Update error:", error);
                            alert("Error occurred while updating member.");
                          }
                        }}                                             
                      >
                        Save
                      </button>
                      <button className="cancel-btn" onClick={() => setIsEditingMember(false)}>
                        Cancel
                      </button>
                    </div>
                  </div>
                </div>
              )}
              {confirmMemberDeleteVisible && (
              <div className="blogs-confirmation-popup show">
                <div className="blogs-confirmation-box">
                  <p>Are you sure you want to delete this member and all their images?</p>
                  <div className="blogs-confirmation-actions">
                    <button
                      className="confirm-yes"
                      onClick={() => {
                        setConfirmMemberDeleteVisible(false);
                        handleDeleteMember();
                      }}
                    >
                      Yes
                    </button>
                    <button
                      className="confirm-no"
                      onClick={() => setConfirmMemberDeleteVisible(false)}
                    >
                      No
                    </button>
                  </div>
                </div>
              </div>
            )}
               {isAddingNewMember && (
              <div className="admin-member-modal">
                {notification && (
                  <div className={`blogs-notification-message ${notification.includes("successfully") ? "success" : "error"} show`}>
                    {notification}
                  </div>
                )}
                <div className="admin-member-modal-content">
                  <button
                    className="admin-member-modal-close"
                    onClick={() => {
                      setIsAddingNewMember(false);
                      setNewMember({ member_name: "", member_image: "", role_id: "" });
                      setNotification("");
                    }}
                  >✕</button>
                  <h1>New Member</h1>
                  <div className="admin-member-edit-section">
                    <div className="admin-member-edit-image-wrapper">
                      {memberImageUrl ? (
                        <img
                        src={
                          memberImageUrl?.startsWith("blob:")
                            ? memberImageUrl
                            : getFullImageUrlCouncil(memberImageUrl)
                        }
                        alt="Preview"
                        className="admin-member-edit-photo"
                      />                      
                      ) : (
                        <div className="admin-member-no-image">No Image</div>
                      )}
                      <input
                      type="file"
                      accept="image/*"
                      id="new-member-image-upload"  
                      style={{ display: "none" }}
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (file) {
                          const tempUrl = URL.createObjectURL(file);
                          setMemberImageUrl(tempUrl);
                        }
                      }}
                    />
                      <div className="admin-member-image-buttons">
                      <button onClick={() => document.getElementById("new-member-image-upload")?.click()}>
                        Upload
                      </button>
                      <button onClick={handleMemberImageRemove}>Remove</button>
                      </div>
                    </div>
                    <div className="admin-member-edit-fields">
                      <label>Name</label>
                      <input
                        type="text"
                        value={newMember.member_name}
                        onChange={(e) =>
                          setNewMember((prev) => ({ ...prev, member_name: e.target.value }))
                        }
                      />
                      <label>Role</label>
                      <input
                        type="text"
                        value={newMember.role_id}
                        onChange={(e) =>
                          setNewMember((prev) => ({ ...prev, role_id: e.target.value }))
                        }
                      />
                    </div>
                  </div>
                  <div className="admin-member-edit-actions">
                  <button className="save-btn" onClick={handleAddNewMemberSave}>Save</button>
                  <button
                      className="cancel-btn"
                      onClick={() => {
                        setIsAddingNewMember(false);
                        setNewMember({ member_name: "", member_image: "", role_id: "" });
                        setNotification("");
                      }}
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              </div>
            )}
            </div>
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
                    <tr
                      className="admin-settings-table-content"
                      key={partner.partner_id}
                    >
                      <td>{partner.partner_id}</td>
                      <td>{partner.partner_name}</td>
                      <td>{partner.partner_dec}</td>
                      <td>{partner.partner_contact_email}</td>
                      <td>{partner.partner_phone_number}</td>
                      <td className="admin-settings-view-content">
                        {selectMode ? (
                          <input
                            type="checkbox"
                            checked={selectedPartnerIds.includes(
                              partner.partner_id,
                            )}
                            onChange={(e) => {
                              if (e.target.checked) {
                                setSelectedPartnerIds((prev) => [
                                  ...prev,
                                  partner.partner_id,
                                ]);
                              } else {
                                setSelectedPartnerIds((prev) =>
                                  prev.filter(
                                    (id) => id !== partner.partner_id,
                                  ),
                                );
                              }
                            }}
                          />
                        ) : (
                          <button
                            onClick={() => {
                              setSelectedPartner(partner);
                              setNotification("");
                              setConfirmDeleteVisible(false);
                            }}
                          >
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
                      notification.includes("successfully")
                        ? "success"
                        : "error"
                    } show`}
                  >
                    {notification}
                  </div>
                )}
                <div className="admin-partners-modal-content">
                  <div className="admin-partners-float-buttons">
                    {isEditingPartner ? (
                      <>
                        <button
                          className="save-btn"
                          onClick={handleSavePartnerUpdate}
                        >
                          Save
                        </button>
                        <button
                          className="cancel-btn"
                          onClick={() => setIsEditingPartner(false)}
                        >
                          Cancel
                        </button>
                      </>
                    ) : (
                      <>
                        <button
                          className="edit-btn"
                          onClick={() => {
                            setIsEditingPartner(true);
                            setEditablePartner({ ...selectedPartner! });
                            setEditImageUrl(
                              selectedPartner?.partner_image || null,
                            );
                          }}
                        >
                          Edit
                        </button>
                        <button
                          className="delete-btn"
                          onClick={handleSingleDelete}
                        >
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
                        <p>
                          <strong>ID</strong>
                        </p>
                        <p className="admin-partners-inner-modal-id-content">
                          {selectedPartner.partner_id}
                        </p>
                      </div>
                      <div className="admin-partners-inner-modal-name">
                        <p>
                          <strong>Name</strong>
                        </p>
                        {isEditingPartner ? (
                          <input
                            className="admin-partners-inner-modal-name-content"
                            value={editablePartner?.partner_name || ""}
                            onChange={(e) =>
                              setEditablePartner(
                                (prev) =>
                                  prev && {
                                    ...prev,
                                    partner_name: e.target.value,
                                  },
                              )
                            }
                          />
                        ) : (
                          <p className="admin-partners-inner-modal-name-content">
                            {selectedPartner.partner_name}
                          </p>
                        )}
                      </div>
                      <div className="admin-partners-inner-modal-image">
                        <p>
                          <strong>Image</strong>
                        </p>
                        <div className="admin-partners-image-wrapper">
                          <div className="admin-partners-image-preview">
                            {isEditingPartner ? (
                              editImageUrl ? (
                                <img
                                  src={getFullImageUrl(editImageUrl)}
                                  alt="Partner"
                                />
                              ) : (
                                <div className="admin-partners-no-image">
                                  No Partner Image
                                </div>
                              )
                            ) : selectedPartner?.partner_image ? (
                              <img
                                src={getFullImageUrl(
                                  selectedPartner.partner_image,
                                )}
                                alt="Partner"
                              />
                            ) : (
                              <div className="admin-partners-no-image">
                                No Partner Image
                              </div>
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
                              onClick={() =>
                                document
                                  .getElementById("partner-image-upload")
                                  ?.click()
                              }
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
                        <p>
                          <strong>Email</strong>
                        </p>
                        {isEditingPartner ? (
                          <input
                            className="admin-partners-inner-modal-email-content"
                            value={editablePartner?.partner_contact_email || ""}
                            onChange={(e) =>
                              setEditablePartner(
                                (prev) =>
                                  prev && {
                                    ...prev,
                                    partner_contact_email: e.target.value,
                                  },
                              )
                            }
                          />
                        ) : (
                          <p className="admin-partners-inner-modal-email-content">
                            {selectedPartner.partner_contact_email}
                          </p>
                        )}
                      </div>
                      <div className="admin-partners-inner-modal-contact">
                        <p>
                          <strong>Contact</strong>
                        </p>
                        {isEditingPartner ? (
                          <input
                            className="admin-partners-inner-modal-contact-content"
                            value={editablePartner?.partner_phone_number || ""}
                            onChange={(e) =>
                              setEditablePartner(
                                (prev) =>
                                  prev && {
                                    ...prev,
                                    partner_phone_number: e.target.value,
                                  },
                              )
                            }
                          />
                        ) : (
                          <p className="admin-partners-inner-modal-contact-content">
                            {selectedPartner.partner_phone_number}
                          </p>
                        )}
                      </div>
                      <div className="admin-partners-inner-modal-desc">
                        <p>
                          <strong>Description</strong>
                        </p>
                        {isEditingPartner ? (
                          <textarea
                            className="admin-partners-inner-modal-desc-content"
                            value={editablePartner?.partner_dec || ""}
                            onChange={(e) =>
                              setEditablePartner(
                                (prev) =>
                                  prev && {
                                    ...prev,
                                    partner_dec: e.target.value,
                                  },
                              )
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
                      notification.includes("successfully")
                        ? "success"
                        : "error"
                    } show`}
                  >
                    {notification}
                  </div>
                )}
                <div className="admin-partners-modal-content">
                  <div className="admin-partners-float-buttons">
                    <button
                      className="save-btn"
                      onClick={handleAddNewPartnerSave}
                    >
                      Save
                    </button>
                    <button
                      className="cancel-btn"
                      onClick={() => {
                        setIsAddingNewPartner(false);
                        setNotification("");
                      }}
                    >
                      Cancel
                    </button>
                  </div>
                  <button
                    className="admin-partners-modal-close"
                    onClick={() => {
                      setIsAddingNewPartner(false);
                      setNotification("");
                    }}
                  >
                    ✕
                  </button>
                  <div className="admin-partners-inner-modal">
                    <div className="admin-partners-inner-modal-left">
                      <h2>New Partner</h2>
                      <div className="admin-partners-inner-modal-name">
                        <p>
                          <strong>Name</strong>
                        </p>
                        <input
                          className="admin-partners-inner-modal-name-content"
                          value={newPartner.partner_name}
                          onChange={(e) =>
                            setNewPartner({
                              ...newPartner,
                              partner_name: e.target.value,
                            })
                          }
                        />
                      </div>
                      <div className="admin-partners-inner-modal-image">
                        <p>
                          <strong>Image</strong>
                        </p>
                        <div className="admin-partners-image-wrapper">
                          <div className="admin-partners-image-preview">
                          {newImageUrl ? (
                          <img src={newImageUrl} alt="Partner" />
                            ) : (
                              <div className="admin-partners-no-image">
                                No Partner Image
                              </div>
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
                              onClick={() =>
                                document
                                  .getElementById("new-partner-image-upload")
                                  ?.click()
                              }
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
                        <p>
                          <strong>Email</strong>
                        </p>
                        <input
                          className="admin-partners-inner-modal-email-content"
                          value={newPartner.partner_contact_email}
                          onChange={(e) =>
                            setNewPartner({
                              ...newPartner,
                              partner_contact_email: e.target.value,
                            })
                          }
                        />
                      </div>
                      <div className="admin-partners-inner-modal-contact">
                        <p>
                          <strong>Contact</strong>
                        </p>
                        <input
                          className="admin-partners-inner-modal-contact-content"
                          value={newPartner.partner_phone_number}
                          onChange={(e) =>
                            setNewPartner({
                              ...newPartner,
                              partner_phone_number: e.target.value,
                            })
                          }
                        />
                      </div>
                      <div className="admin-partners-inner-modal-desc">
                        <p>
                          <strong>Description</strong>
                        </p>
                        <textarea
                          className="admin-partners-inner-modal-desc-content"
                          value={newPartner.partner_dec}
                          onChange={(e) =>
                            setNewPartner({
                              ...newPartner,
                              partner_dec: e.target.value,
                            })
                          }
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
                    {bulkActionType === "delete" &&
                    bulkActionStatus === "SINGLE_DELETE"
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
          </div>
        )}
      </div>
    </div>
  );
};
export default AdminSettings;
