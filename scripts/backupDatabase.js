/**
 * Script để backup dữ liệu hiện tại từ MongoDB
 * Chạy: node scripts/backupDatabase.js
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
    backupDatabase();
  })
  .catch((err) => {
    console.error("❌ Lỗi kết nối MongoDB:", err.message);
    process.exit(1);
  });

async function backupDatabase() {
  try {
    console.log("📦 Đang backup dữ liệu từ database...");

    // Tạo thư mục backup nếu chưa có
    const backupDir = path.join(__dirname, "../backups");
    if (!fs.existsSync(backupDir)) {
      fs.mkdirSync(backupDir, { recursive: true });
    }

    // Tạo timestamp cho tên file backup
    const timestamp = new Date().toISOString().replace(/[:.]/g, "-");
    const backupFileName = `database-backup-${timestamp}.json`;
    const backupFilePath = path.join(backupDir, backupFileName);

    // Lấy tất cả dữ liệu từ các collection
    console.log("📊 Đang lấy dữ liệu Services...");
    const services = await Service.find({});
    console.log(`   ✅ Đã lấy ${services.length} services`);

    console.log("📊 Đang lấy dữ liệu Prices...");
    const prices = await Price.find({});
    console.log(`   ✅ Đã lấy ${prices.length} prices`);

    console.log("📊 Đang lấy dữ liệu Testimonials...");
    const testimonials = await Testimonial.find({});
    console.log(`   ✅ Đã lấy ${testimonials.length} testimonials`);

    console.log("📊 Đang lấy dữ liệu Banners...");
    const banners = await Banner.find({});
    console.log(`   ✅ Đã lấy ${banners.length} banners`);

    console.log("📊 Đang lấy dữ liệu Contacts...");
    const contacts = await Contact.find({});
    console.log(`   ✅ Đã lấy ${contacts.length} contacts`);

    // Tạo object backup
    const backupData = {
      timestamp: new Date().toISOString(),
      database: "hair-salon",
      collections: {
        services: services,
        prices: prices,
        testimonials: testimonials,
        banners: banners,
        contacts: contacts,
      },
      summary: {
        totalServices: services.length,
        totalPrices: prices.length,
        totalTestimonials: testimonials.length,
        totalBanners: banners.length,
        totalContacts: contacts.length,
        totalRecords:
          services.length +
          prices.length +
          testimonials.length +
          banners.length +
          contacts.length,
      },
    };

    // Lưu backup vào file JSON
    fs.writeFileSync(
      backupFilePath,
      JSON.stringify(backupData, null, 2),
      "utf8"
    );

    console.log("\n🎉 BACKUP HOÀN THÀNH!");
    console.log(`📁 File backup: ${backupFilePath}`);
    console.log("\n📊 Tổng kết dữ liệu đã backup:");
    console.log(`   - ${services.length} services`);
    console.log(`   - ${prices.length} prices`);
    console.log(`   - ${testimonials.length} testimonials`);
    console.log(`   - ${banners.length} banners`);
    console.log(`   - ${contacts.length} contacts`);
    console.log(`   - Tổng cộng: ${backupData.summary.totalRecords} records`);

    // Tạo file backup summary
    const summaryFilePath = path.join(
      backupDir,
      `backup-summary-${timestamp}.txt`
    );
    const summaryContent = `
DATABASE BACKUP SUMMARY
=======================
Backup Date: ${new Date().toISOString()}
Database: hair-salon
Backup File: ${backupFileName}

COLLECTIONS BACKED UP:
- Services: ${services.length} records
- Prices: ${prices.length} records  
- Testimonials: ${testimonials.length} records
- Banners: ${banners.length} records
- Contacts: ${contacts.length} records

TOTAL RECORDS: ${backupData.summary.totalRecords}

To restore this backup, use the restoreDatabase.js script.
    `.trim();

    fs.writeFileSync(summaryFilePath, summaryContent, "utf8");
    console.log(`📄 Summary file: ${summaryFilePath}`);

    process.exit(0);
  } catch (error) {
    console.error("❌ Lỗi khi backup database:", error);
    process.exit(1);
  }
}
