/**
 * Routes: Contact Routes
 * API endpoints cho liên hệ và newsletter
 */

const express = require("express");
const router = express.Router();
const Contact = require("../models/Contact");
const Newsletter = require("../models/Newsletter");

// ============ CONTACT ROUTES ============

// GET: Lấy tất cả tin nhắn liên hệ
router.get("/", async (req, res) => {
  try {
    const { status } = req.query;
    const filter = {};

    if (status) {
      filter.status = status;
    }

    const contacts = await Contact.find(filter).sort({ createdAt: -1 });

    res.json({
      success: true,
      count: contacts.length,
      data: contacts,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Lỗi khi lấy danh sách tin nhắn",
      error: error.message,
    });
  }
});

// GET: Lấy tin nhắn theo ID
router.get("/:id", async (req, res) => {
  try {
    const contact = await Contact.findById(req.params.id);

    if (!contact) {
      return res.status(404).json({
        success: false,
        message: "Không tìm thấy tin nhắn",
      });
    }

    // Đánh dấu là đã đọc
    if (!contact.isRead) {
      contact.isRead = true;
      contact.status = "read";
      await contact.save();
    }

    res.json({
      success: true,
      data: contact,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Lỗi khi lấy thông tin tin nhắn",
      error: error.message,
    });
  }
});

// POST: Gửi tin nhắn liên hệ
router.post("/", async (req, res) => {
  try {
    const { name, email, phone, message } = req.body;

    // Validation
    if (!name || !email || !phone || !message) {
      return res.status(400).json({
        success: false,
        message: "Vui lòng điền đầy đủ thông tin",
      });
    }

    const contact = await Contact.create({
      name,
      email,
      phone,
      message,
    });

    res.status(201).json({
      success: true,
      message:
        "Gửi tin nhắn thành công! Chúng tôi sẽ phản hồi sớm nhất có thể.",
      data: contact,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "Lỗi khi gửi tin nhắn",
      error: error.message,
    });
  }
});

// PUT: Cập nhật trạng thái tin nhắn
router.put("/:id", async (req, res) => {
  try {
    const contact = await Contact.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!contact) {
      return res.status(404).json({
        success: false,
        message: "Không tìm thấy tin nhắn",
      });
    }

    res.json({
      success: true,
      message: "Cập nhật tin nhắn thành công",
      data: contact,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "Lỗi khi cập nhật tin nhắn",
      error: error.message,
    });
  }
});

// DELETE: Xóa tin nhắn
router.delete("/:id", async (req, res) => {
  try {
    const contact = await Contact.findByIdAndDelete(req.params.id);

    if (!contact) {
      return res.status(404).json({
        success: false,
        message: "Không tìm thấy tin nhắn",
      });
    }

    res.json({
      success: true,
      message: "Xóa tin nhắn thành công",
      data: {},
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Lỗi khi xóa tin nhắn",
      error: error.message,
    });
  }
});

// ============ NEWSLETTER ROUTES ============

// POST: Đăng ký newsletter
router.post("/newsletter", async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({
        success: false,
        message: "Vui lòng nhập email",
      });
    }

    // Kiểm tra email đã tồn tại chưa
    const existingSubscription = await Newsletter.findOne({ email });

    if (existingSubscription) {
      if (existingSubscription.isActive) {
        return res.status(400).json({
          success: false,
          message: "Email này đã được đăng ký",
        });
      } else {
        // Kích hoạt lại subscription
        existingSubscription.isActive = true;
        existingSubscription.subscribedAt = new Date();
        existingSubscription.unsubscribedAt = null;
        await existingSubscription.save();

        return res.json({
          success: true,
          message: "Đăng ký nhận bản tin thành công!",
          data: existingSubscription,
        });
      }
    }

    const newsletter = await Newsletter.create({ email });

    res.status(201).json({
      success: true,
      message: "Đăng ký nhận bản tin thành công!",
      data: newsletter,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "Lỗi khi đăng ký newsletter",
      error: error.message,
    });
  }
});

// GET: Lấy danh sách newsletter
router.get("/newsletter/all", async (req, res) => {
  try {
    const newsletters = await Newsletter.find({ isActive: true }).sort({
      subscribedAt: -1,
    });

    res.json({
      success: true,
      count: newsletters.length,
      data: newsletters,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Lỗi khi lấy danh sách newsletter",
      error: error.message,
    });
  }
});

module.exports = router;
