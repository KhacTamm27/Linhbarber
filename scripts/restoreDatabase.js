/**
 * Script để restore dữ liệu từ backup file
 * Chạy: node scripts/restoreDatabase.js <backup-file-path>
 * Ví dụ: node scripts/restoreDatabase.js backups/database-backup-2024-01-15T10-30-00-000Z.json
 */

const mongoose = require("mongoose");
const dotenv = require("dotenv");
const fs = require("fs");
const path = require("path");

// Import models
const Service = require("../models/Service");
const Price = require("../models/Price");
const Testimonial = require("../models/Testimonial");
const Banner = require("../models/Banner");
const Contact = require("../models/Contact");

// Load env variables
dotenv.config();

// Kết nối MongoDB
const MONGODB_URI =
  process.env.MONGODB_URI || "mongodb://localhost:27017/hair-salon";

mongoose
  .connect(MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("✅ Kết nối MongoDB thành công!");
    restoreDatabase();
  })
  .catch((err) => {
    console.error("❌ Lỗi kết nối MongoDB:", err.message);
    process.exit(1);
  });

async function restoreDatabase() {
  try {
    // Lấy đường dẫn file backup từ command line argument
    const backupFilePath = process.argv[2];

    if (!backupFilePath) {
      console.error("❌ Vui lòng cung cấp đường dẫn file backup!");
      console.log(
        "Cách sử dụng: node scripts/restoreDatabase.js <backup-file-path>"
      );
      console.log(
        "Ví dụ: node scripts/restoreDatabase.js backups/database-backup-2024-01-15T10-30-00-000Z.json"
      );
      process.exit(1);
    }

    // Kiểm tra file backup có tồn tại không
    if (!fs.existsSync(backupFilePath)) {
      console.error(`❌ File backup không tồn tại: ${backupFilePath}`);
      process.exit(1);
    }

    console.log(`📦 Đang restore dữ liệu từ: ${backupFilePath}`);

    // Đọc file backup
    const backupData = JSON.parse(fs.readFileSync(backupFilePath, "utf8"));

    console.log(`📅 Backup được tạo lúc: ${backupData.timestamp}`);
    console.log(`🗄️  Database: ${backupData.database}`);

    // Xác nhận trước khi restore
    console.log(
      "\n⚠️  CẢNH BÁO: Thao tác này sẽ XÓA TẤT CẢ dữ liệu hiện tại và thay thế bằng dữ liệu từ backup!"
    );
    console.log("📊 Dữ liệu sẽ được restore:");
    console.log(`   - ${backupData.summary.totalServices} services`);
    console.log(`   - ${backupData.summary.totalPrices} prices`);
    console.log(`   - ${backupData.summary.totalTestimonials} testimonials`);
    console.log(`   - ${backupData.summary.totalBanners} banners`);
    console.log(`   - ${backupData.summary.totalContacts} contacts`);

    // Xóa dữ liệu cũ
    console.log("\n🗑️  Đang xóa dữ liệu cũ...");
    await Service.deleteMany({});
    await Price.deleteMany({});
    await Testimonial.deleteMany({});
    await Banner.deleteMany({});
    await Contact.deleteMany({});
    console.log("✅ Đã xóa dữ liệu cũ");

    // Restore Services
    if (
      backupData.collections.services &&
      backupData.collections.services.length > 0
    ) {
      console.log("📝 Đang restore Services...");
      await Service.insertMany(backupData.collections.services);
      console.log(
        `✅ Đã restore ${backupData.collections.services.length} services`
      );
    }

    // Restore Prices
    if (
      backupData.collections.prices &&
      backupData.collections.prices.length > 0
    ) {
      console.log("📝 Đang restore Prices...");
      await Price.insertMany(backupData.collections.prices);
      console.log(
        `✅ Đã restore ${backupData.collections.prices.length} prices`
      );
    }

    // Restore Testimonials
    if (
      backupData.collections.testimonials &&
      backupData.collections.testimonials.length > 0
    ) {
      console.log("📝 Đang restore Testimonials...");
      await Testimonial.insertMany(backupData.collections.testimonials);
      console.log(
        `✅ Đã restore ${backupData.collections.testimonials.length} testimonials`
      );
    }

    // Restore Banners
    if (
      backupData.collections.banners &&
      backupData.collections.banners.length > 0
    ) {
      console.log("📝 Đang restore Banners...");
      await Banner.insertMany(backupData.collections.banners);
      console.log(
        `✅ Đã restore ${backupData.collections.banners.length} banners`
      );
    }

    // Restore Contacts
    if (
      backupData.collections.contacts &&
      backupData.collections.contacts.length > 0
    ) {
      console.log("📝 Đang restore Contacts...");
      await Contact.insertMany(backupData.collections.contacts);
      console.log(
        `✅ Đã restore ${backupData.collections.contacts.length} contacts`
      );
    }

    console.log("\n🎉 RESTORE HOÀN THÀNH!");
    console.log("📊 Dữ liệu đã được restore thành công:");
    console.log(`   - ${backupData.summary.totalServices} services`);
    console.log(`   - ${backupData.summary.totalPrices} prices`);
    console.log(`   - ${backupData.summary.totalTestimonials} testimonials`);
    console.log(`   - ${backupData.summary.totalBanners} banners`);
    console.log(`   - ${backupData.summary.totalContacts} contacts`);
    console.log(`   - Tổng cộng: ${backupData.summary.totalRecords} records`);

    process.exit(0);
  } catch (error) {
    console.error("❌ Lỗi khi restore database:", error);
    process.exit(1);
  }
}
