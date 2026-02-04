import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import PriceList from "./PriceList";
import TestimonialsList from "./TestimonialsList";
import ServiceController from "../controllers/ServiceController";
import Confetti from "react-confetti";
import LuckyWheel from "../components/LuckyWheel";
import Snowfall from "react-snowfall";
import Snow from "./Snow";
import FloatingButtons from "./FloatingButtons";

const Home = () => {
  const [showPopup, setShowPopup] = useState(false);
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedDescription, setSelectedDescription] = useState("");
  const [clickedServiceId, setClickedServiceId] = useState(null);
  const [confetti, setConfetti] = useState(false);
  const [musicOn, setMusicOn] = useState(true);

  useEffect(() => {
    // Kiểm tra xem popup đã hiển thị trước đó chưa
    const hasSeenPopup = localStorage.getItem("hasSeenNoelPopup");

    if (!hasSeenPopup) {
      const timer = setTimeout(() => {
        setShowPopup(true);
        setConfetti(true); // bật confetti khi popup xuất hiện

        // tắt confetti sau 5 giây
        setTimeout(() => setConfetti(false), 5000);

        // đánh dấu đã hiển thị popup
        localStorage.setItem("hasSeenNoelPopup", "true");
      }, 1500); // hiển thị popup sau 1.5 giây

      return () => clearTimeout(timer);
    }
  }, []);

  // Load dịch vụ riêng
  useEffect(() => {
    loadServices();
  }, []);

  const loadServices = async () => {
    try {
      setLoading(true);
      const response = await ServiceController.getAllServices();
      // Xử lý cả 2 trường hợp: response.data hoặc response trực tiếp là array
      const servicesData = response?.data || response || [];
      setServices(Array.isArray(servicesData) ? servicesData : []);
    } catch (error) {
      console.error("Error loading services:", error);
      setServices([]);
    } finally {
      setLoading(false);
    }
  };

  // Lấy 2 service đầu tiên cho hàng lớn
  const firstTwoServices = services.slice(0, 2);
  // Lấy 4 service tiếp theo cho hàng nhỏ
  const nextFourServices = services.slice(2, 6);

  return (
    <div>
      <Snow count={40} />
      <Snowfall
        snowflakeCount={50} // giảm số lượng tuyết
        color="white"
        radius={[1, 1]} // giảm kích thước
        speed={[0.5, 1]} // giảm tốc độ
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100vw",
          height: "100vh",
          pointerEvents: "none",
          zIndex: 9999,
        }}
      />
      {/* Confetti */}
      {confetti && (
        <Confetti
          width={window.innerWidth}
          height={window.innerHeight}
          recycle={false}
          numberOfPieces={200}
        />
      )}
      {/* Popup Noel */}
      {showPopup && (
        <div style={styles.popupOverlay}>
          <div style={styles.popupContent}>
            <h3 style={{ color: "#d63384", marginBottom: "10px" }}>
              🎄 Tết đến rồi 🧧
            </h3>
            <p style={{ fontSize: "16px", lineHeight: "1.5", color: "#333" }}>
              Bạn có người yêu chưa? <br />
              Nếu chưa thì do bạn chưa đủ sức hút 😎 <br />
              Hãy đến với <b>Linh Barber</b> làm đẹp để có người yêu đi chơi Tết
              nhé!
            </p>
            <button
              onClick={() => {
                setShowPopup(false);
                setConfetti(true);
                setTimeout(() => setConfetti(false), 5000); // tắt confetti sau 5 giây
              }}
              style={styles.popupButton}
            >
              OK ❤️
            </button>
          </div>
        </div>
      )}
      {/* <!-- //header -->
// <!-- banner --> */}
      <div class="banner_w3lspvt" id="home">
        <div class="csslider infinity" id="slider1">
          <input type="radio" name="slides" checked="checked" id="slides_1" />
          <input type="radio" name="slides" id="slides_2" />
          <input type="radio" name="slides" id="slides_3" />
          <input type="radio" name="slides" id="slides_4" />

          <ul class="banner_slide_bg">
            <li>
              <div class="slider-info bg1">
                <div class="bs-slider-overlay">
                  <div class="banner-text">
                    <div class="container">
                      {/* <h2 class="movetxt agile-title text-capitalize">
                        Chúng Tôi Tạo Ra Và Cải Tiến Xu Hướng Tóc
                      </h2> */}
                      {/* <p>
                        Chúng tôi chuyên tạo ra những kiểu tóc mới nhất và cải
                        tiến các xu hướng tóc hiện đại. Với kinh nghiệm nhiều
                        năm trong ngành.
                      </p> */}

                      <Link
                        to="tel:+84395284436"
                        className="btn"
                        style={{
                          position: "absolute",
                          bottom: "-2%",
                          left: "42%",
                          transform: "translateX(-50%)",
                          display: "inline-block",
                        }}
                      >
                        Liên hệ ngay
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </li>
            <li>
              <div class="slider-info bg2">
                <div class="bs-slider-overlay1">
                  <div class="banner-text">
                    <div class="container">
                      <h4 class="movetxt agile-title text-capitalize">
                        Chúng Tôi Giúp Tóc Và Râu Phát Triển Tốt
                      </h4>
                      <p>
                        Chúng tôi cung cấp các dịch vụ chăm sóc tóc và râu
                        chuyên nghiệp, giúp tóc và râu của bạn phát triển khỏe
                        mạnh và đẹp.
                      </p>
                      <Link to="tel:+84395284436" class="btn">
                        Liên hệ ngay
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </li>
            <li>
              <div class="slider-info bg3">
                <div class="bs-slider-overlay1">
                  <div class="banner-text">
                    <div class="container">
                      <h2 class="movetxt agile-title text-capitalize">
                        Chúng Tôi Thiết Kế Và Tạo Kiểu Tóc Mới Nhất
                      </h2>
                      <p>
                        Chúng tôi luôn cập nhật và tạo ra những kiểu tóc mới
                        nhất theo xu hướng thời trang hiện đại.
                      </p>
                      <Link to="tel:+84395284436" class="btn">
                        Liên hệ ngay
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </li>
            <li>
              <div class="slider-info bg4">
                <div class="bs-slider-overlay1">
                  <div class="banner-text">
                    <div class="container">
                      <h4 class="movetxt agile-title text-capitalize">
                        Chúng Tôi Thiết Kế Kiểu Tóc Xu Hướng Mới Nhất
                      </h4>
                      <p>
                        Chúng tôi chuyên thiết kế những kiểu tóc theo xu hướng
                        mới nhất, mang đến cho bạn vẻ ngoài hiện đại và thời
                        trang.
                      </p>
                      <Link to="tel:+84395284436" class="btn">
                        Liên hệ ngay
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </li>
          </ul>
          <div class="navigation">
            <div>
              <label for="slides_1"></label>
              <label for="slides_2"></label>
              <label for="slides_3"></label>
              <label for="slides_4"></label>
            </div>
          </div>
        </div>
      </div>
      //{" "}
      {/* <!-- //banner -->
//  <!-- banner bottom grids --> */}
      <section class="content-info py-5" id="about">
        <div class="container py-md-5">
          <h3 class="heading text-center mb-3 mb-sm-5">Về chúng tôi</h3>

          <div class="info-w3pvt-mid text-center px-lg-5">
            <div class="title-desc text-center px-lg-5">
              <img
                src="assets/images/about1.png"
                alt="news image"
                class="img-fluid"
              />
              <p class="px-lg-5">
                Chúng tôi là salon tóc chuyên nghiệp với nhiều năm kinh nghiệm
                trong ngành. Chúng tôi cam kết mang đến cho khách hàng những
                dịch vụ chăm sóc tóc chất lượng cao nhất. Với đội ngũ thợ cắt
                tóc chuyên nghiệp và trang thiết bị hiện đại, chúng tôi tự tin
                mang đến cho bạn những trải nghiệm tuyệt vời nhất.
              </p>

              <div style={{ textAlign: "center", marginTop: "20px" }}>
                <Link
                  to="/services"
                  className="btn"
                  style={{
                    backgroundColor: "#cac02bff",
                    color: "white",
                    padding: "10px 20px",
                    borderRadius: "8px",
                    textDecoration: "none",
                    fontWeight: "bold",
                    display: "inline-block",
                  }}
                >
                  Tìm hiểu thêm
                </Link>

                {/* Nút Nội dung các mẫu tóc hiện đại */}
                <Link
                  to="/gallery"
                  className="btn"
                  style={{
                    backgroundColor: "#cac02bff",
                    color: "white",
                    padding: "10px 20px",
                    borderRadius: "8px",
                    textDecoration: "none",
                    fontWeight: "bold",
                    display: "block", // xuống hàng
                    marginTop: "15px",
                    width: "fit-content",
                    marginLeft: "auto",
                    marginRight: "auto",
                  }}
                >
                  Các mẫu tóc hiện đại
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
      //{" "}
      {/* <!-- //banner bottom grids -->

//  <!-- /services --> */}
      <section class="services py-5" id="services">
        <div class="container py-md-5">
          <h3 class="heading text-center mb-3 mb-sm-5">Dịch vụ</h3>
          {loading ? (
            <div class="text-center py-5">
              <div class="spinner-border text-primary" role="status">
                <span class="sr-only">Loading...</span>
              </div>
              <p class="mt-3">Đang tải dịch vụ...</p>
            </div>
          ) : services.length === 0 ? (
            <div class="text-center py-5">
              <p>Chưa có dịch vụ nào</p>
            </div>
          ) : (
            <>
              {/* Hàng lớn - 2 dịch vụ đầu tiên */}
              {firstTwoServices.length > 0 && (
                <div class="row ab-info">
                  {firstTwoServices.map((service) => (
                    <div
                      key={service._id}
                      class="col-md-6 ab-content ab-content1"
                      onClick={() => {
                        setClickedServiceId(service._id);
                      }}
                      style={{
                        display: "flex",
                        marginBottom: "1.5rem",
                        cursor: "pointer",
                      }}
                    >
                      <div
                        class="ab-content-inner"
                        style={{
                          display: "flex",
                          flexDirection: "column",
                          width: "100%",
                          height: "100%",
                        }}
                      >
                        <div
                          style={{
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            marginBottom: "1em",
                            overflow: "hidden",
                            height: "250px",
                          }}
                        >
                          <img
                            src={service.image || "assets/images/services2.jpg"}
                            alt={service.name}
                            class="img-fluid"
                            style={{
                              width: "100%",
                              height: "100%",
                              objectFit: "cover",
                            }}
                            onError={(e) => {
                              e.target.src = "assets/images/services2.jpg";
                            }}
                          />
                        </div>
                        <div
                          class="ab-info-con"
                          style={{
                            textAlign: "center",
                            flex: 1,
                            display: "flex",
                            flexDirection: "column",
                            justifyContent: "center",
                          }}
                        >
                          {clickedServiceId === service._id ? (
                            <p>{service.description}</p>
                          ) : (
                            <h4 style={{ margin: "0.5em 0" }}>
                              {service.name}
                            </h4>
                          )}

                          <div
                            class="read-more two btn m-0 px-3"
                            style={{ alignSelf: "center", cursor: "default" }}
                          >
                            <span class="fa fa-arrow-circle-o-right"> </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* Hàng nhỏ - 4 dịch vụ tiếp theo */}
              {nextFourServices.length > 0 && (
                <div class="row ab-info second mt-lg-4">
                  {nextFourServices.map((service) => (
                    <div
                      key={service._id}
                      class="col-md-3 ab-content"
                      onClick={() => {
                        setClickedServiceId(service._id);
                      }}
                      style={{
                        display: "flex",
                        marginBottom: "1.5rem",
                        cursor: "pointer",
                      }}
                    >
                      <div
                        class="ab-content-inner"
                        style={{
                          display: "flex",
                          flexDirection: "column",
                          width: "200%",
                          height: "100%",
                        }}
                      >
                        <div
                          style={{
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            marginBottom: "1em",
                            overflow: "hidden",
                            height: "200px",
                          }}
                        >
                          <img
                            src={service.image || "assets/images/ser3.jpg"}
                            alt={service.name}
                            class="img-fluid"
                            style={{
                              width: "100%",
                              height: "100%",
                              objectFit: "cover",
                            }}
                            onError={(e) => {
                              e.target.src = "assets/images/ser3.jpg";
                            }}
                          />
                        </div>
                        <div
                          class="ab-info-con"
                          style={{
                            textAlign: "center",
                            flex: 1,
                            display: "flex",
                            flexDirection: "column",
                            justifyContent: "center",
                          }}
                        >
                          {clickedServiceId === service._id ? (
                            <p>{service.description}</p>
                          ) : (
                            <h4 style={{ margin: "0.5em 0" }}>
                              {service.name}
                            </h4>
                          )}
                          <div
                            class="read-more two btn m-0 px-3"
                            style={{ alignSelf: "center", cursor: "default" }}
                          >
                            <span class="fa fa-arrow-circle-o-right"> </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </>
          )}
        </div>
      </section>
      {/* // <!-- /services -->
 
	// <!-- pricing -->  */}
      <PriceList />
      //{" "}
      {/* <!-- //pricing -->
//   <!--/order-now--> */}
      <section class="order-sec py-5">
        <div class="container py-md-5 text-center">
          <h3 class="fw-bold mb-3">
            <span class="text-primary d-block fs-2">
              GỌI CHÚNG TÔI ĐỂ ĐẶT LỊCH HẸN
            </span>
            Đội ngũ của chúng tôi sẽ gọi lại ngay lập tức và đặt lịch hẹn
          </h3>

          <div
            class="d-flex justify-content-center align-items-center gap-3 mb-3"
            style={{ flexWrap: "wrap" }}
          >
            <a
              href="tel:+84395284436"
              class="d-inline-flex align-items-center bg-light text-primary fw-semibold px-4 py-2 rounded shadow-sm"
              style={{ textDecoration: "none", margin: "15px" }}
            >
              <span class="me-2 fs-4">📞</span> +84 395 284 436
            </a>

            <a
              href="https://www.facebook.com/NGUYENDILINH2K1"
              target="_blank"
              rel="noopener noreferrer"
              class="d-inline-flex align-items-center bg-light text-primary fw-semibold px-4 py-2 rounded shadow-sm"
              style={{ textDecoration: "none" }}
            >
              <span class="fa fa-facebook me-2" aria-hidden="true"></span>
              FB: Nguyễn Di Linh
            </a>
          </div>

          {/* <div class="mb-3">
            <a href="tel:+84395284436" class="btn btn-primary btn-lg">
              Nhấn vào đây
            </a>
          </div> */}
          <div className="last-w3ls-contact">
            <a
              href="https://www.google.com/maps/place/Linh+Barber+Housee/@13.0340732,109.156351,12z/data=!4m10!1m2!2m1!1zMjhNMitKNVcsIFRow7RuIEzhu5ljIMSQw7RuZywgxJDDtG5nIEjDsmEsIFBow7ogWcOqbg!3m6!1s0x316fef002824d5a3:0xead8ae1cac5c93c2!8m2!3d13.0340732!4d109.3005466!15sCjQyOE0yK0o1VywgVGjDtG4gTOG7mWMgxJDDtG5nLCDEkMO0bmcgSMOyYSwgUGjDuiBZw6puWjMiMTI4bTIgajV3IHRow7RuIGzhu5ljIMSRw7RuZyDEkcO0bmcgaMOyYSBwaMO6IHnDqm6SAQtiYXJiZXJfc2hvcJoBJENoZERTVWhOTUc5blMwVkpRMEZuVFVOWk1XOHpkREozUlJBQuABAPoBBAgAEDM!16s%2Fg%2F11wplw_mm5?entry=ttu&g_ep=EgoyMDI1MTEwNS4wIKXMDSoASAFQAw%3D%3D"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: "inline-flex", // dùng flex để icon và chữ thẳng hàng
                alignItems: "center",
                gap: "6px", // khoảng cách giữa icon và chữ
                backgroundColor: "#0066ff",
                color: "white",
                padding: "5px 10px",
                borderRadius: "16px",
                textDecoration: "none",
                fontWeight: "bold",
                transition: "background-color 0.3s ease, transform 0.2s ease",
              }}
            >
              <span className="fa fa-map-marker" aria-hidden="true"></span>
              Thôn Lộc Đông, Đông Hòa, Phú Yên
            </a>
          </div>
        </div>
      </section>
      //{" "}
      {/* <!--//order-now-->

//  <!--/testimonials--> */}
      <TestimonialsList />
      //{" "}
      {/* <!--//testimonials-->
// <!-- subscribe --> */}
      <section class="subscribe" id="subscribe">
        <div class="container-fluid">
          <div class="row">
            <div class="col-md-5 d-flex subscribe-left p-lg-5 py-sm-5 py-4">
              <div class="news-icon mr-3">
                <span class="fa fa-paper-plane" aria-hidden="true"></span>
              </div>
              <div class="text">
                <h3>Đăng ký nhận bản tin của chúng tôi</h3>
              </div>
            </div>
            <div class="col-md-7 subscribe-right p-lg-5 py-sm-5 py-4">
              <form action="#" method="post">
                <input
                  type="email"
                  name="phone"
                  placeholder="Nhập số điện thoại của bạn tại đây"
                  required=""
                />
                <button
                  class="btn1"
                  type="button"
                  onClick={(e) => e.preventDefault()}
                >
                  <span class="fa fa-paper-plane"></span>
                </button>
              </form>
              <p>
                chúng tôi không bao giờ chia sẻ email của bạn với bất kỳ ai khác
              </p>
            </div>
          </div>
        </div>
      </section>
      //{" "}
      {/* <!-- //subscribe -->
// <!-- footer --> */}
      <>
        {/* Toàn bộ nội dung trang Home */}
        <LuckyWheel />
      </>
      <>
        <FloatingButtons />
      </>
      ;
    </div>
  );
};

// CSS styles in JS
const styles = {
  popupOverlay: {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(0, 0, 0, 0.6)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 9999,
  },
  popupContent: {
    backgroundColor: "#fff",
    borderRadius: "16px",
    padding: "30px 40px",
    maxWidth: "400px",
    textAlign: "center",
    boxShadow: "0 4px 15px rgba(0,0,0,0.3)",
    animation: "popupBounce 0.5s ease-out",
  },
  popupButton: {
    marginTop: "20px",
    padding: "8px 20px",
    backgroundColor: "#0066ff",
    color: "white",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
    fontWeight: "bold",
  },
  banner: {
    background: "linear-gradient(-45deg, #ff9a9e, #fad0c4, #a1c4fd, #c2e9fb)",
    backgroundSize: "400% 400%",
    animation: "bgGradient 15s ease infinite",
  },
};
/* ===================== CSS ANIMATION ===================== */
const animationCSS = `
@keyframes pulse {
  0% { transform: scale(1); box-shadow: 0 0 10px rgba(0,0,0,0.2); }
  50% { transform: scale(1.12); box-shadow: 0 0 18px rgba(0,0,0,0.35); }
  100% { transform: scale(1); box-shadow: 0 0 10px rgba(0,0,0,0.2); }
}
`;
export default Home;
