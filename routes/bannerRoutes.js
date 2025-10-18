/**
 * Routes: Banner Routes
 * API endpoints cho banner slides
 */

const express = require("express");
const router = express.Router();
const Banner = require("../models/Banner");

// GET: Lấy tất cả banner slides
router.get("/", async (req, res) => {
  try {
    const banners = await Banner.find({ isActive: true }).sort({
      order: 1,
      createdAt: 1,
    });

    res.json({
      success: true,
      count: banners.length,
      data: banners,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Lỗi khi lấy danh sách banner",
      error: error.message,
    });
  }
});

// GET: Lấy banner theo ID
router.get("/:id", async (req, res) => {
  try {
    const banner = await Banner.findById(req.params.id);

    if (!banner) {
      return res.status(404).json({
        success: false,
        message: "Không tìm thấy banner",
      });
    }

    res.json({
      success: true,
      data: banner,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Lỗi khi lấy thông tin banner",
      error: error.message,
    });
  }
});

// POST: Tạo banner mới
router.post("/", async (req, res) => {
  try {
    const banner = await Banner.create(req.body);

    res.status(201).json({
      success: true,
      message: "Tạo banner thành công",
      data: banner,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "Lỗi khi tạo banner",
      error: error.message,
    });
  }
});

// PUT: Cập nhật banner
router.put("/:id", async (req, res) => {
  try {
    const banner = await Banner.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!banner) {
      return res.status(404).json({
        success: false,
        message: "Không tìm thấy banner",
      });
    }

    res.json({
      success: true,
      message: "Cập nhật banner thành công",
      data: banner,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "Lỗi khi cập nhật banner",
      error: error.message,
    });
  }
});

// DELETE: Xóa banner
router.delete("/:id", async (req, res) => {
  try {
    const banner = await Banner.findByIdAndDelete(req.params.id);

    if (!banner) {
      return res.status(404).json({
        success: false,
        message: "Không tìm thấy banner",
      });
    }

    res.json({
      success: true,
      message: "Xóa banner thành công",
      data: {},
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Lỗi khi xóa banner",
      error: error.message,
    });
  }
});

module.exports = router;
