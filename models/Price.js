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
      type: String, // ✅ CHẮC CHẮN PHẢI LÀ STRING
      required: [true, "Vui lòng nhập giá"],
      validate: {
        validator: function (v) {
          return /^\d+(-\d+)?$/.test(v); // cho phép 50000 hoặc 50000-100000
        },
        message:
          "Khoảng giá không hợp lệ. Dùng định dạng: 50000 hoặc 50000-100000",
      },
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

priceSchema.index({ category: 1, order: 1 });

module.exports = mongoose.model("Price", priceSchema);
