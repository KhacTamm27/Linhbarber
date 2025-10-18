/**
 * Component: Admin Dashboard
 * Trang tổng quan thống kê
 */

import React, { useState, useEffect } from "react";
import ServiceController from "../../controllers/ServiceController";
import PriceController from "../../controllers/PriceController";
import TestimonialController from "../../controllers/TestimonialController";
import ContactController from "../../controllers/ContactController";

const AdminDashboard = () => {
  const [stats, setStats] = useState({
    services: 0,
    prices: 0,
    testimonials: 0,
    contacts: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadStats();
  }, []);

  const loadStats = async () => {
    try {
      setLoading(true);

      const [services, prices, testimonials, contacts] = await Promise.all([
        ServiceController.getAllServices(),
        PriceController.getAllPrices(),
        TestimonialController.getAllTestimonials(),
        ContactController.getAllContacts(),
      ]);

      setStats({
        services: services.length,
        prices: prices.length,
        testimonials: testimonials.length,
        contacts: contacts.length,
      });
    } catch (error) {
      console.error("Error loading stats:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="loading-container">
        <div className="spinner-border text-primary" role="status">
          <span className="sr-only">Đang tải...</span>
        </div>
        <p className="mt-3">Đang tải dữ liệu...</p>
      </div>
    );
  }

  return (
    <div>
      <div className="section-header">
        <h3>
          <i className="fa fa-dashboard"></i> Tổng Quan
        </h3>
      </div>

      {/* Statistics Cards */}
      <div className="dashboard-stats">
        <div className="stat-card">
          <div className="stat-card-header">
            <div>
              <div className="stat-card-value">{stats.services}</div>
              <div className="stat-card-label">Dịch Vụ</div>
            </div>
            <div className="stat-card-icon blue">
              <i className="fa fa-scissors"></i>
            </div>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-card-header">
            <div>
              <div className="stat-card-value">{stats.prices}</div>
              <div className="stat-card-label">Bảng Giá</div>
            </div>
            <div className="stat-card-icon green">
              <i className="fa fa-dollar"></i>
            </div>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-card-header">
            <div>
              <div className="stat-card-value">{stats.testimonials}</div>
              <div className="stat-card-label">Đánh Giá</div>
            </div>
            <div className="stat-card-icon orange">
              <i className="fa fa-star"></i>
            </div>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-card-header">
            <div>
              <div className="stat-card-value">{stats.contacts}</div>
              <div className="stat-card-label">Tin Nhắn</div>
            </div>
            <div className="stat-card-icon purple">
              <i className="fa fa-envelope"></i>
            </div>
          </div>
        </div>
      </div>

      {/* Welcome Message */}
      <div className="data-table-wrapper">
        <div style={{ padding: "30px", textAlign: "center" }}>
          <i
            className="fa fa-dashboard"
            style={{ fontSize: "64px", color: "#667eea", marginBottom: "20px" }}
          ></i>
          <h3>Chào Mừng Đến Admin Dashboard</h3>
          <p style={{ color: "#999", marginTop: "15px" }}>
            Sử dụng menu bên trái để quản lý dữ liệu của website.
          </p>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
