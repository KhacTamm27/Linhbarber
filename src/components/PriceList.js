import React from "react";

const PriceList = () => {
  const pricelist = [
    {
      id: 1,
      name: "Cắt tóc",
      price: "200",
    },
    {
      id: 2,
      name: "Spa tóc",
      price: "600",
    },
  ];

  return (
    <div>
      <h3>Bảng giá dịch vụ</h3>
      <ul>
        {pricelist.map((item) => (
          <li key={item.id}>
            {item.name}: {item.price} VNĐ
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PriceList;
