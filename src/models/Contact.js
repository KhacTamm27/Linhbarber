/**
 * Model: Contact
 * Định nghĩa cấu trúc dữ liệu cho thông tin liên hệ
 */

export class ContactInfo {
  constructor(phone, email, address, mapUrl) {
    this.phone = phone;
    this.email = email;
    this.address = address;
    this.mapUrl = mapUrl;
  }
}

export class ContactMessage {
  constructor(name, email, phone, message) {
    this.name = name;
    this.email = email;
    this.phone = phone;
    this.message = message;
    this.createdAt = new Date();
  }

  // Validation
  validate() {
    const errors = {};
    
    if (!this.name || this.name.trim() === "") {
      errors.name = "Vui lòng nhập họ và tên";
    }
    
    if (!this.email || !this.isValidEmail(this.email)) {
      errors.email = "Vui lòng nhập email hợp lệ";
    }
    
    if (!this.phone || !this.isValidPhone(this.phone)) {
      errors.phone = "Vui lòng nhập số điện thoại hợp lệ";
    }
    
    if (!this.message || this.message.trim() === "") {
      errors.message = "Vui lòng nhập nội dung";
    }
    
    return {
      isValid: Object.keys(errors).length === 0,
      errors
    };
  }

  isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  isValidPhone(phone) {
    const phoneRegex = /^[\d\s+()-]+$/;
    return phoneRegex.test(phone) && phone.replace(/\D/g, "").length >= 10;
  }
}

// Thông tin liên hệ mặc định
export const salonContactInfo = new ContactInfo(
  "+84 395 284 436",
  "linhbarberhousee@gmail.com",
  "Linh Barber House, Tây Hòa, Phú Yên",
  "https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d3887.038551915037!2d109.2997014!3d13.033217!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x316fef002824d5a3%3A0xead8ae1cac5c93c2!2sLinh%20Barber%20Housee!5e0!3m2!1svi!2s!4v1760759509755!5m2!1svi!2s"
);

