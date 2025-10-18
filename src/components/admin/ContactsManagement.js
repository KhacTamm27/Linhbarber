/**
 * Component: Contacts Management
 * Quản lý tin nhắn liên hệ (Read only)
 */

import React, { useState, useEffect } from "react";
import ContactController from "../../controllers/ContactController";

const ContactsManagement = () => {
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedContact, setSelectedContact] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [message, setMessage] = useState({ type: "", text: "" });

  useEffect(() => {
    loadContacts();
  }, []);

  const loadContacts = async () => {
    try {
      setLoading(true);
      const data = await ContactController.getAllContacts();
      setContacts(data);
    } catch (error) {
      showMessage("danger", "Không thể tải tin nhắn");
    } finally {
      setLoading(false);
    }
  };

  const showMessage = (type, text) => {
    setMessage({ type, text });
    setTimeout(() => setMessage({ type: "", text: "" }), 3000);
  };

  const handleViewContact = (contact) => {
    setSelectedContact(contact);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedContact(null);
  };

  const handleDelete = async (id) => {
    if (window.confirm("Bạn có chắc muốn xóa tin nhắn này?")) {
      try {
        await ContactController.deleteContact(id);
        showMessage("success", "Xóa tin nhắn thành công!");
        loadContacts();
      } catch (error) {
        showMessage("danger", "Không thể xóa tin nhắn!");
      }
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleString("vi-VN");
  };

  const getStatusBadge = (status) => {
    const statusMap = {
      new: { class: "info", text: "Mới" },
      read: { class: "active", text: "Đã đọc" },
      replied: { class: "active", text: "Đã trả lời" },
      archived: { class: "inactive", text: "Lưu trữ" },
    };
    const statusInfo = statusMap[status] || statusMap.new;
    return (
      <span className={`status-badge ${statusInfo.class}`}>
        {statusInfo.text}
      </span>
    );
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
          <i className="fa fa-envelope"></i> Quản Lý Tin Nhắn
        </h3>
        <div>
          <span style={{ color: "#999" }}>
            Tổng: <strong>{contacts.length}</strong> tin nhắn
          </span>
        </div>
      </div>

      {message.text && (
        <div className={`alert alert-${message.type}`}>{message.text}</div>
      )}

      <div className="data-table-wrapper">
        <table className="data-table">
          <thead>
            <tr>
              <th>Người Gửi</th>
              <th>Email</th>
              <th>Số Điện Thoại</th>
              <th>Nội Dung</th>
              <th>Trạng Thái</th>
              <th>Ngày Gửi</th>
              <th>Thao Tác</th>
            </tr>
          </thead>
          <tbody>
            {contacts.length === 0 ? (
              <tr>
                <td
                  colSpan="7"
                  style={{ textAlign: "center", padding: "40px" }}
                >
                  <i
                    className="fa fa-inbox"
                    style={{ fontSize: "48px", color: "#ccc" }}
                  ></i>
                  <p style={{ marginTop: "15px", color: "#999" }}>
                    Chưa có tin nhắn nào
                  </p>
                </td>
              </tr>
            ) : (
              contacts.map((contact) => (
                <tr
                  key={contact._id}
                  style={{
                    fontWeight: contact.isRead ? "normal" : "600",
                    backgroundColor: contact.isRead ? "transparent" : "#f0f4ff",
                  }}
                >
                  <td>{contact.name}</td>
                  <td>{contact.email}</td>
                  <td>{contact.phone}</td>
                  <td style={{ maxWidth: "200px" }}>
                    {contact.message.substring(0, 50)}...
                  </td>
                  <td>{getStatusBadge(contact.status)}</td>
                  <td>{formatDate(contact.createdAt)}</td>
                  <td>
                    <div className="action-buttons">
                      <button
                        className="btn-action btn-edit"
                        onClick={() => handleViewContact(contact)}
                        title="Xem chi tiết"
                      >
                        <i className="fa fa-eye"></i>
                      </button>
                      <button
                        className="btn-action btn-delete"
                        onClick={() => handleDelete(contact._id)}
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

      {/* Modal - View Contact Details */}
      {showModal && selectedContact && (
        <div className="modal-overlay" onClick={handleCloseModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h4>
                <i className="fa fa-envelope"></i> Chi Tiết Tin Nhắn
              </h4>
              <button className="modal-close" onClick={handleCloseModal}>
                ×
              </button>
            </div>

            <div style={{ padding: "10px 0" }}>
              <div style={{ marginBottom: "20px" }}>
                <label
                  style={{
                    fontWeight: "600",
                    display: "block",
                    marginBottom: "5px",
                  }}
                >
                  Người Gửi:
                </label>
                <p style={{ margin: "0", fontSize: "16px" }}>
                  {selectedContact.name}
                </p>
              </div>

              <div style={{ marginBottom: "20px" }}>
                <label
                  style={{
                    fontWeight: "600",
                    display: "block",
                    marginBottom: "5px",
                  }}
                >
                  Email:
                </label>
                <p style={{ margin: "0" }}>
                  <a href={`mailto:${selectedContact.email}`}>
                    {selectedContact.email}
                  </a>
                </p>
              </div>

              <div style={{ marginBottom: "20px" }}>
                <label
                  style={{
                    fontWeight: "600",
                    display: "block",
                    marginBottom: "5px",
                  }}
                >
                  Số Điện Thoại:
                </label>
                <p style={{ margin: "0" }}>
                  <a href={`tel:${selectedContact.phone}`}>
                    {selectedContact.phone}
                  </a>
                </p>
              </div>

              <div style={{ marginBottom: "20px" }}>
                <label
                  style={{
                    fontWeight: "600",
                    display: "block",
                    marginBottom: "5px",
                  }}
                >
                  Nội Dung:
                </label>
                <div
                  style={{
                    padding: "15px",
                    backgroundColor: "#f8f9fa",
                    borderRadius: "5px",
                    border: "1px solid #e9ecef",
                  }}
                >
                  {selectedContact.message}
                </div>
              </div>

              <div style={{ marginBottom: "20px" }}>
                <label
                  style={{
                    fontWeight: "600",
                    display: "block",
                    marginBottom: "5px",
                  }}
                >
                  Trạng Thái:
                </label>
                {getStatusBadge(selectedContact.status)}
              </div>

              <div>
                <label
                  style={{
                    fontWeight: "600",
                    display: "block",
                    marginBottom: "5px",
                  }}
                >
                  Ngày Gửi:
                </label>
                <p style={{ margin: "0", color: "#999" }}>
                  {formatDate(selectedContact.createdAt)}
                </p>
              </div>
            </div>

            <div className="form-actions">
              <button
                type="button"
                className="btn btn-secondary"
                onClick={handleCloseModal}
              >
                Đóng
              </button>
              <button
                type="button"
                className="btn btn-primary"
                onClick={() => {
                  window.location.href = `mailto:${selectedContact.email}?subject=Re: Contact from Hair Salon&body=Hi ${selectedContact.name},%0D%0A%0D%0A`;
                }}
              >
                <i className="fa fa-reply"></i> Trả Lời Email
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ContactsManagement;
