/**
 * Routes: Testimonial Routes
 * API endpoints cho đánh giá khách hàng
 */

const express = require("express");
const router = express.Router();
const Testimonial = require("../models/Testimonial");

// GET: Lấy tất cả đánh giá
router.get("/", async (req, res) => {
  try {
    const { page } = req.query;
    const filter = { isActive: true };

    if (page) {
      filter.$or = [{ page: page }, { page: "both" }];
    }

    const testimonials = await Testimonial.find(filter).sort({
      order: 1,
      createdAt: -1,
    });

    res.json({
      success: true,
      count: testimonials.length,
      data: testimonials,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Lỗi khi lấy danh sách đánh giá",
      error: error.message,
    });
  }
});

// GET: Lấy đánh giá theo trang (home/services)
router.get("/page/:page", async (req, res) => {
  try {
    const testimonials = await Testimonial.find({
      $or: [{ page: req.params.page }, { page: "both" }],
      isActive: true,
    }).sort({ order: 1 });

    res.json({
      success: true,
      count: testimonials.length,
      data: testimonials,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Lỗi khi lấy đánh giá theo trang",
      error: error.message,
    });
  }
});

// GET: Lấy đánh giá theo ID
router.get("/:id", async (req, res) => {
  try {
    const testimonial = await Testimonial.findById(req.params.id);

    if (!testimonial) {
      return res.status(404).json({
        success: false,
        message: "Không tìm thấy đánh giá",
      });
    }

    res.json({
      success: true,
      data: testimonial,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Lỗi khi lấy thông tin đánh giá",
      error: error.message,
    });
  }
});

// POST: Tạo đánh giá mới
router.post("/", async (req, res) => {
  try {
    const testimonial = await Testimonial.create(req.body);

    res.status(201).json({
      success: true,
      message: "Tạo đánh giá thành công",
      data: testimonial,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "Lỗi khi tạo đánh giá",
      error: error.message,
    });
  }
});

// PUT: Cập nhật đánh giá
router.put("/:id", async (req, res) => {
  try {
    const testimonial = await Testimonial.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!testimonial) {
      return res.status(404).json({
        success: false,
        message: "Không tìm thấy đánh giá",
      });
    }

    res.json({
      success: true,
      message: "Cập nhật đánh giá thành công",
      data: testimonial,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "Lỗi khi cập nhật đánh giá",
      error: error.message,
    });
  }
});

// DELETE: Xóa đánh giá
router.delete("/:id", async (req, res) => {
  try {
    const testimonial = await Testimonial.findByIdAndDelete(req.params.id);

    if (!testimonial) {
      return res.status(404).json({
        success: false,
        message: "Không tìm thấy đánh giá",
      });
    }

    res.json({
      success: true,
      message: "Xóa đánh giá thành công",
      data: {},
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Lỗi khi xóa đánh giá",
      error: error.message,
    });
  }
});

module.exports = router;
