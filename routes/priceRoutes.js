/**
 * Routes: Price Routes
 * API endpoints cho bảng giá
 */

const express = require("express");
const router = express.Router();
const Price = require("../models/Price");

// GET: Lấy tất cả bảng giá
router.get("/", async (req, res) => {
  try {
    const { category } = req.query;
    const filter = { isActive: true };

    if (category) {
      filter.category = category;
    }

    const prices = await Price.find(filter).sort({
      category: 1,
      order: 1,
      createdAt: 1,
    });

    res.json({
      success: true,
      count: prices.length,
      data: prices,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Lỗi khi lấy bảng giá",
      error: error.message,
    });
  }
});

// GET: Lấy giá theo category
router.get("/category/:category", async (req, res) => {
  try {
    const prices = await Price.find({
      category: req.params.category,
      isActive: true,
    }).sort({ order: 1 });

    res.json({
      success: true,
      count: prices.length,
      data: prices,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Lỗi khi lấy bảng giá theo danh mục",
      error: error.message,
    });
  }
});

// GET: Lấy giá theo ID
router.get("/:id", async (req, res) => {
  try {
    const price = await Price.findById(req.params.id);

    if (!price) {
      return res.status(404).json({
        success: false,
        message: "Không tìm thấy bảng giá",
      });
    }

    res.json({
      success: true,
      data: price,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Lỗi khi lấy thông tin giá",
      error: error.message,
    });
  }
});

// POST: Tạo giá mới
router.post("/", async (req, res) => {
  try {
    const price = await Price.create(req.body);

    res.status(201).json({
      success: true,
      message: "Tạo bảng giá thành công",
      data: price,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "Lỗi khi tạo bảng giá",
      error: error.message,
    });
  }
});

// PUT: Cập nhật giá
router.put("/:id", async (req, res) => {
  try {
    const price = await Price.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!price) {
      return res.status(404).json({
        success: false,
        message: "Không tìm thấy bảng giá",
      });
    }

    res.json({
      success: true,
      message: "Cập nhật bảng giá thành công",
      data: price,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "Lỗi khi cập nhật bảng giá",
      error: error.message,
    });
  }
});

// DELETE: Xóa giá
router.delete("/:id", async (req, res) => {
  try {
    const price = await Price.findByIdAndDelete(req.params.id);

    if (!price) {
      return res.status(404).json({
        success: false,
        message: "Không tìm thấy bảng giá",
      });
    }

    res.json({
      success: true,
      message: "Xóa bảng giá thành công",
      data: {},
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Lỗi khi xóa bảng giá",
      error: error.message,
    });
  }
});

module.exports = router;
