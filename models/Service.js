/**
 * MongoDB Model: Service
 * Schema cho dịch vụ salon
 */

const mongoose = require("mongoose");

const serviceSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Vui lòng nhập tên dịch vụ"],
      trim: true,
    },
    description: {
      type: String,
      required: [true, "Vui lòng nhập mô tả dịch vụ"],
    },
    image: {
      type: String,
      required: [true, "Vui lòng thêm hình ảnh dịch vụ"],
    },
    price: {
      type: Number,
      default: null,
    },
    category: {
      type: String,
      enum: ["haircut", "beard", "coloring", "styling", "other"],
      default: "other",
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

// Index để tìm kiếm nhanh hơn
serviceSchema.index({ name: "text", description: "text" });

module.exports = mongoose.model("Service", serviceSchema);
