import React, { useState } from "react";
import { Wheel } from "react-custom-roulette";
import Swal from "sweetalert2";
import { Gift } from "lucide-react"; // npm install lucide-react

const LuckyWheel = () => {
  const data = [
    { option: "Giảm 20%" },
    { option: "Gội đầu miễn phí" },
    { option: "Cạo mặt miễn phí" },
    { option: "Không trúng thưởng 😅" },
    { option: "Tặng 1 lượt cắt" },
    { option: "Giảm 10%" },
  ];

  const [mustSpin, setMustSpin] = useState(false);
  const [prizeNumber, setPrizeNumber] = useState(0);
  const [showWheel, setShowWheel] = useState(false);

  const handleSpinClick = () => {
    if (mustSpin) return;
    const randomPrize = Math.floor(Math.random() * data.length);
    setPrizeNumber(randomPrize);
    setMustSpin(true);
  };

  const handleClose = () => setShowWheel(false);

  return (
    <>
      {/* 🎁 Icon nhỏ góc dưới */}
      <div
        onClick={() => setShowWheel(true)}
        style={{
          position: "fixed",
          bottom: "30px",
          right: "30px",
          backgroundColor: "#ff6600",
          borderRadius: "50%",
          width: "65px",
          height: "65px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          boxShadow: "0 0 10px rgba(0,0,0,0.3)",
          cursor: "pointer",
          zIndex: 999,
        }}
      >
        <Gift size={32} color="white" />
      </div>

      {/* 🌀 Popup vòng quay */}
      {showWheel && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            background: "rgba(0,0,0,0.6)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 1000,
            padding: "10px",
          }}
        >
          <div
            style={{
              background: "white",
              borderRadius: "20px",
              padding: "20px",
              textAlign: "center",
              width: "90%",
              maxWidth: "500px",
              boxShadow: "0 4px 20px rgba(0,0,0,0.3)",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <h3
              style={{
                marginBottom: "15px",
                color: "#ff6600",
                fontSize: "1.4rem",
              }}
            >
              🎯 Vòng quay may mắn 🎁
            </h3>

            <div
              style={{
                width: "100%",
                maxWidth: "450px",
                aspectRatio: "1 / 1",
                margin: "0 auto",
              }}
            >
              <Wheel
                mustStartSpinning={mustSpin}
                prizeNumber={prizeNumber}
                data={data}
                backgroundColors={["#FFD700", "#FF9966", "#66CCFF", "#FF6699"]}
                textColors={["#000"]}
                fontSize={14}
                outerBorderWidth={5}
                outerBorderColor="#000"
                innerRadius={20}
                onStopSpinning={() => {
                  setMustSpin(false);
                  const prize = data[prizeNumber]?.option || "Không xác định";
                  Swal.fire({
                    title: "🎉 Kết quả",
                    text: `Bạn trúng: ${prize}`,
                    icon: "success",
                    confirmButtonColor: "#ff6600",
                  });
                }}
              />
            </div>

            {/* Nút quay + đóng */}
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                gap: "10px",
                marginTop: "20px",
                flexWrap: "wrap",
              }}
            >
              <button
                onClick={() => {
                  if (!mustSpin) {
                    const randomPrize = Math.floor(Math.random() * data.length);
                    setPrizeNumber(randomPrize);
                    setMustSpin(true);
                  }
                }}
                disabled={mustSpin}
                style={{
                  backgroundColor: "#ff6600",
                  color: "white",
                  border: "none",
                  padding: "10px 20px",
                  borderRadius: "10px",
                  cursor: "pointer",
                  fontSize: "16px",
                  fontWeight: "bold",
                }}
              >
                {mustSpin ? "Đang quay..." : "🎡 Quay ngay"}
              </button>

              <button
                onClick={() => setShowWheel(false)}
                style={{
                  backgroundColor: "#ccc",
                  color: "#333",
                  border: "none",
                  padding: "10px 20px",
                  borderRadius: "10px",
                  cursor: "pointer",
                  fontSize: "16px",
                  fontWeight: "bold",
                }}
              >
                Đóng
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default LuckyWheel;
