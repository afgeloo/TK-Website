import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./css/admin-login.css";
import logo from "../assets/header/tarakabataanlogo2.png";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const AdminLogin: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showResetModal, setShowResetModal] = useState(false);
  const [resetEmail, setResetEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [resetMessage, setResetMessage] = useState("");

  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch("http://localhost/tara-kabataan/tara-kabataan-backend/api/adminlogin.php", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();
      if (data.success) {
        localStorage.setItem("admin-auth", "true");
        localStorage.setItem("admin-user", JSON.stringify(data.user));
        navigate("/admin", { replace: true });
      } else {
        setError(data.message || "Login failed.");
      }
    } catch (err) {
      setError("Server error. Please try again.");
    }
  };

  const handlePasswordReset = async () => {
    if (!resetEmail || !newPassword) {
      setResetMessage("Both fields are required.");
      return;
    }
    try {
      const res = await fetch("http://localhost/tara-kabataan/tara-kabataan-backend/api/resetadminpass.php", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: resetEmail, new_password: newPassword }),
      });

      const data = await res.json();
      setResetMessage(data.message);
      if (data.success) {
        setResetEmail("");
        setNewPassword("");
        setTimeout(() => setShowResetModal(false), 2000);
      }
    } catch {
      setResetMessage("Server error.");
    }
  };

  return (
    <div className="admin-login-container">
      <div className="admin-login-box">
        <div className="admin-logo-wrapper">
          <img src={logo} alt="Tara Kabataan" className="admin-login-logo" />
        </div>
        <form onSubmit={handleLogin}>
          <label htmlFor="email">Enter Email:</label>
          <input
            id="email"
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <label htmlFor="password">Enter Password:</label>
          <div className="password-input-wrapper">
            <input
              id="password"
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <button
              type="button"
              className="toggle-password"
              onClick={() => setShowPassword(!showPassword)}
              tabIndex={-1}
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </button>
          </div>

          {error && <div className="admin-login-error">{error}</div>}

          <button type="submit" className="admin-login-button">Log-in</button>
          <div className="forgot-password-wrapper">
            <div className="forgot-password">
              <a href="#" onClick={() => setShowResetModal(true)}>Forgot Password?</a>
            </div>
            <div className="forgot-password">
              <a href="#">Log in another way</a>
            </div>
          </div>
        </form>
      </div>

      {showResetModal && (
        <div className="reset-password-modal">
          <div className="reset-password-box">
            <h3>Reset Password</h3>
            <input
              type="email"
              placeholder="Your email"
              value={resetEmail}
              onChange={(e) => setResetEmail(e.target.value)}
            />
            <input
              type="password"
              placeholder="New password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
            />
            <div className="modal-buttons">
              <button onClick={handlePasswordReset}>Reset</button>
              <button onClick={() => setShowResetModal(false)}>Cancel</button>
            </div>
            {resetMessage && <div className="reset-msg">{resetMessage}</div>}
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminLogin;
