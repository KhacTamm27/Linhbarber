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
    let { price, name, category, description, order } = req.body;

    if (!price || typeof price !== "string") {
      return res.status(400).json({
        success: false,
        message: "Giá không hợp lệ. Vui lòng nhập đúng định dạng chuỗi!",
      });
    }

    // Chuẩn hoá chuỗi nhập
    price = price.replace(/\s+/g, " ").trim(); // bỏ khoảng trắng thừa

    // Nếu nhập khoảng giá, ví dụ "50000 - 100000"
    if (price.includes("-")) {
      const [minRaw, maxRaw] = price.split("-").map((p) => p.trim());
      const minVal = parseInt(minRaw);
      const maxVal = parseInt(maxRaw);

      // Nếu người dùng nhập ngược 100000 - 50000 => tự động hoán đổi
      const min = Math.min(minVal, maxVal);
      const max = Math.max(minVal, maxVal);

      if (isNaN(min) || isNaN(max)) {
        return res.status(400).json({
          success: false,
          message: "Khoảng giá không hợp lệ. Dùng định dạng: 50000 - 100000",
        });
      }

      price = `${min} - ${max}`; // chuẩn hoá lại chuỗi giá
    } else {
      // Nếu nhập 1 giá
      const value = parseInt(price);
      if (isNaN(value)) {
        return res.status(400).json({
          success: false,
          message: "Giá không hợp lệ. Vui lòng nhập số hoặc khoảng giá hợp lệ.",
        });
      }
      price = value.toString();
    }

    const priceData = { name, category, price, description, order };

    const newPrice = await Price.create(priceData);

    res.status(201).json({
      success: true,
      message: "Tạo bảng giá thành công",
      data: newPrice,
    });
  } catch (error) {
    console.error("Error creating price:", error);
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
