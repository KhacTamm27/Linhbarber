const express = require("express");
const router = express.Router();
const User = require("../models/User");

// GET: Lấy tất cả user
router.get("/", async (req, res) => {
  try {
    const users = await User.find({}).sort({ name: 1 });
    res.json({ success: true, count: users.length, data: users });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// POST: Tạo user mới hoặc trả về user cũ nếu trùng
router.post("/", async (req, res) => {
  const { name, phone, birth_year } = req.body;

  try {
    let user = await User.findOne({ phone }); // check trùng theo SĐT
    if (user) {
      return res.status(400).json({
        success: false,
        message: "Số điện thoại này đã tồn tại trong hệ thống!",
      });
      return res.status(400).json({
        success: false,
        message: `Số điện thoại ${phone} đã tồn tại với tên: ${user.name}`,
      });
    }

    user = await User.create({ name, phone, birth_year });
    res
      .status(201)
      .json({ success: true, message: "Tạo user thành công", data: user });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
});

// PUT: Tăng số lần cắt và ghi log lịch sử cắt
router.put("/cut/:id", async (req, res) => {
  const { service, barber, notes } = req.body;

  try {
    const user = await User.findByIdAndUpdate(
      req.params.id,
      {
        $inc: { cut_count: 1 },
        $push: { cut_history: { service, barber, notes } },
      },
      { new: true }
    );
    res.json({ success: true, data: user });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// DELETE: Xóa user
router.delete("/:id", async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.json({ success: true, message: "Xóa user thành công" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// PUT: Quay thưởng khi đủ 3 lần cắt
router.put("/spin/:id", async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user)
      return res
        .status(404)
        .json({ success: false, message: "Không tìm thấy user" });

    const prize = req.body.prize;

    const prizes = [
      "Giảm 20%",
      "Cạo mặt miễn phí",
      "Gội đầu miễn phí",
      "Tặng 1 lượt cắt",
      "Không trúng thưởng",
    ];

    user.cut_count = 0;
    user.cut_history.push({
      date: new Date(),
      service: "Vòng quay may mắn",
      barber: "Hệ thống",
      notes: `Phần thưởng: ${prize}`,
    });

    await user.save();

    res.json({
      success: true,
      prize,
      data: user,
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});
module.exports = router;
