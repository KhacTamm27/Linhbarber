/**
 * Model: Service
 * Định nghĩa cấu trúc dữ liệu cho dịch vụ salon
 */

export class Service {
  constructor(id, name, description, image, price) {
    this.id = id;
    this.name = name;
    this.description = description;
    this.image = image;
    this.price = price;
  }
}

// Dữ liệu mẫu cho các dịch vụ
export const servicesData = [
  new Service(
    1,
    "Cắt tóc",
    "Chúng tôi cung cấp các dịch vụ cắt tóc chuyên nghiệp với nhiều kiểu tóc khác nhau.",
    "assets/images/services2.jpg",
    null
  ),
  new Service(
    2,
    "Tạo Kiểu",
    "Chuyên viên tạo kiểu giàu kinh nghiệm, tận tâm, giúp khách hàng sở hữu mái tóc đẹp, thời thượng và bồng bềnh.",
    "assets/images/services1.jpg",
    null
  ),
  new Service(
    3,
    "Nhuộm tóc",
    "Dịch vụ nhuộm tóc chuyên nghiệp để tạo ra kiểu tóc hoàn hảo.",
    "assets/images/ser3.jpg",
    null
  ),
  new Service(
    4,
    "Gội đầu",
    "Dịch vụ gội đầu chuyên nghiệp với các sản phẩm chất lượng cao.",
    "assets/images/ser4.jpg",
    null
  ),
  new Service(
    5,
    "Sấy tóc",
    "Dịch vụ sấy tóc chuyên nghiệp để tạo ra kiểu tóc hoàn hảo.",
    "assets/images/ser5.jpg",
    null
  ),
  new Service(
    6,
    "Uốn tóc",
    "Dịch vụ uốn tóc chuyên nghiệp để tạo ra kiểu tóc hoàn hảo.",
    "assets/images/ser6.jpg",
    null
  ),
];

// Dữ liệu cho trang Services
export const serviceStyles = [
  {
    id: 1,
    name: "CẮT TÓC",
    description:
      "Chúng tôi cung cấp các dịch vụ cắt tóc chuyên nghiệp với nhiều kiểu tóc khác nhau.",
    image: "assets/images/sp1.jpg",
  },
  {
    id: 2,
    name: "Tạo Kiểu",
    description:
      "Chuyên viên tạo kiểu giàu kinh nghiệm, tận tâm, giúp khách hàng sở hữu mái tóc đẹp, thời thượng và bồng bềnh.",
    image: "assets/images/sp2.jpg",
  },
  {
    id: 3,
    name: "Nhuộm tóc",
    description: "Dịch vụ nhuộm tóc chuyên nghiệp để tạo ra kiểu tóc hoàn hảo.",
    image: "assets/images/sp3.jpg",
  },
  {
    id: 4,
    name: "Uốn tóc",
    description: "Dịch vụ uốn tóc chuyên nghiệp để tạo ra kiểu tóc hoàn hảo.",
    image: "assets/images/sp4.jpg",
  },
];
