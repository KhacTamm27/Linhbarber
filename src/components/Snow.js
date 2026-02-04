import React from "react";
import "./snow.css";

const Snow = ({ count = 60, giftCount = 6 }) => {
  const flakes = Array.from({ length: count });
  const gifts = Array.from({ length: giftCount });
  return (
    <>
      {/* Tuyết rơi */}
      <div className="snow-wrapper">
        {flakes.map((_, i) => {
          const left = Math.random() * 100;
          const delay = Math.random() * 5;
          const duration = 8 + Math.random() * 6;
          const size = 15 + Math.random() * 10;

          return (
            <img
              key={i}
              src="assets/images/lixii.svg"
              className="snow-flake"
              style={{
                left: `${left}%`,
                width: `${size}px`,
                height: `${size}px`,
                animationDelay: `${delay}s`,
                animationDuration: `${duration}s`,
              }}
              alt="lixi"
            />
          );
        })}
      </div>

      {/* Santa chạy ngang
      <img src="assets/images/santa.png" alt="santa" className="santa" /> */}

      {/* Hộp quà rơi */}
      {gifts.map((_, i) => {
        const left = Math.random() * 50;
        const delay = Math.random() * 2;
        const duration = 4 + Math.random() * 5;
        const size = 30 + Math.random() * 40;

        return (
          <img
            key={`gift-${i}`}
            src="assets/images/gift.png"
            alt="gift falling"
            className="gift-rain"
            style={{
              left: `${left}%`,
              width: `${size}px`,
              animationDelay: `${delay}s`,
              animationDuration: `${duration}s`,
            }}
          />
        );
      })}
    </>
  );
};

export default Snow;
