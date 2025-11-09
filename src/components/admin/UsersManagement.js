import { Wheel } from "react-custom-roulette";

import React, { useState, useEffect } from "react";
import UserController from "../../controllers/UserController";

const UsersManagement = () => {
  const [users, setUsers] = useState([]); // danh sách user
  const [loading, setLoading] = useState(true); // loading bảng
  const [showModal, setShowModal] = useState(false); // modal thêm/cập nhật
  const [editingUser, setEditingUser] = useState(null); // user đang edit
  const [showHistoryModal, setShowHistoryModal] = useState(false); // modal lịch sử cắt
  const [currentHistory, setCurrentHistory] = useState([]); // dữ liệu cut_history của user đang xem
  const [showCutModal, setShowCutModal] = useState(false);
  const [showWheel, setShowWheel] = useState(false); // show modal vòng quay
  const [mustSpin, setMustSpin] = useState(false); // trigger spin
  const [prizeNumber, setPrizeNumber] = useState(0); // tránh undefined
  const [selectedUser, setSelectedUser] = useState(null); // user đang quay
  const [prizeText, setPrizeText] = useState(""); // thông báo phần thưởng
  const [selectedPrize, setSelectedPrize] = useState(""); // lưu phần thưởng đang quay
  const [prizeList] = useState([
    { option: "Giảm 20%" },
    { option: "Cạo mặt miễn phí" },
    { option: "Gội đầu miễn phí" },
    { option: "Tặng 1 lượt cắt" },
    { option: "Không trúng thưởng" },
  ]);

  const [cutData, setCutData] = useState({
    service: "",
    barber: "",
    notes: "",
  });

  const [formData, setFormData] = useState({
    // dữ liệu form
    name: "",
    phone: "",
    birth_year: "",
    cutter: "",
    service: "",
  });
  const [message, setMessage] = useState({ type: "", text: "" }); // thông báo

  useEffect(() => {
    loadUsers();
  }, []);

  const loadUsers = async () => {
    setLoading(true);
    try {
      const data = await UserController.getAllUsers();
      setUsers(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleIncrement = (user) => {
    setSelectedUser(user);
    setCutData({ service: "", barber: "", notes: "" });
    setShowCutModal(true);
  };

  const handleCutSubmit = async () => {
    try {
      if (!cutData.service.trim()) {
        alert("Vui lòng nhập tên dịch vụ!");
        return;
      }
      const updated = await UserController.incrementCut(
        selectedUser._id,
        cutData
      );
      setUsers(users.map((u) => (u._id === updated._id ? updated : u)));
      setShowCutModal(false);
    } catch (err) {
      console.error("Lỗi khi cập nhật:", err);
    }
  };

  const handleCutCancel = () => {
    setShowCutModal(false);
    setCutData({ service: "", barber: "", notes: "" });
  };

  const handleDelete = async (id) => {
    if (window.confirm("Xóa user này?")) {
      await UserController.deleteUser(id);
      setUsers(users.filter((u) => u._id !== id));
    }
  };

  const handleOpenModal = (user = null) => {
    if (user) {
      setEditingUser(user);
      setFormData({
        name: user.name,
        phone: user.phone,
        birth_year: user.birth_year,
        // service: user.service,
        // cutter: user.cutter,
      });
    } else {
      setEditingUser(null);
      setFormData({
        name: "",
        phone: "",
        birth_year: "",
        service: "",
        cutter: "",
        notes: "",
      });
    }
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setEditingUser(null);
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingUser) {
        await UserController.updateUser(editingUser._id, formData);
      } else {
        await UserController.createUser(formData);
      }
      loadUsers();
      handleCloseModal();
    } catch (err) {
      console.error("Lỗi khi tạo user:", err);
      // Bắt thông báo lỗi từ backend
      const msg =
        err.response && err.response.data && err.response.data.message
          ? err.response.data.message
          : "Có lỗi xảy ra";
      // Hiển thị ra UI
      setMessage({ type: "danger", text: msg });

      // 3s tự ẩn
      setTimeout(() => setMessage({ type: "", text: "" }), 3000);
    }
  };

  const handleShowHistory = (user) => {
    setCurrentHistory(user.cut_history || []); // lấy cut_history hoặc mảng rỗng
    setShowHistoryModal(true); // mở modal
  };

  const handleSpin = (user) => {
    if (!window.confirm(`Xác nhận quay thưởng cho ${user.name}?`)) return;
    if (!prizeList || prizeList.length === 0) {
      alert("Danh sách phần thưởng chưa có!");
      return;
    }

    setSelectedUser(user);

    // Random chỉ 1 lần
    const randomIndex = Math.floor(Math.random() * prizeList.length);
    setPrizeNumber(randomIndex);

    // Lưu phần thưởng tương ứng luôn
    const prize = prizeList[randomIndex].option;
    setPrizeText(""); // reset thông báo trước khi quay

    setShowWheel(true);

    // delay nhỏ để chắc chắn state update trước khi bắt đầu spin
    setTimeout(() => {
      setMustSpin(true);
      // lưu prize vào selectedUser để dùng khi animation dừng
      setSelectedPrize(prize);
    }, 50);
  };

  const handleCloseHistory = () => {
    setShowHistoryModal(false); // đóng modal
    setCurrentHistory([]);
  };

  if (loading) return <p>Đang tải...</p>;

  return (
    <div>
      <style>
        {`
        
}
.modal-overlay {
  position: fixed;
  top:0; left:0; width:100%; height:100%;
  background: rgba(0,0,0,0.5);
  display:flex;
  justify-content:center;
  align-items:center;
  z-index: 999;
}
.modal-content {
  background: #fff;
  padding: 20px;
  border-radius: 8px;
  max-width: 500px;
  width: 90%;
  text-align:center;
}      

  /* Nút quay thưởng */
.btn-spin {
  background-color: #ffc107;
  color: #000;
  border: none;
  padding: 5px 10px;
  border-radius: 4px;
  cursor: pointer;
}
.btn-spin:hover {
  background-color: #e0a800;
}
  /* Bảng chính user */
  table {
    width: 100%;
    border-collapse: collapse;
    margin-top: 15px;
    font-family: Arial, sans-serif;
  }
  th, td {
    padding: 10px;
    border: 1px solid #ddd;
    text-align: left;
  }
  th {
    background-color: #007bff;
    color: #fff;
  }
  tr:nth-child(even) {
    background-color: #f9f9f9;
  }

  /* Buttons hành động */
  .action-buttons button {
    margin-right: 5px;
    padding: 5px 10px;
    border-radius: 4px;
    border: none;
    cursor: pointer;
    color: #fff;
    font-size: 13px;
  }
  .btn-increment {
    background-color: #28a745;
  }
  .btn-increment:hover {
    background-color: #218838;
  }
  .btn-delete {
    background-color: #dc3545;
  }
  .btn-delete:hover {
    background-color: #c82333;
  }
  .btn-info {
    background-color: #17a2b8;
  }
  .btn-info:hover {
    background-color: #138496;
  }

  /* Modal chung */
  .modal-overlay {
    position: fixed;
    top: 0; left: 0;
    width: 100%; height: 100%;
    background: rgba(0,0,0,0.5);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 999;
  }
  .modal-content {
    background: #fff;
    padding: 20px;
    border-radius: 8px;
    max-width: 700px;
    width: 90%;
    max-height: 80%;
    overflow-y: auto;
  }
  .modal-content h4 {
    margin-top: 0;
    margin-bottom: 15px;
  }
  .modal-content input {
    width: 100%;
    padding: 6px 10px;
    margin-bottom: 10px;
    border: 1px solid #ccc;
    border-radius: 4px;
  }
  .modal-content button {
    padding: 6px 12px;
    border-radius: 4px;
    border: none;
    cursor: pointer;
    margin-right: 5px;
  }
  .modal-content .btn-submit {
    background-color: #007bff;
    color: #fff;
  }
  .modal-content .btn-submit:hover {
    background-color: #0069d9;
  }
  .modal-content .btn-cancel {
    background-color: #6c757d;
    color: #fff;
  }
  .modal-content .btn-cancel:hover {
    background-color: #5a6268;
  }

  /* Bảng lịch sử cắt tóc */
  .cut-history-table {
    width: 100%;
    border-collapse: collapse;
    margin-top: 10px;
  }
  .cut-history-table th, .cut-history-table td {
    padding: 6px 8px;
    border: 1px solid #ddd;
    font-size: 14px;
  }
  .cut-history-table th {
    background-color: #17a2b8;
    color: #fff;
  }
  .cut-history-table tr:nth-child(even) {
    background-color: #f1f1f1;
  }
`}
      </style>
      <h3>Quản lý khách hàng</h3>
      {/* Nút mở modal thêm user */}
      <button onClick={() => handleOpenModal()}>Thêm user mới</button>
      {/* Modal thêm/cập nhật user */}
      {showModal && (
        <div className="modal-overlay" onClick={handleCloseModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <h4>{editingUser ? "Cập nhật user" : "Thêm user mới"}</h4>
            {/* Hiển thị thông báo lỗi/thành công */}
            {message.text && (
              <div
                style={{
                  backgroundColor:
                    message.type === "danger" ? "#f8d7da" : "#d1e7dd",
                  color: message.type === "danger" ? "#842029" : "#0f5132",
                  padding: "10px",
                  marginBottom: "10px",
                  borderRadius: "5px",
                }}
              >
                {message.text}
              </div>
            )}
            <form onSubmit={handleSubmit}>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Tên"
                required
              />
              <input
                type="text"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="SĐT"
                required
              />
              <input
                type="number"
                name="birth_year"
                value={formData.birth_year}
                onChange={handleChange}
                placeholder="Năm sinh"
              />
              {/* <input
                type="text"
                name="cutter"
                value={formData.cutter}
                onChange={handleChange}
                placeholder="Tên thợ cắt"
              /> */}
              {/* <input
                type="text"
                name="service"
                value={formData.service}
                onChange={handleChange}
                placeholder="Dịch vụ"
              /> */}
              <button type="submit">{editingUser ? "Cập nhật" : "Thêm"}</button>
              <button type="button" onClick={handleCloseModal}>
                Hủy
              </button>
            </form>
          </div>
        </div>
      )}
      {showWheel && selectedUser && prizeList.length > 0 && (
        <div className="modal-overlay" onClick={() => setShowWheel(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <h4>🎡 Quay thưởng cho {selectedUser.name}</h4>
            <Wheel
              mustStartSpinning={mustSpin}
              prizeNumber={prizeNumber}
              data={prizeList}
              onStopSpinning={async () => {
                setMustSpin(false);
                const prize =
                  prizeList[prizeNumber]?.option || "Không xác định";
                setPrizeText(`${selectedUser.name} quay trúng: ${prize}`);

                // gọi API lưu vào lịch sử sau animation
                try {
                  const updatedUser = await UserController.spinUser(
                    selectedUser._id,
                    prize
                  );
                  setUsers(
                    users.map((u) =>
                      u._id === updatedUser._id ? updatedUser : u
                    )
                  );
                } catch (err) {
                  console.error("Lỗi lưu thưởng:", err);
                  setPrizeText(
                    `${selectedUser.name} quay trúng: ${prize} (chưa lưu được)`
                  );
                }
              }}
            />
            {prizeText && (
              <div
                style={{
                  marginTop: "10px",
                  color: "#28a745",
                  fontWeight: "bold",
                }}
              >
                {prizeText}
              </div>
            )}
            <button
              onClick={() => setShowWheel(false)}
              style={{ marginTop: "10px" }}
            >
              Hủy
            </button>
          </div>
        </div>
      )}
      {showHistoryModal && (
        <div className="modal-overlay" onClick={handleCloseHistory}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <h4>Lịch sử cắt của user</h4>
            {currentHistory.length === 0 ? (
              <p>Chưa có lần cắt nào</p>
            ) : (
              <table>
                <thead>
                  <tr>
                    <th>Ngày</th>
                    <th>Dịch vụ</th>
                    <th>Thợ cắt</th>
                    <th>Ghi chú</th>
                  </tr>
                </thead>
                <tbody>
                  {currentHistory.map((item, idx) => (
                    <tr key={idx}>
                      <td>{new Date(item.date).toLocaleDateString()}</td>
                      <td>{item.service}</td>
                      <td>{item.barber}</td>
                      <td>{item.notes}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
            <button onClick={handleCloseHistory}>Đóng</button>
          </div>
        </div>
      )}
      Modal +1 lần cắt
      {showCutModal && (
        <div className="modal-overlay" onClick={handleCutCancel}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <h4>Thêm lần cắt cho {selectedUser?.name}</h4>

            <input
              type="text"
              placeholder="Tên dịch vụ"
              value={cutData.service}
              onChange={(e) =>
                setCutData({ ...cutData, service: e.target.value })
              }
            />
            <input
              type="text"
              placeholder="Tên thợ cắt"
              value={cutData.barber}
              onChange={(e) =>
                setCutData({ ...cutData, barber: e.target.value })
              }
            />
            <input
              type="text"
              placeholder="Ghi chú (nếu có)"
              value={cutData.notes}
              onChange={(e) =>
                setCutData({ ...cutData, notes: e.target.value })
              }
            />

            <div style={{ marginTop: "10px" }}>
              <button className="btn-submit" onClick={handleCutSubmit}>
                OK
              </button>
              <button className="btn-cancel" onClick={handleCutCancel}>
                Hủy
              </button>
            </div>
          </div>
        </div>
      )}
      {/* Bảng hiển thị user */}
      {loading ? (
        <p>Đang tải...</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Tên</th>
              <th>SĐT</th>
              <th>Năm sinh</th>
              <th>Số lần cắt</th>
              <th>Thao tác</th>
            </tr>
          </thead>
          <tbody>
            {users.length === 0 ? (
              <tr>
                <td colSpan="5">Chưa có user nào</td>
              </tr>
            ) : (
              users.map((u) => (
                <tr key={u._id}>
                  <td>{u.name}</td>
                  <td>{u.phone}</td>
                  <td>{u.birth_year}</td>
                  <td>{u.cut_count}</td>
                  <td className="action-buttons">
                    {u.cut_count >= 3 ? (
                      <button
                        className="btn-spin"
                        onClick={() => handleSpin(u)}
                      >
                        🎡 Quay thưởng
                      </button>
                    ) : (
                      <button
                        className="btn-increment"
                        onClick={() => handleIncrement(u)}
                      >
                        +1 lần cắt
                      </button>
                    )}
                    <button
                      className="btn-delete"
                      onClick={() => handleDelete(u._id)}
                    >
                      Xóa
                    </button>
                    <button
                      className="btn-info"
                      onClick={() => handleShowHistory(u)}
                    >
                      Thông tin
                    </button>
                    <button
                      className="btn-info"
                      onClick={() => handleOpenModal(u)}
                    >
                      Sửa
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default UsersManagement;
