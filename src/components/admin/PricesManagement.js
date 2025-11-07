/**
 * Component: Prices Management
 * Quản lý bảng giá với CRUD operations
 */

import React, { useState, useEffect } from "react";
import PriceController from "../../controllers/PriceController";

const PricesManagement = () => {
  const [prices, setPrices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingPrice, setEditingPrice] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    category: "beard",
    price: "",
    description: "",
  });
  const [message, setMessage] = useState({ type: "", text: "" });
  const [filterCategory, setFilterCategory] = useState("all");

  useEffect(() => {
    loadPrices();
  }, [filterCategory]);

  const loadPrices = async () => {
    try {
      setLoading(true);
      let data;
      if (filterCategory === "all") {
        data = await PriceController.getAllPrices();
      } else {
        data = await PriceController.getPricesByCategory(filterCategory);
      }
      setPrices(data);
    } catch (error) {
      showMessage("danger", "Không thể tải bảng giá");
    } finally {
      setLoading(false);
    }
  };

  const showMessage = (type, text) => {
    setMessage({ type, text });
    setTimeout(() => setMessage({ type: "", text: "" }), 3000);
  };

  const handleOpenModal = (price = null) => {
    if (price) {
      setEditingPrice(price);
      setFormData({
        name: price.name,
        category: price.category,
        price: price.price,
        description: price.description || "",
      });
    } else {
      setEditingPrice(null);
      setFormData({
        name: "",
        category: "beard",
        price: "",
        description: "",
      });
    }
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setEditingPrice(null);
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
      let formattedPrice = formData.price.replace(/\s*-\s*/g, "-").trim();

      // ✅ Kiểm tra định dạng giá
      const priceRegex = /^\d+(-\d+)?$/;
      if (!priceRegex.test(formattedPrice)) {
        showMessage(
          "danger",
          "Khoảng giá không hợp lệ. Dùng định dạng: 50000 hoặc 50000-100000"
        );
        return;
      }

      const submitData = {
        ...formData,
        price: formattedPrice,
      };

      if (editingPrice) {
        await PriceController.updatePrice(editingPrice._id, submitData);
        showMessage("success", "Cập nhật giá thành công!");
      } else {
        await PriceController.createPrice(submitData);
        showMessage("success", "Thêm giá mới thành công!");
      }

      handleCloseModal();
      loadPrices();
    } catch (error) {
      showMessage("danger", "Có lỗi xảy ra. Vui lòng thử lại!");
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Bạn có chắc muốn xóa bảng giá này?")) {
      try {
        await PriceController.deletePrice(id);
        showMessage("success", "Xóa bảng giá thành công!");
        loadPrices();
      } catch (error) {
        showMessage("danger", "Không thể xóa bảng giá!");
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
          <i className="fa fa-dollar"></i> Quản Lý Bảng Giá
        </h3>
        <div style={{ display: "flex", gap: "10px" }}>
          <select
            className="form-control"
            style={{ width: "200px" }}
            value={filterCategory}
            onChange={(e) => setFilterCategory(e.target.value)}
          >
            <option value="all">Tất cả danh mục</option>
            <option value="beard">Cắt Râu</option>
            <option value="hair-beard">Tóc & Râu</option>
            <option value="haircut">Cắt Tóc</option>
            <option value="coloring">Nhuộm</option>
            <option value="styling">Tạo Kiểu</option>
          </select>
          <button className="btn btn-primary" onClick={() => handleOpenModal()}>
            <i className="fa fa-plus"></i> Thêm Giá
          </button>
        </div>
      </div>

      {message.text && (
        <div className={`alert alert-${message.type}`}>{message.text}</div>
      )}

      <div className="data-table-wrapper">
        <table className="data-table">
          <thead>
            <tr>
              <th>Tên Gói</th>
              <th>Danh Mục</th>
              <th>Giá</th>
              <th>Mô Tả</th>
              <th>Thao Tác</th>
            </tr>
          </thead>
          <tbody>
            {prices.length === 0 ? (
              <tr>
                <td
                  colSpan="5"
                  style={{ textAlign: "center", padding: "40px" }}
                >
                  <i
                    className="fa fa-inbox"
                    style={{ fontSize: "48px", color: "#ccc" }}
                  ></i>
                  <p style={{ marginTop: "15px", color: "#999" }}>
                    Chưa có bảng giá nào
                  </p>
                </td>
              </tr>
            ) : (
              prices.map((price) => (
                <tr key={price._id}>
                  <td>{price.name}</td>
                  <td>
                    <span className="status-badge active">
                      {price.category}
                    </span>
                  </td>
                  <td style={{ fontWeight: "600", color: "#667eea" }}>
                    {typeof price.price === "string"
                      ? price.price.replace(/\B(?=(\d{3})+(?!\d))/g, ".") + "₫"
                      : price.price}
                  </td>
                  <td>{price.description || "N/A"}</td>
                  <td>
                    <div className="action-buttons">
                      <button
                        className="btn-action btn-edit"
                        onClick={() => handleOpenModal(price)}
                      >
                        <i className="fa fa-edit"></i>
                      </button>
                      <button
                        className="btn-action btn-delete"
                        onClick={() => handleDelete(price._id)}
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
              <h4>{editingPrice ? "Chỉnh Sửa Giá" : "Thêm Giá Mới"}</h4>
              <button className="modal-close" onClick={handleCloseModal}>
                ×
              </button>
            </div>

            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label>Tên Gói *</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-group">
                <label>Danh Mục *</label>
                <select
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  required
                >
                  <option value="beard">Cắt Râu</option>
                  <option value="hair-beard">Tóc & Râu</option>
                  <option value="haircut">Cắt Tóc</option>
                  <option value="coloring">Nhuộm</option>
                  <option value="styling">Tạo Kiểu</option>
                  <option value="other">Khác</option>
                </select>
              </div>

              <div className="form-group">
                <label>Giá ($) *</label>
                <input
                  type="text"
                  name="price"
                  value={formData.price}
                  onChange={handleChange}
                  placeholder="VD: 50000 hoặc 50000 - 100000"
                  required
                />
              </div>

              <div className="form-group">
                <label>Mô Tả</label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                ></textarea>
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
                  {editingPrice ? "Cập Nhật" : "Thêm Mới"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default PricesManagement;
