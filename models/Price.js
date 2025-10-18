/**
 * MongoDB Model: Price
 * Schema cho bảng giá dịch vụ
 */

const mongoose = require("mongoose");

const priceSchema = new mongoose.Schema(
  {
    category: {
      type: String,
      required: [true, "Vui lòng chọn danh mục"],
      enum: ["beard", "hair-beard", "haircut", "coloring", "styling", "other"],
    },
    name: {
      type: String,
      required: [true, "Vui lòng nhập tên gói dịch vụ"],
      trim: true,
    },
    price: {
      type: Number,
      required: [true, "Vui lòng nhập giá"],
      min: [0, "Giá phải lớn hơn 0"],
    },
    description: {
      type: String,
      default: "",
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    order: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

// Index
priceSchema.index({ category: 1, order: 1 });

module.exports = mongoose.model("Price", priceSchema);
