"use strict";

import View from "../View.js";

class MostviewedSectionView extends View {
  _parentElement = document.querySelector(".most-viewed .swiper-wrapper");

  _generateMarkup() {
    const swiper3 = new Swiper(".most-viewed .container .mySwiper", {
      slidesPerView: 5,
      centeredSlides: false,
      spaceBetween: 30,
      loop: true,
      navigation: {
        nextEl: ".most-viewed .swiper-button-next",
        prevEl: ".most-viewed .swiper-button-prev",
      },
      breakpoints: {
        1200: {
          // For screens 1200px and above
          slidesPerView: 5,
        },
        992: {
          // For screens 992px to 1200px
          slidesPerView: 4,
        },
        768: {
          // For screens 768px to 992px
          slidesPerView: 4,
        },

        568: {
          slidesPerView: 3,
        },
        0: {
          // For screens below 768px
          slidesPerView: 2,
        },
      },
    });
    return `<div class="swiper-slide">
                <div class="item" data-id = "${this._data.id}">
                  <div class ="img-card">
                    <img src="${this._data.img}" alt="">
                  </div>
                  <div class="category-name">
                    <p>${this._data.cat}</p>
                  </div>
                  <div class="item-details">
                    <div class="item-name"><a href="">${
                      this._data.title
                    }</a></div>
                    <div class="price" data-price="$${
                      this._data.price
                    }"><p>$${Math.trunc(
      this._data.price - (this._data.price * this._data.discount) / 100
    )}</p></div>
                  </div>
                </div>
              </div>`;
  }
  reset() {
    this._parentElement = document.querySelector(
      ".most-viewed .swiper-wrapper"
    );
  }
}

export default new MostviewedSectionView();
