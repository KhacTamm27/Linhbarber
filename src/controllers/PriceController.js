/**
 * Controller: PriceController
 * Xử lý logic nghiệp vụ liên quan đến bảng giá
 * Fetch data từ MongoDB API
 */

import api, { API_ENDPOINTS } from "../config/api";

class PriceController {
  // Lấy tất cả giá từ API
  async getAllPrices(category = null) {
    try {
      let url = API_ENDPOINTS.PRICES;
      if (category) {
        url += `?category=${category}`;
      }
      const response = await api.get(url);
      return response.data;
    } catch (error) {
      console.error("Error fetching prices:", error);
      throw error;
    }
  }

  // Lấy giá cắt râu
  async getBeardPrices() {
    try {
      const response = await api.get(API_ENDPOINTS.PRICES_BY_CATEGORY("beard"));
      return response.data;
    } catch (error) {
      console.error("Error fetching beard prices:", error);
      throw error;
    }
  }

  // Lấy giá cắt tóc và râu
  async getHairBeardPrices() {
    try {
      const response = await api.get(
        API_ENDPOINTS.PRICES_BY_CATEGORY("hair-beard")
      );
      return response.data;
    } catch (error) {
      console.error("Error fetching hair-beard prices:", error);
      throw error;
    }
  }

  // Lấy giá theo category
  async getPricesByCategory(category) {
    try {
      const response = await api.get(
        API_ENDPOINTS.PRICES_BY_CATEGORY(category)
      );
      return response.data;
    } catch (error) {
      console.error("Error fetching prices by category:", error);
      throw error;
    }
  }

  // Lấy giá theo ID
  async getPriceById(id) {
    try {
      const response = await api.get(API_ENDPOINTS.PRICE_BY_ID(id));
      return response.data;
    } catch (error) {
      console.error("Error fetching price by id:", error);
      throw error;
    }
  }

  // Tạo giá mới
  async createPrice(priceData) {
    try {
      const response = await api.post(API_ENDPOINTS.PRICES, priceData);
      return response;
    } catch (error) {
      console.error("Error creating price:", error);
      throw error;
    }
  }

  // Cập nhật giá
  async updatePrice(id, priceData) {
    try {
      const response = await api.put(API_ENDPOINTS.PRICE_BY_ID(id), priceData);
      return response;
    } catch (error) {
      console.error("Error updating price:", error);
      throw error;
    }
  }

  // Xóa giá
  async deletePrice(id) {
    try {
      const response = await api.delete(API_ENDPOINTS.PRICE_BY_ID(id));
      return response;
    } catch (error) {
      console.error("Error deleting price:", error);
      throw error;
    }
  }

  // Tính tổng giá (helper function - client side)
  calculateTotal(selectedPrices) {
    return selectedPrices.reduce((total, price) => total + price.price, 0);
  }

  // Format giá tiền (helper function - client side)
  formatPrice(price) {
    return `$${price}`;
  }
}

// Export singleton instance
export default new PriceController();
