/**
 * Component: Testimonials Management
 * Quản lý đánh giá khách hàng với CRUD operations
 */

import React, { useState, useEffect } from "react";
import TestimonialController from "../../controllers/TestimonialController";

const TestimonialsManagement = () => {
  const [testimonials, setTestimonials] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingTestimonial, setEditingTestimonial] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    comment: "",
    image: "",
    rating: 5,
    page: "both",
  });
  const [message, setMessage] = useState({ type: "", text: "" });

  useEffect(() => {
    loadTestimonials();
  }, []);

  const loadTestimonials = async () => {
    try {
      setLoading(true);
      const data = await TestimonialController.getAllTestimonials();
      setTestimonials(data);
    } catch (error) {
      showMessage("danger", "Không thể tải đánh giá");
    } finally {
      setLoading(false);
    }
  };

  const showMessage = (type, text) => {
    setMessage({ type, text });
    setTimeout(() => setMessage({ type: "", text: "" }), 3000);
  };

  const handleOpenModal = (testimonial = null) => {
    if (testimonial) {
      setEditingTestimonial(testimonial);
      setFormData({
        name: testimonial.name,
        comment: testimonial.comment,
        image: testimonial.image,
        rating: testimonial.rating,
        page: testimonial.page,
      });
    } else {
      setEditingTestimonial(null);
      setFormData({
        name: "",
        comment: "",
        image: "",
        rating: 5,
        page: "both",
      });
    }
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setEditingTestimonial(null);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "rating" ? Number(value) : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingTestimonial) {
        await TestimonialController.updateTestimonial(
          editingTestimonial._id,
          formData
        );
        showMessage("success", "Cập nhật đánh giá thành công!");
      } else {
        await TestimonialController.createTestimonial(formData);
        showMessage("success", "Thêm đánh giá mới thành công!");
      }

      handleCloseModal();
      loadTestimonials();
    } catch (error) {
      showMessage("danger", "Có lỗi xảy ra. Vui lòng thử lại!");
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Bạn có chắc muốn xóa đánh giá này?")) {
      try {
        await TestimonialController.deleteTestimonial(id);
        showMessage("success", "Xóa đánh giá thành công!");
        loadTestimonials();
      } catch (error) {
        showMessage("danger", "Không thể xóa đánh giá!");
      }
    }
  };

  const renderStars = (rating) => {
    return Array(5)
      .fill(0)
      .map((_, i) => (
        <i
          key={i}
          className={`fa fa-star${i < rating ? "" : "-o"}`}
          style={{ color: "#ffc107", marginRight: "3px" }}
        ></i>
      ));
  };

  if (loading) {
    return (
      <div className="loading-container">
        <div className="spinner-border text-primary" role="status"></div>
        <p className="mt-3">Đang tải dữ liệu...</p>
      </div>
    );
  }

  return (
    <div>
      <div className="section-header">
        <h3>
          <i className="fa fa-star"></i> Quản Lý Đánh Giá
        </h3>
        <button className="btn btn-primary" onClick={() => handleOpenModal()}>
          <i className="fa fa-plus"></i> Thêm Đánh Giá
        </button>
      </div>

      {message.text && (
        <div className={`alert alert-${message.type}`}>{message.text}</div>
      )}

      <div className="data-table-wrapper">
        <table className="data-table">
          <thead>
            <tr>
              <th>Ảnh</th>
              <th>Tên</th>
              <th>Đánh Giá</th>
              <th>Rating</th>
              <th>Hiển Thị</th>
              <th>Thao Tác</th>
            </tr>
          </thead>
          <tbody>
            {testimonials.length === 0 ? (
              <tr>
                <td
                  colSpan="6"
                  style={{ textAlign: "center", padding: "40px" }}
                >
                  <i
                    className="fa fa-inbox"
                    style={{ fontSize: "48px", color: "#ccc" }}
                  ></i>
                  <p style={{ marginTop: "15px", color: "#999" }}>
                    Chưa có đánh giá nào
                  </p>
                </td>
              </tr>
            ) : (
              testimonials.map((testimonial) => (
                <tr key={testimonial._id}>
                  <td>
                    <img src={testimonial.image} alt={testimonial.name} />
                  </td>
                  <td>{testimonial.name}</td>
                  <td style={{ maxWidth: "300px" }}>
                    {testimonial.comment.substring(0, 60)}...
                  </td>
                  <td>{renderStars(testimonial.rating)}</td>
                  <td>
                    <span className="status-badge active">
                      {testimonial.page}
                    </span>
                  </td>
                  <td>
                    <div className="action-buttons">
                      <button
                        className="btn-action btn-edit"
                        onClick={() => handleOpenModal(testimonial)}
                      >
                        <i className="fa fa-edit"></i>
                      </button>
                      <button
                        className="btn-action btn-delete"
                        onClick={() => handleDelete(testimonial._id)}
                      >
                        <i className="fa fa-trash"></i>
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="modal-overlay" onClick={handleCloseModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h4>
                {editingTestimonial
                  ? "Chỉnh Sửa Đánh Giá"
                  : "Thêm Đánh Giá Mới"}
              </h4>
              <button className="modal-close" onClick={handleCloseModal}>
                ×
              </button>
            </div>

            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label>Tên Khách Hàng *</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-group">
                <label>Nội Dung Đánh Giá *</label>
                <textarea
                  name="comment"
                  value={formData.comment}
                  onChange={handleChange}
                  required
                ></textarea>
              </div>

              <div className="form-group">
                <label>URL Ảnh *</label>
                <input
                  type="text"
                  name="image"
                  value={formData.image}
                  onChange={handleChange}
                  placeholder="assets/images/test1.jpg"
                  required
                />
              </div>

              <div className="form-group">
                <label>Số Sao *</label>
                <select
                  name="rating"
                  value={formData.rating}
                  onChange={handleChange}
                  required
                >
                  <option value={5}>5 ⭐⭐⭐⭐⭐</option>
                  <option value={4}>4 ⭐⭐⭐⭐</option>
                  <option value={3}>3 ⭐⭐⭐</option>
                  <option value={2}>2 ⭐⭐</option>
                  <option value={1}>1 ⭐</option>
                </select>
              </div>

              <div className="form-group">
                <label>Hiển Thị Tại *</label>
                <select
                  name="page"
                  value={formData.page}
                  onChange={handleChange}
                  required
                >
                  <option value="both">Cả Hai Trang</option>
                  <option value="home">Chỉ Trang Chủ</option>
                  <option value="services">Chỉ Trang Dịch Vụ</option>
                </select>
              </div>

              <div className="form-actions">
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={handleCloseModal}
                >
                  Hủy
                </button>
                <button type="submit" className="btn btn-primary">
                  {editingTestimonial ? "Cập Nhật" : "Thêm Mới"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default TestimonialsManagement;
