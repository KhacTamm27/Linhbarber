import React, { Component } from "react";
import { Link } from "react-router-dom";
class Single extends Component {
  render() {
    return (
      <div>
        <section class="inner-page-banner" id="home"></section>
        <div class="breadcrumb-agile">
          <ol class="breadcrumb mb-0">
            <li class="breadcrumb-item">
              <Link to="/">Trang chủ</Link>
            </li>
            <li class="breadcrumb-item active" aria-current="page">
              Chi tiết
            </li>
          </ol>
        </div>
        <section class="banner-bottom py-5">
          <div class="container py-md-5">
            <h3 class="heading text-center mb-3 mb-sm-5">Thông tin salon</h3>
            <div class="single-w3pvt-page mt-md-5 mt-4 px-lg-5">
              <div class="content-sing-w3ls px-lg-5">
                <img class="img-fluid" src="assets/images/ban3.jpg" alt="" />
                <h4>Salon tóc nam chuyên nghiệp</h4>
                <p>
                  Chúng tôi là salon tóc nam chuyên nghiệp với nhiều năm kinh
                  nghiệm trong ngành. Chúng tôi cam kết mang đến cho khách hàng
                  những dịch vụ chăm sóc tóc chất lượng cao nhất. Với đội ngũ
                  thợ cắt tóc chuyên nghiệp và trang thiết bị hiện đại, chúng
                  tôi tự tin mang đến cho bạn những trải nghiệm tuyệt vời nhất.
                </p>
                <p class="mt-3">
                  Chúng tôi sử dụng các sản phẩm chất lượng cao và kỹ thuật cắt
                  tóc tiên tiến để đảm bảo khách hàng có được kiểu tóc hoàn hảo
                  nhất. Từ kiểu tóc cổ điển đến hiện đại, chúng tôi có thể tạo
                  ra bất kỳ kiểu nào mà khách hàng mong muốn.
                </p>
                <ul class="w3ls_social_list list-unstyled mt-4">
                  <li class="lead">Theo dõi chúng tôi trên mạng xã hội :</li>
                  <li>
                    <a
                      href="#"
                      class="w3pvt_facebook"
                      target="_blank"
                      style={{ marginRight: "10px", marginLeft: "10px" }}
                    >
                      <span class="fa fa-facebook-f"></span>
                    </a>
                  </li>
                  <li>
                    <a href="#" class="w3pvt_dribble" target="_blank">
                      <span class="fa fa-dribbble"></span>
                    </a>
                  </li>
                </ul>
              </div>
              <div class="row my-lg-5 mt-3 mx-0">
                <div class="col-lg-6 text-info pl-0">
                  <p>
                    Chúng tôi cung cấp các dịch vụ chăm sóc tóc và râu chuyên
                    nghiệp với đội ngũ thợ cắt tóc có kinh nghiệm lâu năm. Từ
                    cắt tóc, cạo râu đến nhuộm tóc, chúng tôi đảm bảo mang đến
                    cho khách hàng những trải nghiệm tốt nhất. Với không gian
                    thoải mái và trang thiết bị hiện đại, chúng tôi tự tin là
                    lựa chọn hàng đầu cho nam giới.
                  </p>
                </div>
                <div class="col-lg-6 mt-3 team-img">
                  <div class="row">
                    <div class="col-6">
                      <img
                        src="assets/images/s1.jpg"
                        class="img-fluid"
                        alt="user-image"
                      />
                    </div>
                    <div class="col-6">
                      <img
                        src="assets/images/s2.jpg"
                        class="img-fluid"
                        alt="user-image"
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div class="comment-sec-w3ls">
                <h4 class="leave-w3ls mb-5">3 Bình luận</h4>
                <ul class="list-unstyled">
                  <li class="media">
                    <img
                      class="mr-3 img-fluid"
                      src="assets/images/sb1.jpg"
                      alt=""
                    />

                    <div class="media-body">
                      <h5 class="mt-0 mb-1">Khắc Tâm</h5>
                      <p class="mt-3">
                        Dịch vụ cắt tóc ở đây thật tuyệt vời! Thợ cắt tóc rất
                        chuyên nghiệp và tận tâm. Tôi rất hài lòng với kết quả
                        và sẽ quay lại lần nữa.
                      </p>
                    </div>
                  </li>
                  <li class="media my-5 ml-3">
                    <img
                      class="mr-3 img-fluid"
                      src="assets/images/sb2.jpg"
                      alt=""
                    />
                    <div class="media-body">
                      <h5 class="mt-0 mb-1">Văn Đức</h5>
                      <p class="mt-3">
                        Salon này có không gian rất đẹp và thoải mái. Nhân viên
                        phục vụ rất nhiệt tình và chuyên nghiệp. Tôi rất hài
                        lòng với dịch vụ.
                      </p>
                    </div>
                  </li>
                  <li class="media ml-5">
                    <img
                      class="mr-3 img-fluid"
                      src="assets/images/sb3.jpg"
                      alt=""
                    />
                    <div class="media-body">
                      <h5 class="mt-0 mb-1">Trung Nguyễn</h5>
                      <p class="mt-3">
                        Kiểu tóc mà tôi được cắt ở đây thật hoàn hảo! Tôi sẽ
                        quay lại lần nữa và giới thiệu cho bạn bè. Chất lượng
                        dịch vụ rất tốt.
                      </p>
                    </div>
                  </li>
                </ul>
              </div>
              <div class="comment-bottom w3pvt_mail_grid_right p-0 my-lg-5 my-4">
                <h4 class="leave-w3ls mb-5">Để lại bình luận</h4>
                <form action="#" class="w3ls-contact-fm" method="post">
                  <div class="form-group">
                    <label>Viết tin nhắn</label>
                    <textarea
                      class="form-control"
                      name="Message"
                      placeholder=""
                      required=""
                    ></textarea>
                  </div>
                  <div class="row leave-comment">
                    <div class="col-lg-6 form-group">
                      <label>Tên</label>
                      <input
                        class="form-control"
                        type="text"
                        name="Name"
                        placeholder=""
                        required=""
                      />
                    </div>
                    <div class="col-lg-6 form-group">
                      <label>Email</label>
                      <input
                        class="form-control"
                        type="email"
                        name="Email"
                        placeholder=""
                        required=""
                      />
                    </div>
                  </div>

                  <button type="submit" class="btn read mt-3">
                    Gửi
                  </button>
                </form>
              </div>
            </div>
          </div>
        </section>
      </div>
    );
  }
}
export default Single;
