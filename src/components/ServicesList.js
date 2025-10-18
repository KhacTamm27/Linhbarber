/**
 * Component: ServicesList
 * Ví dụ về cách sử dụng Controller trong React Component (View)
 * Component này CHỈ quan tâm đến việc hiển thị UI
 * Tất cả logic được xử lý bởi ServiceController
 */

import React, { useState, useEffect } from "react";
import ServiceController from "../controllers/ServiceController";

const ServicesList = () => {
  // State để lưu dữ liệu
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchKeyword, setSearchKeyword] = useState("");

  // Fetch dữ liệu khi component mount
  useEffect(() => {
    fetchServices();
  }, []);

  // Hàm fetch dữ liệu từ Controller
  const fetchServices = async () => {
    try {
      setLoading(true);
      setError(null);

      // Gọi Controller để lấy dữ liệu
      const data = await ServiceController.getAllServices();
      setServices(data);
    } catch (err) {
      setError("Không thể tải dữ liệu dịch vụ. Vui lòng thử lại sau.");
      console.error("Error fetching services:", err);
    } finally {
      setLoading(false);
    }
  };

  // Hàm tìm kiếm dịch vụ
  const handleSearch = async (e) => {
    e.preventDefault();

    if (!searchKeyword.trim()) {
      fetchServices(); // Nếu search rỗng, load lại tất cả
      return;
    }

    try {
      setLoading(true);
      setError(null);

      // Gọi Controller để tìm kiếm
      const data = await ServiceController.searchServices(searchKeyword);
      setServices(data);
    } catch (err) {
      setError("Không tìm thấy dịch vụ nào.");
      console.error("Error searching services:", err);
    } finally {
      setLoading(false);
    }
  };

  // Loading state
  if (loading) {
    return (
      <div className="container py-5 text-center">
        <div className="spinner-border" role="status">
          <span className="sr-only">Đang tải...</span>
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="container py-5">
        <div className="alert alert-danger" role="alert">
          {error}
          <button
            className="btn btn-sm btn-outline-danger ml-3"
            onClick={fetchServices}
          >
            Thử lại
          </button>
        </div>
      </div>
    );
  }

  // Render UI
  return (
    <div className="container py-5">
      <h2 className="heading text-center mb-5">Danh Sách Dịch Vụ</h2>

      {/* Search Form */}
      <form onSubmit={handleSearch} className="mb-4">
        <div className="row justify-content-center">
          <div className="col-md-6">
            <div className="input-group">
              <input
                type="text"
                className="form-control"
                placeholder="Tìm kiếm dịch vụ..."
                value={searchKeyword}
                onChange={(e) => setSearchKeyword(e.target.value)}
              />
              <div className="input-group-append">
                <button className="btn btn-primary" type="submit">
                  Tìm kiếm
                </button>
              </div>
            </div>
          </div>
        </div>
      </form>

      {/* Services Grid */}
      {services.length === 0 ? (
        <div className="text-center py-5">
          <p>Không tìm thấy dịch vụ nào.</p>
        </div>
      ) : (
        <div className="row">
          {services.map((service) => (
            <div key={service._id} className="col-md-4 mb-4">
              <div className="card h-100">
                <img
                  src={service.image}
                  className="card-img-top"
                  alt={service.name}
                  style={{ height: "200px", objectFit: "cover" }}
                />
                <div className="card-body">
                  <h5 className="card-title">{service.name}</h5>
                  <p className="card-text">{service.description}</p>
                  {service.price && (
                    <p className="text-primary font-weight-bold">
                      ${service.price}
                    </p>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ServicesList;
