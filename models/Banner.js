/**
 * MongoDB Model: Banner
 * Schema cho banner slides
 */

const mongoose = require("mongoose");

const bannerSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Vui lòng nhập tiêu đề"],
      trim: true,
    },
    description: {
      type: String,
      required: [true, "Vui lòng nhập mô tả"],
    },
    backgroundClass: {
      type: String,
      required: [true, "Vui lòng chọn background"],
      default: "bg1",
    },
    backgroundImage: {
      type: String,
      default: "",
    },
    ctaText: {
      type: String,
      default: "Liên hệ ngay",
    },
    ctaLink: {
      type: String,
      default: "tel:+84395284436",
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
bannerSchema.index({ isActive: 1, order: 1 });

module.exports = mongoose.model("Banner", bannerSchema);
