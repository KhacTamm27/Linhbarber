const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    phone: { type: String, required: true, unique: true },
    birth_year: { type: Number },
    cut_count: { type: Number, default: 0 }, // số lần cắt tóc
    cut_history: [
      {
        date: { type: Date, default: Date.now },
        service: { type: String }, // tên dịch vụ hoặc ID
        barber: { type: String }, // tên thợ cắt
        notes: { type: String }, // ghi chú thêm
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);
