import {
  MessageCircle,
  MessageSquare,
  PhoneCall,
  Headphones,
} from "lucide-react"; // đảm bảo import Music
import React, { useState, useEffect } from "react";

const FloatingButtons = () => {
  const [musicOn, setMusicOn] = useState(true);

  useEffect(() => {
    // Tạo thẻ audio khi component mount
    let audio = document.getElementById("noel-audio");
    if (!audio) {
      audio = document.createElement("audio");
      audio.id = "noel-audio";
      audio.src = "assets/images/noel.mp3";
      audio.loop = true;
      audio.muted = !musicOn;
      document.body.appendChild(audio);
    }

    if (musicOn) {
      audio.muted = false;
      audio.play().catch(() => {});
    } else {
      audio.pause();
    }

    return () => {
      // Không remove audio để tránh tắt nhạc khi đổi component
    };
  }, [musicOn]);

  const toggleMusic = () => setMusicOn(!musicOn);
  const styles = {
    button: (bottom, bgColor) => ({
      position: "fixed",
      bottom: bottom,
      left: "20px",
      width: "60px",
      height: "60px",
      borderRadius: "50%",
      backgroundColor: bgColor,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      boxShadow: "0 0 12px rgba(0,0,0,0.25)",
      animation: "pulse 1.6s infinite",
      zIndex: 9999,
      cursor: "pointer",
      marginBottom: "15px", // khoảng cách giữa các nút
    }),
  };

  const animationCSS = `
  @keyframes pulse {
    0% { transform: scale(1); box-shadow: 0 0 10px rgba(0,0,0,0.2); }
    50% { transform: scale(1.12); box-shadow: 0 0 18px rgba(0,0,0,0.35); }
    100% { transform: scale(1); box-shadow: 0 0 10px rgba(0,0,0,0.2); }
  }
  .floating-btn:hover {
    transform: scale(1.2);
    box-shadow: 0 0 20px rgba(0,0,0,0.5);
  }
  `;

  return (
    <>
      <style>{animationCSS}</style>

      {/* Nút Zalo */}
      <a
        href="https://zalo.me/0332953956"
        target="_blank"
        rel="noopener noreferrer"
        className="floating-btn"
        style={styles.button("140px", "#0088ff")}
      >
        <MessageSquare size={32} color="white" />
      </a>

      {/* Nút Messenger */}
      <a
        href="https://www.facebook.com/NGUYENDILINH2K1"
        target="_blank"
        rel="noopener noreferrer"
        className="floating-btn"
        style={styles.button("75px", "#006aff")}
      >
        <MessageCircle size={32} color="white" />
      </a>

      {/* Nút Gọi điện thoại */}
      <a
        href="tel:+84395284436"
        className="floating-btn"
        style={styles.button("10px", "#006aff")}
      >
        <PhoneCall size={32} color="white" />
      </a>
      {/* Nút nhạc */}
      <div
        onClick={toggleMusic}
        style={{
          position: "fixed",
          bottom: "110px",
          right: "32px", // đặt bên phải
          width: "60px",
          height: "60px",
          borderRadius: "50%",
          backgroundColor: "#ff6600",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          boxShadow: "0 0 12px rgba(0,0,0,0.25)",
          cursor: "pointer",
          animation: "pulse 1.6s infinite", // thêm hiệu ứng nháy
          zIndex: 9999,
        }}
      >
        <Headphones size={32} color={musicOn ? "white" : "gray"} />
      </div>
    </>
  );
};

export default FloatingButtons;
