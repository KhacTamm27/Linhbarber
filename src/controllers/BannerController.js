/**
 * Controller: BannerController
 * Xử lý logic nghiệp vụ liên quan đến banner
 * Fetch data từ MongoDB API
 */

import api, { API_ENDPOINTS } from "../config/api";

class BannerController {
  // Lấy tất cả banner slides từ API
  async getAllSlides() {
    try {
      const response = await api.get(API_ENDPOINTS.BANNERS);
      return response.data;
    } catch (error) {
      console.error("Error fetching banners:", error);
      throw error;
    }
  }

  // Lấy slide theo ID từ API
  async getSlideById(id) {
    try {
      const response = await api.get(API_ENDPOINTS.BANNER_BY_ID(id));
      return response.data;
    } catch (error) {
      console.error("Error fetching banner by id:", error);
      throw error;
    }
  }

  // Tạo banner mới
  async createSlide(bannerData) {
    try {
      const response = await api.post(API_ENDPOINTS.BANNERS, bannerData);
      return response;
    } catch (error) {
      console.error("Error creating banner:", error);
      throw error;
    }
  }

  // Cập nhật banner
  async updateSlide(id, bannerData) {
    try {
      const response = await api.put(
        API_ENDPOINTS.BANNER_BY_ID(id),
        bannerData
      );
      return response;
    } catch (error) {
      console.error("Error updating banner:", error);
      throw error;
    }
  }

  // Xóa banner
  async deleteSlide(id) {
    try {
      const response = await api.delete(API_ENDPOINTS.BANNER_BY_ID(id));
      return response;
    } catch (error) {
      console.error("Error deleting banner:", error);
      throw error;
    }
  }

  // Helper functions (client side)
  getSlideCount(banners) {
    return banners ? banners.length : 0;
  }

  getNextSlide(banners, currentId) {
    if (!banners || banners.length === 0) return null;
    const currentIndex = banners.findIndex((slide) => slide._id === currentId);
    const nextIndex = (currentIndex + 1) % banners.length;
    return banners[nextIndex];
  }

  getPreviousSlide(banners, currentId) {
    if (!banners || banners.length === 0) return null;
    const currentIndex = banners.findIndex((slide) => slide._id === currentId);
    const prevIndex =
      currentIndex === 0 ? banners.length - 1 : currentIndex - 1;
    return banners[prevIndex];
  }
}

// Export singleton instance
export default new BannerController();
