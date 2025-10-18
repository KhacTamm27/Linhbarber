/**
 * Model: Price
 * Định nghĩa cấu trúc dữ liệu cho bảng giá
 */

export class PriceItem {
  constructor(id, category, name, price) {
    this.id = id;
    this.category = category;
    this.name = name;
    this.price = price;
  }
}

// Dữ liệu bảng giá cắt râu
export const beardPrices = [
  new PriceItem(1, "beard", "Cắt râu kiểu 1", 7),
  new PriceItem(2, "beard", "Cắt râu kiểu 2", 10),
  new PriceItem(3, "beard", "Cắt râu kiểu 3", 15),
  new PriceItem(4, "beard", "Cắt râu kiểu 4", 15),
  new PriceItem(5, "beard", "Cắt râu kiểu 5", 20),
  new PriceItem(6, "beard", "Cắt râu kiểu 6", 25),
];

// Dữ liệu bảng giá cắt tóc và râu
export const hairBeardPrices = [
  new PriceItem(7, "hair-beard", "Nhuộm tóc và râu 1", 27),
  new PriceItem(8, "hair-beard", "Nhuộm tóc và râu 2", 21),
  new PriceItem(9, "hair-beard", "Nhuộm tóc và râu 3", 25),
  new PriceItem(10, "hair-beard", "Nhuộm tóc và râu 4", 28),
  new PriceItem(11, "hair-beard", "Nhuộm tóc và râu 5", 30),
  new PriceItem(12, "hair-beard", "Nhuộm tóc và râu 6", 35),
];

// Tất cả giá
export const allPrices = [...beardPrices, ...hairBeardPrices];

