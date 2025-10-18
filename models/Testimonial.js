/**
 * MongoDB Model: Testimonial
 * Schema cho đánh giá khách hàng
 */

const mongoose = require("mongoose");

const testimonialSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Vui lòng nhập tên khách hàng"],
      trim: true,
    },
    comment: {
      type: String,
      required: [true, "Vui lòng nhập nội dung đánh giá"],
    },
    image: {
      type: String,
      required: [true, "Vui lòng thêm ảnh khách hàng"],
    },
    rating: {
      type: Number,
      min: 1,
      max: 5,
      default: 5,
    },
    social: {
      facebook: {
        type: String,
        default: "#",
      },
      twitter: {
        type: String,
        default: "#",
      },
    },
    page: {
      type: String,
      enum: ["home", "services", "both"],
      default: "both",
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
testimonialSchema.index({ page: 1, isActive: 1, order: 1 });

module.exports = mongoose.model("Testimonial", testimonialSchema);
