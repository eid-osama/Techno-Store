import View from "../View.js";

class MainSlideSectionView extends View {
  _parentElement = document.querySelector(".main-slide .swiper-wrapper");

  addSlideHandler() {
    new Swiper(".main-slide .container .mySwiper", {
      spaceBetween: 30,
      centeredSlides: true,
      autoplay: {
        delay: 2000,
        disableOnInteraction: false,
      },
      pagination: {
        el: ".main-slide .swiper-pagination", // Unique pagination selector
        clickable: true,
      },
      navigation: {
        nextEl: ".main-slide .swiper-button-next", // Unique navigation selectors
        prevEl: ".main-slide .swiper-button-prev",
      },
    });
  }

  _generateMarkup() {
    return `
        <div class="swiper-slide">
                <div class="slide">
                  <div class="slide-info">
                    <div class="text">
                      <p>Enhanced Technology</p>
                    <h3><span>${
                      this._data[0].title.split(" ")[0] || ""
                    }</span> ${this._data[0].title.split(" ")[1] || ""}</h3>
                    </div>
                    <div class="details">
                      <div class="half-pill" data-price="$${
                        this._data[0].price
                      }"><p>$${Math.trunc(
      this._data[0].price - (this._data[0].price * this._data[0].discount) / 100
    )}</p></div>
                      
                    </div>
                  </div>
                  <div class="slide-img">
                    <div class="image">
                      <span class="percentage">${Math.trunc(
                        this._data[0].discount
                      )} %</span> <span class="sale-text">Sale</span>
                      <div class ="img-container">
                      <img src=${this._data[0].img} alt="">
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div class="swiper-slide">
                <div class="slide">
                  <div class="slide-info">
                    <div class="text">
                      <p>Enhanced Technology</p>
                    <h3><span>${
                      this._data[1].title.split(" ")[0] || ""
                    }</span> ${this._data[1].title.split(" ")[1] || ""}</h3>
                    </div>
                    <div class="details">
                      <div class="half-pill" data-price="$${
                        this._data[1].price
                      }"><p>$${Math.trunc(
      this._data[1].price - (this._data[1].price * this._data[1].discount) / 100
    )}</p></div>
                      
                    </div>
                  </div>
                  <div class="slide-img">
                    <div class="image">
                      <span class="percentage">${Math.trunc(
                        this._data[1].discount
                      )} %</span> <span class="sale-text">Sale</span>
                      <div class ="img-container">
                      <img src=${this._data[1].img} alt="">
                    </div>
                    </div>
                  </div>
                </div>
              </div>

              <div class="swiper-slide">
                <div class="slide">
                  <div class="slide-info">
                    <div class="text">
                      <p>Enhanced Technology</p>
                    <h3><span>${
                      this._data[2].title.split(" ")[0] || ""
                    }</span> ${this._data[2].title.split(" ")[1] || ""}</h3>
                    </div>
                    <div class="details">
                      <div class="half-pill" data-price="$${
                        this._data[2].price
                      }"><p>$${Math.trunc(
      this._data[2].price - (this._data[2].price * this._data[2].discount) / 100
    )}</p></div>
                      
                    </div>
                  </div>
                  <div class="slide-img">
                    <div class="image">
                      <span class="percentage">${Math.trunc(
                        this._data[2].discount
                      )} %</span> <span class="sale-text">Sale</span>
                      <div class ="img-container">
                      <img src=${this._data[2].img} alt="">
                    </div>
                    </div>
                  </div>
                </div>
              </div>

              <div class="swiper-slide">
                <div class="slide">
                  <div class="slide-info">
                    <div class="text">
                      <p>Enhanced Technology</p>
                    <h3><span>${
                      this._data[3].title.split(" ")[0] || ""
                    }</span> ${this._data[3].title.split(" ")[1] || ""}</h3>
                    </div>
                    <div class="details">
                      <div class="half-pill" data-price="$${
                        this._data[3].price
                      }"><p>$${Math.trunc(
      this._data[3].price - (this._data[3].price * this._data[3].discount) / 100
    )}</p></div>
                      
                    </div>
                  </div>
                  <div class="slide-img">
                    <div class="image">
                      <span class="percentage">${Math.trunc(
                        this._data[3].discount
                      )} %</span> <span class="sale-text">Sale</span>
                      <div class ="img-container">
                      <img src=${this._data[3].img} alt="">
                    </div>
                    </div>
                  </div>
                </div>
              </div>

              <div class="swiper-slide">
                <div class="slide">
                  <div class="slide-info">
                    <div class="text">
                      <p>Enhanced Technology</p>
                    <h3><span>${
                      this._data[4].title.split(" ")[0] || ""
                    }</span> ${this._data[4].title.split(" ")[1] || ""}</h3>
                    </div>
                    <div class="details">
                      <div class="half-pill" data-price="$${
                        this._data[4].price
                      }"><p>$${Math.trunc(
      this._data[4].price - (this._data[4].price * this._data[4].discount) / 100
    )}</p></div>
                      
                    </div>
                  </div>
                  <div class="slide-img">
                    <div class="image">
                      <span class="percentage">${Math.trunc(
                        this._data[4].discount
                      )} %</span> <span class="sale-text">Sale</span>
                      <div class ="img-container">
                      <img src=${this._data[4].img} alt="">
                    </div>
                    </div>
                  </div>
                </div>
              </div>
        `;
  }
  reset() {
    this._parentElement = document.querySelector(".main-slide .swiper-wrapper");
  }
}
export default new MainSlideSectionView();
