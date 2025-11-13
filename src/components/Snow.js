import React from "react";
import "./snow.css"; // file css bên dưới

const Snow = ({ count = 60 }) => {
  // tạo mảng index để map ra các flake
  const flakes = Array.from({ length: count });

  return (
    <div className="snow-wrapper" aria-hidden="true">
      {flakes.map((_, i) => {
        // random inline style cho mỗi flake để đa dạng
        const left = Math.random() * 100; // % ngang
        const delay = Math.random() * 8; // s
        const duration = 6 + Math.random() * 10; // s
        const size = 6 + Math.random() * 10; // px
        const opacity = 0.3 + Math.random() * 0.7;

        return (
          <div
            key={i}
            className="snow-flake"
            style={{
              left: `${left}%`,
              width: `${size}px`,
              height: `${size}px`,
              opacity,
              animationDelay: `${delay}s`,
              animationDuration: `${duration}s`,
            }}
          />
        );
      })}
    </div>
  );
};

export default Snow;
