/**
 * Model: Testimonial
 * Định nghĩa cấu trúc dữ liệu cho đánh giá khách hàng
 */

export class Testimonial {
  constructor(id, name, comment, image, social) {
    this.id = id;
    this.name = name;
    this.comment = comment;
    this.image = image;
    this.social = social || { facebook: "#", twitter: "#" };
  }
}

// Dữ liệu đánh giá cho Home page
export const homeTestimonials = [
  new Testimonial(
    1,
    "Abraham Smith",
    "Dịch vụ cắt tóc ở đây thật tuyệt vời! Thợ cắt tóc rất chuyên nghiệp và tận tâm. Tôi rất hài lòng với kết quả.",
    "assets/images/test1.jpg",
    { facebook: "#", twitter: "#" }
  ),
  new Testimonial(
    2,
    "Mariana Noe",
    "Salon này có không gian rất đẹp và thoải mái. Nhân viên phục vụ rất nhiệt tình và chuyên nghiệp.",
    "assets/images/test2.jpg",
    { facebook: "#", twitter: "#" }
  ),
  new Testimonial(
    3,
    "Nebula Nairobi",
    "Kiểu tóc mà tôi được cắt ở đây thật hoàn hảo! Tôi sẽ quay lại lần nữa và giới thiệu cho bạn bè.",
    "assets/images/test3.jpg",
    { facebook: "#", twitter: "#" }
  ),
];

// Dữ liệu đánh giá cho Services page
export const servicesTestimonials = [
  new Testimonial(
    4,
    "Chương Minh",
    "Dịch vụ cắt tóc ở đây thật tuyệt vời! Thợ cắt tóc rất chuyên nghiệp và tận tâm. Tôi rất hài lòng với kết quả.",
    "assets/images/test1.jpg"
  ),
  new Testimonial(
    5,
    "Văn Đức",
    "Salon này có không gian rất đẹp và thoải mái. Nhân viên phục vụ rất nhiệt tình và chuyên nghiệp.",
    "assets/images/test2.jpg"
  ),
  new Testimonial(
    6,
    "Thắng Nguyễn",
    "Kiểu tóc mà tôi được cắt ở đây thật hoàn hảo! Tôi sẽ quay lại lần nữa và giới thiệu cho bạn bè.",
    "assets/images/test3.jpg"
  ),
];
