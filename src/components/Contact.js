import React, { Component } from "react";
import { Link } from "react-router-dom";
class Contact extends Component {
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
              Liên hệ
            </li>
          </ol>
        </div>
        <section class="content-info py-5">
          <div class="container py-md-5">
            <div class="text-center px-lg-5">
              <h3 class="heading text-center mb-3 mb-sm-5">Liên hệ</h3>
              <div class="title-desc text-center px-lg-5">
                <p class="px-lg-5 sub-wthree">
                  Chúng tôi luôn sẵn sàng lắng nghe và hỗ trợ khách hàng. Hãy
                  liên hệ với chúng tôi để được tư vấn và đặt lịch hẹn. Chúng
                  tôi cam kết mang đến cho bạn những dịch vụ tốt nhất.
                </p>
              </div>
            </div>
            <div class="contact-w3pvt-form mt-5">
              <form action="#" class="w3layouts-contact-fm" method="post">
                <div class="row">
                  <div class="col-lg-6">
                    <div class="form-group">
                      <label>Họ và tên</label>
                      <input
                        class="form-control"
                        type="text"
                        name="Name"
                        placeholder="Ví dụ: Nguyễn Văn A"
                        required=""
                      />
                    </div>
                    <div class="form-group">
                      <label>Email</label>
                      <input
                        class="form-control"
                        type="email"
                        name="Email"
                        placeholder="Email của bạn tại đây"
                        required=""
                      />
                    </div>
                    <div class="form-group">
                      <label>Số điện thoại</label>
                      <input
                        class="form-control"
                        type="text"
                        name="Phone"
                        placeholder="Ví dụ: +84 395 384 636"
                        required=""
                      />
                    </div>
                  </div>
                  <div class="col-lg-6">
                    <div class="form-group">
                      <label>Nội dung</label>
                      <textarea
                        class="form-control"
                        name="Message"
                        placeholder="Nội dung của bạn tại đây"
                        required=""
                      ></textarea>
                    </div>
                  </div>
                  <div class="form-group mx-auto mt-3">
                    <button type="submit" class="btn submit">
                      Gửi
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </section>

        <div class="map-w3layouts">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d3887.038551915037!2d109.2997014!3d13.033217!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x316fef002824d5a3%3A0xead8ae1cac5c93c2!2sLinh%20Barber%20Housee!5e0!3m2!1svi!2s!4v1760759509755!5m2!1svi!2s"
            width="600"
            height="450"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>
      </div>
    );
  }
}
export default Contact;
