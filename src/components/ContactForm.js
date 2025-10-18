/**
 * Component: ContactForm
 * Ví dụ về form handling với Controller
 * Component này xử lý UI và validation, logic gửi data được xử lý bởi ContactController
 */

import React, { useState } from "react";
import ContactController from "../controllers/ContactController";

const ContactForm = () => {
  // Form state
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  // UI state
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(null);

  // Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Handle form submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Reset states
    setLoading(true);
    setSuccess(false);
    setError(null);

    try {
      // Gọi Controller để submit form
      const response = await ContactController.submitContactForm(formData);

      if (response.success) {
        setSuccess(true);
        // Reset form
        setFormData({
          name: "",
          email: "",
          phone: "",
          message: "",
        });

        // Tự động ẩn thông báo sau 5 giây
        setTimeout(() => setSuccess(false), 5000);
      } else {
        setError(response.message || "Có lỗi xảy ra khi gửi tin nhắn.");
      }
    } catch (err) {
      setError("Không thể gửi tin nhắn. Vui lòng thử lại sau.");
      console.error("Error submitting form:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="contact-form-wrapper">
      <h3 className="heading text-center mb-4">Liên Hệ Với Chúng Tôi</h3>

      {/* Success Alert */}
      {success && (
        <div className="alert alert-success" role="alert">
          <strong>Thành công!</strong> Tin nhắn của bạn đã được gửi. Chúng tôi
          sẽ phản hồi sớm nhất có thể.
        </div>
      )}

      {/* Error Alert */}
      {error && (
        <div className="alert alert-danger" role="alert">
          <strong>Lỗi!</strong> {error}
        </div>
      )}

      {/* Contact Form */}
      <form onSubmit={handleSubmit} className="contact-form">
        <div className="row">
          <div className="col-md-6">
            <div className="form-group">
              <label htmlFor="name">Họ và tên *</label>
              <input
                type="text"
                className="form-control"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Ví dụ: Nguyễn Văn A"
                required
              />
            </div>
          </div>

          <div className="col-md-6">
            <div className="form-group">
              <label htmlFor="email">Email *</label>
              <input
                type="email"
                className="form-control"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="email@example.com"
                required
              />
            </div>
          </div>
        </div>

        <div className="form-group">
          <label htmlFor="phone">Số điện thoại *</label>
          <input
            type="tel"
            className="form-control"
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            placeholder="+84 xxx xxx xxx"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="message">Nội dung *</label>
          <textarea
            className="form-control"
            id="message"
            name="message"
            rows="5"
            value={formData.message}
            onChange={handleChange}
            placeholder="Nhập nội dung tin nhắn của bạn..."
            required
          ></textarea>
        </div>

        <div className="text-center">
          <button
            type="submit"
            className="btn btn-primary btn-lg"
            disabled={loading}
          >
            {loading ? (
              <>
                <span
                  className="spinner-border spinner-border-sm mr-2"
                  role="status"
                  aria-hidden="true"
                ></span>
                Đang gửi...
              </>
            ) : (
              "Gửi Tin Nhắn"
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default ContactForm;
