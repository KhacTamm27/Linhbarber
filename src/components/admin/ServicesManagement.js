/**
 * Component: Services Management
 * Quản lý dịch vụ với CRUD operations
 */

import React, { useState, useEffect } from "react";
import ServiceController from "../../controllers/ServiceController";

const ServicesManagement = () => {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingService, setEditingService] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    image: "",
    category: "other",
    price: "",
  });
  const [message, setMessage] = useState({ type: "", text: "" });

  useEffect(() => {
    loadServices();
  }, []);

  const loadServices = async () => {
    try {
      setLoading(true);
      const data = await ServiceController.getAllServices();
      setServices(data);
    } catch (error) {
      showMessage("danger", "Không thể tải dữ liệu dịch vụ");
    } finally {
      setLoading(false);
    }
  };

  const showMessage = (type, text) => {
    setMessage({ type, text });
    setTimeout(() => setMessage({ type: "", text: "" }), 3000);
  };

  const handleOpenModal = (service = null) => {
    if (service) {
      setEditingService(service);
      setFormData({
        name: service.name,
        description: service.description,
        image: service.image,
        category: service.category,
        price: service.price || "",
      });
    } else {
      setEditingService(null);
      setFormData({
        name: "",
        description: "",
        image: "",
        category: "other",
        price: "",
      });
    }
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setEditingService(null);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const submitData = {
        ...formData,
        price: formData.price ? Number(formData.price) : null,
      };

      if (editingService) {
        await ServiceController.updateService(editingService._id, submitData);
        showMessage("success", "Cập nhật dịch vụ thành công!");
      } else {
        await ServiceController.createService(submitData);
        showMessage("success", "Thêm dịch vụ mới thành công!");
      }

      handleCloseModal();
      loadServices();
    } catch (error) {
      showMessage("danger", "Có lỗi xảy ra. Vui lòng thử lại!");
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Bạn có chắc muốn xóa dịch vụ này?")) {
      try {
        await ServiceController.deleteService(id);
        showMessage("success", "Xóa dịch vụ thành công!");
        loadServices();
      } catch (error) {
        showMessage("danger", "Không thể xóa dịch vụ!");
      }
    }
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
          <i className="fa fa-scissors"></i> Quản Lý Dịch Vụ
        </h3>
        <button className="btn btn-primary" onClick={() => handleOpenModal()}>
          <i className="fa fa-plus"></i> Thêm Dịch Vụ
        </button>
      </div>

      {message.text && (
        <div className={`alert alert-${message.type}`}>{message.text}</div>
      )}

      <div className="data-table-wrapper">
        <table className="data-table">
          <thead>
            <tr>
              <th>Hình Ảnh</th>
              <th>Tên Dịch Vụ</th>
              <th>Mô Tả</th>
              <th>Danh Mục</th>
              <th>Giá</th>
              <th>Thao Tác</th>
            </tr>
          </thead>
          <tbody>
            {services.length === 0 ? (
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
                    Chưa có dịch vụ nào
                  </p>
                </td>
              </tr>
            ) : (
              services.map((service) => (
                <tr key={service._id}>
                  <td>
                    <img src={service.image} alt={service.name} />
                  </td>
                  <td>{service.name}</td>
                  <td style={{ maxWidth: "300px" }}>
                    {service.description.substring(0, 80)}...
                  </td>
                  <td>
                    <span className="status-badge active">
                      {service.category}
                    </span>
                  </td>
                  <td>{service.price ? `$${service.price}` : "N/A"}</td>
                  <td>
                    <div className="action-buttons">
                      <button
                        className="btn-action btn-edit"
                        onClick={() => handleOpenModal(service)}
                      >
                        <i className="fa fa-edit"></i>
                      </button>
                      <button
                        className="btn-action btn-delete"
                        onClick={() => handleDelete(service._id)}
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
                {editingService ? "Chỉnh Sửa Dịch Vụ" : "Thêm Dịch Vụ Mới"}
              </h4>
              <button className="modal-close" onClick={handleCloseModal}>
                ×
              </button>
            </div>

            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label>Tên Dịch Vụ *</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-group">
                <label>Mô Tả *</label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  required
                ></textarea>
              </div>

              <div className="form-group">
                <label>URL Hình Ảnh *</label>
                <input
                  type="text"
                  name="image"
                  value={formData.image}
                  onChange={handleChange}
                  placeholder="assets/images/service.jpg"
                  required
                />
              </div>

              <div className="form-group">
                <label>Danh Mục</label>
                <select
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                >
                  <option value="haircut">Haircut</option>
                  <option value="beard">Beard</option>
                  <option value="coloring">Coloring</option>
                  <option value="styling">Styling</option>
                  <option value="other">Other</option>
                </select>
              </div>

              <div className="form-group">
                <label>Giá (không bắt buộc)</label>
                <input
                  type="number"
                  name="price"
                  value={formData.price}
                  onChange={handleChange}
                  min="0"
                />
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
                  {editingService ? "Cập Nhật" : "Thêm Mới"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ServicesManagement;
