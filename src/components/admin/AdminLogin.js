/**
 * Component: Admin Login
 * Trang đăng nhập cho admin với credentials cứng
 */

import React, { useState } from "react";
import "./AdminStyles.css";

// Credentials cứng - Bạn có thể thay đổi ở đây
const ADMIN_CREDENTIALS = {
  username: "admin",
  password: "admin123",
};

const AdminLogin = ({ onLoginSuccess }) => {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    setError(""); // Clear error when user types
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    // Simulate loading delay
    setTimeout(() => {
      if (
        formData.username === ADMIN_CREDENTIALS.username &&
        formData.password === ADMIN_CREDENTIALS.password
      ) {
        // Đăng nhập thành công
        localStorage.setItem("adminLoggedIn", "true");
        localStorage.setItem("adminUsername", formData.username);
        onLoginSuccess();
      } else {
        // Đăng nhập thất bại
        setError("Tên đăng nhập hoặc mật khẩu không đúng!");
        setLoading(false);
      }
    }, 500);
  };

  return (
    <div className="admin-login-container">
      <div className="admin-login-box">
        <div className="admin-login-header">
          <i
            className="fa fa-lock"
            style={{ fontSize: "48px", color: "#667eea" }}
          ></i>
          <h2>Admin Login</h2>
          <p>Đăng nhập để quản lý website</p>
        </div>

        <form onSubmit={handleSubmit} className="admin-login-form">
          {error && (
            <div
              className="alert alert-danger"
              style={{ marginBottom: "20px" }}
            >
              <i className="fa fa-exclamation-circle"></i> {error}
            </div>
          )}

          <div className="form-group">
            <label htmlFor="username">
              <i className="fa fa-user"></i> Tên đăng nhập
            </label>
            <input
              type="text"
              id="username"
              name="username"
              value={formData.username}
              onChange={handleChange}
              placeholder="Nhập tên đăng nhập"
              required
              autoComplete="username"
              autoFocus
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">
              <i className="fa fa-lock"></i> Mật khẩu
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Nhập mật khẩu"
              required
              autoComplete="current-password"
            />
          </div>

          <button
            type="submit"
            className="btn btn-primary btn-block"
            disabled={loading}
            style={{ width: "100%", padding: "12px" }}
          >
            {loading ? (
              <>
                <span className="spinner-border spinner-border-sm mr-2"></span>
                Đang đăng nhập...
              </>
            ) : (
              <>
                <i className="fa fa-sign-in"></i> Đăng Nhập
              </>
            )}
          </button>
        </form>

        <div className="admin-login-footer">
          <p style={{ margin: "20px 0 0 0", fontSize: "14px", color: "#999" }}>
            <i className="fa fa-info-circle"></i> Demo Credentials:
          </p>
          <div
            style={{
              marginTop: "10px",
              padding: "10px",
              backgroundColor: "#f8f9fa",
              borderRadius: "5px",
              fontSize: "13px",
            }}
          >
            <strong>Username:</strong> admin
            <br />
            <strong>Password:</strong> admin123
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;
