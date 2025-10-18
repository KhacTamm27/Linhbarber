/**
 * Controller: ContactController
 * Xử lý logic nghiệp vụ liên quan đến liên hệ
 * Fetch data từ MongoDB API
 */

import api, { API_ENDPOINTS } from "../config/api";

class ContactController {
  // Thông tin liên hệ cố định
  contactInfo = {
    phone: "+84 395 284 436",
    email: "linhbarberhousee@gmail.com",
    address: "Linh Barber House, Tây Hòa, Phú Yên",
    mapUrl:
      "https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d3887.038551915037!2d109.2997014!3d13.033217!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x316fef002824d5a3%3A0xead8ae1cac5c93c2!2sLinh%20Barber%20Housee!5e0!3m2!1svi!2s!4v1760759509755!5m2!1svi!2s",
  };

  // Lấy thông tin liên hệ
  getContactInfo() {
    return this.contactInfo;
  }

  // Gửi form liên hệ đến API
  async submitContactForm(formData) {
    try {
      const response = await api.post(API_ENDPOINTS.CONTACTS, formData);
      return response;
    } catch (error) {
      console.error("Error submitting contact form:", error);

      // Trả về error response
      if (error.response && error.response.data) {
        return error.response.data;
      }

      return {
        success: false,
        message: "Có lỗi xảy ra khi gửi tin nhắn. Vui lòng thử lại sau.",
      };
    }
  }

  // Đăng ký newsletter
  async subscribeNewsletter(email) {
    try {
      const response = await api.post(API_ENDPOINTS.NEWSLETTER, { email });
      return response;
    } catch (error) {
      console.error("Error subscribing newsletter:", error);

      if (error.response && error.response.data) {
        return error.response.data;
      }

      return {
        success: false,
        message: "Có lỗi xảy ra khi đăng ký. Vui lòng thử lại sau.",
      };
    }
  }

  // Lấy tất cả tin nhắn (admin)
  async getAllContacts(status = null) {
    try {
      let url = API_ENDPOINTS.CONTACTS;
      if (status) {
        url += `?status=${status}`;
      }
      const response = await api.get(url);
      return response.data;
    } catch (error) {
      console.error("Error fetching contacts:", error);
      throw error;
    }
  }

  // Lấy tin nhắn theo ID (admin)
  async getContactById(id) {
    try {
      const response = await api.get(API_ENDPOINTS.CONTACT_BY_ID(id));
      return response.data;
    } catch (error) {
      console.error("Error fetching contact by id:", error);
      throw error;
    }
  }

  // Cập nhật tin nhắn (admin)
  async updateContact(id, contactData) {
    try {
      const response = await api.put(
        API_ENDPOINTS.CONTACT_BY_ID(id),
        contactData
      );
      return response;
    } catch (error) {
      console.error("Error updating contact:", error);
      throw error;
    }
  }

  // Xóa tin nhắn (admin)
  async deleteContact(id) {
    try {
      const response = await api.delete(API_ENDPOINTS.CONTACT_BY_ID(id));
      return response;
    } catch (error) {
      console.error("Error deleting contact:", error);
      throw error;
    }
  }

  // Format số điện thoại
  formatPhone(phone) {
    return phone.replace(/\s/g, "");
  }

  // Tạo link gọi điện
  getPhoneLink() {
    const phone = this.formatPhone(this.contactInfo.phone);
    return `tel:${phone}`;
  }

  // Tạo link email
  getEmailLink() {
    return `mailto:${this.contactInfo.email}`;
  }
}

// Export singleton instance
export default new ContactController();
