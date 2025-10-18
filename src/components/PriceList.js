import React, { useState, useEffect } from "react";
import api, { API_ENDPOINTS } from "../config/api";

const PriceList = () => {
  const [prices, setPrices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchPrices();
  }, []);

  const fetchPrices = async () => {
    try {
      setLoading(true);
      const response = await api.get(API_ENDPOINTS.PRICES);

      if (response.success) {
        setPrices(response.data);
      } else {
        setError("Không thể tải dữ liệu bảng giá");
      }
    } catch (err) {
      console.error("Error fetching prices:", err);
      setError("Lỗi khi tải dữ liệu bảng giá");
    } finally {
      setLoading(false);
    }
  };

  // Sắp xếp giá theo thứ tự và chia thành 2 phần
  const sortedPrices = prices.sort((a, b) => a.order - b.order);
  const midPoint = Math.ceil(sortedPrices.length / 2);
  const firstHalf = sortedPrices.slice(0, midPoint);
  const secondHalf = sortedPrices.slice(midPoint);

  if (loading) {
    return (
      <div className="text-center py-5">
        <div className="spinner-border text-primary" role="status">
          <span className="sr-only">Loading...</span>
        </div>
        <p className="mt-2">Đang tải dữ liệu...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="alert alert-danger text-center" role="alert">
        <h4 className="alert-heading">Lỗi!</h4>
        <p>{error}</p>
        <button className="btn btn-outline-danger" onClick={fetchPrices}>
          Thử lại
        </button>
      </div>
    );
  }

  return (
    <section className="pricing py-5">
      <div className="container py-md-5">
        <h3 className="heading text-capitalize text-center mb-3 mb-sm-5">
          Bảng giá của chúng tôi
        </h3>
        <div className="row pricing-grids">
          {/* Bảng giá đầu tiên */}
          <div className="col-lg-6 mb-lg-0 mb-5">
            <div className="padding">
              <h3>BẢNG GIÁ SHOP</h3>
              {firstHalf.length > 0 ? (
                firstHalf.map((price) => (
                  <div key={price._id} className="menu-item">
                    <div className="row border-dot no-gutters">
                      <div className="col-8 menu-item-name">
                        <h6>{price.name}</h6>
                      </div>
                      <div className="col-4 menu-item-price text-right">
                        <h6>{price.price.toLocaleString("vi-VN")} VND</h6>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-muted">Chưa có dữ liệu bảng giá</p>
              )}
            </div>
          </div>

          {/* Bảng giá thứ hai */}
          <div className="col-lg-6 mb-lg-0 mb-5">
            <div className="padding">
              <h3>BẢNG GIÁ SHOP</h3>
              {secondHalf.length > 0 ? (
                secondHalf.map((price) => (
                  <div key={price._id} className="menu-item">
                    <div className="row border-dot no-gutters">
                      <div className="col-8 menu-item-name">
                        <h6>{price.name}</h6>
                      </div>
                      <div className="col-4 menu-item-price text-right">
                        <h6>{price.price.toLocaleString("vi-VN")} VND</h6>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-muted">Chưa có dữ liệu bảng giá</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PriceList;
