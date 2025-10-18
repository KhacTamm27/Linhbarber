import React from "react";

import { Link } from "react-router-dom";

const About = () => {
  return (
    <div>
      {/* <!-- banner --> */}
      <section class="inner-page-banner" id="home"></section>
      {/* <!-- //banner -->
<!-- page details --> */}
      <div class="breadcrumb-agile">
        <ol class="breadcrumb mb-0">
          <li class="breadcrumb-item">
            <Link to="/">Trang chủ</Link>
          </li>
          <li class="breadcrumb-item active" aria-current="page">
            Giới thiệu
          </li>
        </ol>
      </div>
      {/* <!-- //page details -->
	<!--about-mid --> */}
      <section class="banner-bottom py-5" id="exp">
        <div class="container py-md-5">
          <h3 class="heading text-center mb-3 mb-sm-5">Tìm hiểu thêm</h3>
          <div class="row mid-grids mt-lg-5 mt-3">
            <div class="col-md-5 content-w3pvt-img">
              <img src="assets/images/ab1.jpg" alt="" class="img-fluid" />
            </div>
            <div class="col-md-7 content-left-bottom entry-w3ls-info text-left mt-3">
              <h5 class="mt-1">TẠO KIỂU TÓC CỔ ĐIỂN</h5>
              <h4>
                đàn ông thật đến
                <br />
                salon tóc nam thật
              </h4>
              <p class="mt-2 text-left">
                Chúng tôi chuyên về các kiểu tóc cổ điển và hiện đại cho nam
                giới. Với đội ngũ thợ cắt tóc chuyên nghiệp và kinh nghiệm lâu
                năm, chúng tôi cam kết mang đến cho khách hàng những dịch vụ tốt
                nhất. Chúng tôi sử dụng các sản phẩm chất lượng cao và kỹ thuật
                cắt tóc tiên tiến để đảm bảo khách hàng có được kiểu tóc hoàn
                hảo nhất.
              </p>
            </div>
          </div>
          <div class="row mid-grids mt-lg-5 mt-3 py-3">
            <div class="col-md-7 content-left-bottom entry-w3ls-info text-left mt-3">
              <h5 class="mt-1">TẠO KIỂU RÂU CỔ ĐIỂN</h5>
              <h4>
                khám phá kiểu râu
                <br />
                hot nhất
              </h4>
              <p class="mt-2 text-left">
                Chúng tôi cũng chuyên về các kiểu râu và ria mép cho nam giới.
                Từ kiểu râu cổ điển đến hiện đại, chúng tôi có thể tạo ra bất kỳ
                kiểu nào mà khách hàng mong muốn. Với kỹ thuật cắt tỉa chuyên
                nghiệp và sản phẩm chăm sóc râu chất lượng cao, chúng tôi đảm
                bảo khách hàng có được bộ râu hoàn hảo và phù hợp với khuôn mặt.
              </p>
            </div>
            <div class="col-md-5 content-w3pvt-img mt-lg-0 mt-3">
              <img src="assets/images/ab2.jpg" alt="" class="img-fluid" />
            </div>
          </div>
        </div>
      </section>
      {/* <!-- //about-mid -->
<!-- states --> */}
      <section class="stats-count">
        <div class="overlay py-5">
          <div class="container py-md-5">
            <div class="row text-center">
              <div class="col-lg-3 col-md-3 col-sm-3 col-6 my-3 number-wthree-info">
                <h5>5+</h5>
                <h6 class="pt-2">Năm kinh nghiệm</h6>
              </div>
              <div class="col-lg-3 col-md-3 col-sm-3 col-6 my-3 number-wthree-info ">
                <h5>100+</h5>
                <h6 class="pt-2">Khách hàng</h6>
              </div>
              <div class="col-lg-3 col-md-3 col-sm-3 col-6 my-3 number-wthree-info">
                <h5>50+</h5>
                <h6 class="pt-2">Kiểu tóc</h6>
              </div>
              <div class="col-lg-3 col-md-3 col-sm-3 col-6 my-3 number-wthree-info">
                <h5>90%</h5>
                <h6 class="pt-2">Khách đánh giá 5★</h6>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* <!--//states -->

 <!--//team --> */}
      <section class="banner-bottom  py-5">
        <div class="container py-md-5">
          <h3 class="heading text-center mb-3 mb-sm-5">
            Đội ngũ của chúng tôi
          </h3>
          <div class="row mt-lg-5 mt-4">
            <div class="col-md-4 team-gd text-center">
              <div class="team-img mb-4">
                <img
                  src="assets/images/t1.jpg"
                  class="img-fluid"
                  alt="user-image"
                />
              </div>
              <div class="team-info">
                <h3 class="mt-md-4 mt-3">JAMES - Thợ cắt tóc chính</h3>
                <p>
                  Với hơn 10 năm kinh nghiệm trong ngành, James là một trong
                  những thợ cắt tóc giỏi nhất của chúng tôi.
                </p>
                <ul class="list-unstyled team-icons mt-4">
                  <li>
                    <a href="#" class="t-icon">
                      <span class="fa fa-facebook-f"></span>
                    </a>
                  </li>
                  <li>
                    <a href="#" class="t-icon">
                      <span class="fa fa-twitter"></span>
                    </a>
                  </li>
                  <li>
                    <a href="#" class="t-icon">
                      <span class="fa fa-dribbble"></span>
                    </a>
                  </li>
                </ul>
              </div>
            </div>

            <div class="col-md-4 team-gd second text-center my-md-0 my-5">
              <div class="team-img mb-4">
                <img
                  src="assets/images/t2.jpg"
                  class="img-fluid"
                  alt="user-image"
                />
              </div>
              <div class="team-info">
                <h3 class="mt-md-4 mt-3">DEEN - Chuyên gia râu</h3>
                <p>
                  Chuyên gia về các kiểu râu và ria mép, Deen có thể tạo ra bất
                  kỳ kiểu râu nào mà khách hàng mong muốn.
                </p>
                <ul class="list-unstyled team-icons mt-4">
                  <li>
                    <a href="#" class="t-icon">
                      <span class="fa fa-facebook-f"></span>
                    </a>
                  </li>
                  <li>
                    <a href="#" class="t-icon">
                      <span class="fa fa-twitter"></span>
                    </a>
                  </li>
                  <li>
                    <a href="#" class="t-icon">
                      <span class="fa fa-dribbble"></span>
                    </a>
                  </li>
                </ul>
              </div>
            </div>
            <div class="col-md-4 team-gd text-center">
              <div class="team-img mb-4">
                <img
                  src="assets/images/t3.jpg"
                  class="img-fluid"
                  alt="user-image"
                />
              </div>
              <div class="team-info">
                <h3 class="mt-md-4 mt-3">CLINT - Thợ cắt tóc cao cấp</h3>
                <p>
                  Chuyên gia về các kiểu tóc hiện đại và xu hướng, Clint luôn
                  cập nhật những kiểu tóc mới nhất.
                </p>
                <ul class="list-unstyled team-icons mt-4">
                  <li>
                    <a href="#" class="t-icon">
                      <span class="fa fa-facebook-f"></span>
                    </a>
                  </li>
                  <li>
                    <a href="#" class="t-icon">
                      <span class="fa fa-twitter"></span>
                    </a>
                  </li>
                  <li>
                    <a href="#" class="t-icon">
                      <span class="fa fa-dribbble"></span>
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
