/**
 * Model: Banner
 * Định nghĩa cấu trúc dữ liệu cho banner slides
 */

export class BannerSlide {
  constructor(id, title, description, backgroundClass, ctaText, ctaLink) {
    this.id = id;
    this.title = title;
    this.description = description;
    this.backgroundClass = backgroundClass;
    this.ctaText = ctaText || "Liên hệ ngay";
    this.ctaLink = ctaLink || "tel:+84395284436";
  }
}

// Dữ liệu banner slides
export const bannerSlides = [
  new BannerSlide(
    1,
    "Chúng Tôi Tạo Ra Và Cải Tiến Xu Hướng Tóc",
    "Chúng tôi chuyên tạo ra những kiểu tóc mới nhất và cải tiến các xu hướng tóc hiện đại. Với kinh nghiệm nhiều năm trong ngành.",
    "bg1"
  ),
  new BannerSlide(
    2,
    "Chúng Tôi Giúp Tóc Và Râu Phát Triển Tốt",
    "Chúng tôi cung cấp các dịch vụ chăm sóc tóc và râu chuyên nghiệp, giúp tóc và râu của bạn phát triển khỏe mạnh và đẹp.",
    "bg2"
  ),
  new BannerSlide(
    3,
    "Chúng Tôi Thiết Kế Và Tạo Kiểu Tóc Mới Nhất",
    "Chúng tôi luôn cập nhật và tạo ra những kiểu tóc mới nhất theo xu hướng thời trang hiện đại.",
    "bg3"
  ),
  new BannerSlide(
    4,
    "Chúng Tôi Thiết Kế Kiểu Tóc Xu Hướng Mới Nhất",
    "Chúng tôi chuyên thiết kế những kiểu tóc theo xu hướng mới nhất, mang đến cho bạn vẻ ngoài hiện đại và thời trang.",
    "bg4"
  ),
];

