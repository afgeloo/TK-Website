import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./css/admin-login.css";
import logo from "../assets/header/tarakabataanlogo2.png";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { ToastContainer, toast } from "react-toastify";

const AdminLogin: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showResetModal, setShowResetModal] = useState(false);
  const [resetEmail, setResetEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [resetMessage, setResetMessage] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [otpDigits, setOtpDigits] = useState(Array(6).fill("")); 
  const otpRefs = Array(6).fill(null).map(() => React.createRef<HTMLInputElement>());
  const [otpError, setOtpError] = useState("");

  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
  
    const simulateOTP = false;
  
    try {
      const res = await fetch("http://localhost/tara-kabataan/tara-kabataan-backend/api/adminlogin.php", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
  
      const data = await res.json();
  
      if (data.success) {
        localStorage.setItem("admin-user-temp", JSON.stringify(data.user));
  
        if (simulateOTP) {
          setOtpSent(true);
        } else {
          setOtpSent(true);
  
          const toastId = toast.loading("Sending OTP...");
  
          const otpRes = await fetch("http://localhost/tara-kabataan/tara-kabataan-backend/api/send_otp.php", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email }),
          });
  
          const otpData = await otpRes.json();
  
          if (otpData.success) {
            toast.update(toastId, {
              render: (
                <div>
                  <strong>OTP sent to your email.</strong>
                  <div style={{ fontSize: "0.8rem", marginTop: "4px" }}>
                    Please check in your spam inbox if not found.
                  </div>
                </div>
              ),
              type: "success",
              isLoading: false,
              autoClose: 3000,
            });
          } else {
            toast.update(toastId, {
              render: otpData?.phpmailer_error || otpData?.exception || otpData?.message || "OTP sending failed.",
              type: "error",
              isLoading: false,
              autoClose: 3000,
            });
            setError("OTP sending failed.");
          }
        }
      } else {
        setError(data.message || "Login failed.");
      }
    } catch {
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
        {otpSent && (
          <div className="otp-box-wrapper">
            <label>Enter 6-digit OTP:</label>
            <div className="otp-inputs">
            {otpDigits.map((digit, index) => (
              <input
                key={index}
                ref={otpRefs[index]}
                type="text"
                maxLength={1}
                className="otp-box"
                value={digit}
                onChange={(e) => {
                  const val = e.target.value.replace(/\D/g, "");
                  if (!val) return;
                
                  const updated = [...otpDigits];
                  updated[index] = val[0];
                  setOtpDigits(updated);
                  setOtpError("");
                  if (index < 5 && val) {
                    otpRefs[index + 1].current?.focus();
                  }
                }}                
                onKeyDown={(e) => {
                  if (e.key === "Backspace") {
                    const updated = [...otpDigits];
                    if (otpDigits[index]) {
                      updated[index] = "";
                      setOtpDigits(updated);
                    } else if (index > 0) {
                      otpRefs[index - 1].current?.focus();
                    }
                  }
                }}
              />
            ))}
            </div>
            <button
              className="admin-login-button"
              onClick={async () => {
                const otp = otpDigits.join("");
                const simulateOTP = false;

                if (simulateOTP) {
                  if (otp.length === 6) {
                    const user = localStorage.getItem("admin-user-temp");
                    if (user) {
                      localStorage.setItem("admin-auth", "true");
                      localStorage.setItem("admin-user", user);
                      localStorage.removeItem("admin-user-temp");
                      navigate("/admin", { replace: true });
                    } else {
                      setError("Session expired. Please login again.");
                    }
                  } else {
                    setError("Enter a 6-digit OTP.");
                  }
                } else {
                  try {
                    const res = await fetch("http://localhost/tara-kabataan/tara-kabataan-backend/api/verify_otp.php", {
                      method: "POST",
                      headers: { "Content-Type": "application/json" },
                      body: JSON.stringify({ email, otp, password }),
                    });

                    const data = await res.json();
                    if (data.success) {
                      localStorage.setItem("admin-auth", "true");
                      localStorage.setItem("admin-user", JSON.stringify(data.user));
                      navigate("/admin", { replace: true });
                    } else {
                      setOtpError(data.message || "Invalid OTP.");
                    }
                  } catch {
                    setOtpError("OTP verification failed.");
                  }
                }
              }}
            >
              Verify OTP
            </button>
            {otpError && <div className="admin-login-error">{otpError}</div>}
          </div>
        )}
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
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </div>
  );
};

export default AdminLogin;