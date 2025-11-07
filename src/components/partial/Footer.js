import React from "react";

const Footer = () => {
  return (
    <footer class="footer-content">
      <div class="layer footer">
        <div class="container-fluid">
          <div class="row footer-top-inner-w3ls">
            <div class="col-lg-4 col-md-6 footer-top ">
              <h2>
                <a href="index.html">Linh Barber House</a>
              </h2>
              <p class="my-3">
                Chúng tôi cam kết mang đến cho khách hàng những dịch vụ chăm sóc
                tóc chất lượng cao nhất với đội ngũ thợ cắt tóc chuyên nghiệp.
              </p>
              <p>
                Với nhiều năm kinh nghiệm trong ngành, chúng tôi tự tin mang đến
                cho bạn những trải nghiệm tuyệt vời nhất.
              </p>
            </div>
            <div class="col-lg-4 col-md-6 mt-md-0 mt-5">
              <div class="footer-w3pvt">
                <h3 class="mb-3 w3pvt_title">Giờ mở cửa</h3>
                <hr />
                <ul class="list-info-w3pvt last-w3ls-contact mt-lg-4">
                  <li>
                    <p> Thứ 2 - CN : 08:00 - 18:00</p>
                  </li>
                </ul>
              </div>
            </div>
            <div class="col-lg-3 col-md-6 mt-lg-0 mt-5">
              <div class="footer-w3pvt">
                <h3 class="mb-3 w3pvt_title">Liên hệ</h3>
                <hr />
                <div class="last-w3ls-contact">
                  <p>
                    <a href="mailto:nguyendilinhapple2001@gmail.com">
                      nguyendilinhapple2001@gmail.com
                    </a>
                  </p>
                </div>
                <div class="last-w3ls-contact my-2">
                  <p>+84 395 284 436</p>
                </div>
                <div class="last-w3ls-contact">
                  <p>
                    28M2+J5W, Thôn Lộc Đông, Đông Hòa, Phú Yên
                    <br />
                    Phú Yên, Việt Nam
                  </p>
                </div>
              </div>
            </div>
          </div>

          <p class="copy-right-grids text-li text-center my-sm-4 my-4">
            {`© 2025 Linh Barber Shop. Tất cả quyền được bảo lưu | Thiết kế bởi `}
            <a href="https://www.facebook.com/KhacTam.27">Nguyễn Khắc Tâmm</a>
          </p>
          <div class="w3ls-footer text-center mt-4">
            <ul class="list-unstyled w3ls-icons">
              <li>
                <a href="https://www.facebook.com/nguyendilinh2k1">
                  <span class="fa fa-facebook-f"></span>
                </a>
              </li>
              <li>
                <a href="https://zalo.me/0395284436">
                  <span class="fa fa-phone"></span>
                </a>
              </li>
              <li>
                <a href="#">
                  <span class="fa fa-dribbble"></span>
                </a>
              </li>
              <li>
                <a href="#">
                  <span class="fa fa-vk"></span>
                </a>
              </li>
            </ul>
          </div>
          <div class="move-top text-right">
            <a href="#home" class="move-top">
              {" "}
              <span class="fa fa-angle-up  mb-3" aria-hidden="true"></span>
            </a>
          </div>
        </div>
        {/* <!-- //footer bottom --> */}
      </div>
    </footer>
  );
};

export default Footer;
