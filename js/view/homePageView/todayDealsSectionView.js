import View from "../View.js";

class TodayDealsSectionView extends View {
  _parentElement = document.querySelector(".slide-deals .swiper-wrapper");

  addSlideHandler() {
    new Swiper(".slide-deals .container .mySwiper", {
      spaceBetween: 30,
      centeredSlides: true,
      autoplay: {
        delay: 2000,
        disableOnInteraction: false,
      },
      navigation: {
        nextEl: ".slide-deals .swiper-button-next",
        prevEl: ".slide-deals .swiper-button-prev",
      },
    });
  }

  _generateMarkup() {
    console.log(this._data);
    return `
        <div class="swiper-slide" data-id = "${this._data[0].id}">
                <div class="slide">
                  <div class="timer-side">
                    <div class="left-half-pill">
                      <p>Special Offer</p>
                    </div>
                    <div class="timer">
                      <div class = 'circle' data-time="days">00</div>
                      <div class = 'circle' data-time="hours">00</div>
                      <div class = 'circle' data-time="mins">00</div>
                      <div class = 'circle' data-time="secs">00</div>
                    </div>
                  </div>
                  <div class="product-details" data-save="save $${Math.trunc(
                    this._data[0].price -
                      (this._data[0].price -
                        (this._data[0].price * this._data[0].discount) / 100)
                  )}">
                    <div class="image">
                      <img src=${this._data[0].img} alt=""></div>
                    <div class="product-info">
                      <div class="title">
                        <p>${this._data[0].title}</p>
                      </div>
                      <div class="product-specs">
                        <p>${
                          this._data[0].description
                            .split(" ")
                            .slice(4)
                            .join(" ")
                            .trim()
                            .split(".")[0]
                        }
                          <br>
                          ${
                            this._data[0].description
                              .split(" ")
                              .slice(4)
                              .join(" ")
                              .trim()
                              .split(".")[1]
                          }
                        </p>
                      </div>
                      <div class="price" data-price="$${this._data[0].price}">
                        <p>$${Math.trunc(
                          this._data[0].price -
                            (this._data[0].price * this._data[0].discount) / 100
                        )}</p>
                      </div>
                      <div class="item-links">
                        <div class="link"> <img src="./images/add-cart.png" alt=""><a href="">Add to Cart</a></div>
                          <ul>
                            <li><a href=""><img src="./images/compare.png" alt="">Compare</a></li>
                            <li><a href=""><img src="./images/wishlist.png" alt="">Wishlist</a></li>
                          </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            <div class="swiper-slide" data-id = "${this._data[1].id}">
                <div class="slide">
                  <div class="timer-side">
                    <div class="left-half-pill">
                      <p>Special Offer</p>
                    </div>
                    <div class="timer">
                      <div class = 'circle' data-time="days">00</div>
                      <div class = 'circle' data-time="hours">00</div>
                      <div class = 'circle' data-time="mins">00</div>
                      <div class = 'circle' data-time="secs">00</div>
                    </div>
                  </div>
                  <div class="product-details" data-save="save $${Math.trunc(
                    this._data[1].price -
                      (this._data[1].price -
                        (this._data[1].price * this._data[1].discount) / 100)
                  )}">
                    <div class="image">
                      <img src=${this._data[1].img} alt=""></div>
                    <div class="product-info">
                      <div class="title">
                        <p>${this._data[1].title}</p>
                      </div>
                      <div class="product-specs">
                        <p>${
                          this._data[1].description
                            .split(" ")
                            .slice(4)
                            .join(" ")
                            .trim()
                            .split(".")[0]
                        }
                          <br>
                          ${
                            this._data[1].description
                              .split(" ")
                              .slice(4)
                              .join(" ")
                              .trim()
                              .split(".")[1]
                          }
                        </p>
                      </div>
                      <div class="price" data-price="$${this._data[1].price}">
                        <p>$${Math.trunc(
                          this._data[1].price -
                            (this._data[1].price * this._data[1].discount) / 100
                        )}</p>
                      </div>
                      <div class="item-links">
                        <div class="link"> <img src="./images/add-cart.png" alt=""><a href="">Add to Cart</a></div>
                          <ul>
                            <li><a href=""><img src="./images/compare.png" alt="">Compare</a></li>
                            <li><a href=""><img src="./images/wishlist.png" alt="">Wishlist</a></li>
                          </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            <div class="swiper-slide" data-id = "${this._data[2].id}">
                <div class="slide">
                  <div class="timer-side">
                    <div class="left-half-pill">
                      <p>Special Offer</p>
                    </div>
                    <div class="timer">
                      <div class = 'circle' data-time="days">00</div>
                      <div class = 'circle' data-time="hours">00</div>
                      <div class = 'circle' data-time="mins">00</div>
                      <div class = 'circle' data-time="secs">00</div>
                    </div>
                  </div>
                  <div class="product-details" data-save="save $${Math.trunc(
                    this._data[2].price -
                      (this._data[2].price -
                        (this._data[2].price * this._data[2].discount) / 100)
                  )}">
                    <div class="image">
                      <img src=${this._data[2].img} alt=""></div>
                    <div class="product-info">
                      <div class="title">
                        <p>${this._data[2].title}</p>
                      </div>
                      <div class="product-specs">
                        <p>${
                          this._data[2].description
                            .split(" ")
                            .slice(4)
                            .join(" ")
                            .trim()
                            .split(".")[0]
                        }
                          <br>
                          ${
                            this._data[2].description
                              .split(" ")
                              .slice(4)
                              .join(" ")
                              .trim()
                              .split(".")[1]
                          }
                        </p>
                      </div>
                      <div class="price" data-price="$${this._data[2].price}">
                        <p>$${Math.trunc(
                          this._data[2].price -
                            (this._data[2].price * this._data[2].discount) / 100
                        )}</p>
                      </div>
                      <div class="item-links">
                        <div class="link"> <img src="./images/add-cart.png" alt=""><a href="">Add to Cart</a></div>
                          <ul>
                            <li><a href=""><img src="./images/compare.png" alt="">Compare</a></li>
                            <li><a href=""><img src="./images/wishlist.png" alt="">Wishlist</a></li>
                          </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            <div class="swiper-slide" data-id = "${this._data[3].id}">
                <div class="slide">
                  <div class="timer-side">
                    <div class="left-half-pill">
                      <p>Special Offer</p>
                    </div>
                    <div class="timer">
                      <div class = 'circle' data-time="days">00</div>
                      <div class = 'circle' data-time="hours">00</div>
                      <div class = 'circle' data-time="mins">00</div>
                      <div class = 'circle' data-time="secs">00</div>
                    </div>
                  </div>
                  <div class="product-details" data-save="save $${Math.trunc(
                    this._data[3].price -
                      (this._data[3].price -
                        (this._data[3].price * this._data[3].discount) / 100)
                  )}">
                    <div class="image">
                      <img src=${this._data[3].img} alt=""></div>
                    <div class="product-info">
                      <div class="title">
                        <p>${this._data[3].title}</p>
                      </div>
                      <div class="product-specs">
                        <p>${
                          this._data[3].description
                            .split(" ")
                            .slice(4)
                            .join(" ")
                            .trim()
                            .split(".")[0]
                        }
                          <br>
                          ${
                            this._data[3].description
                              .split(" ")
                              .slice(4)
                              .join(" ")
                              .trim()
                              .split(".")[1]
                          }
                        </p>
                      </div>
                      <div class="price" data-price="$${this._data[3].price}">
                        <p>$${Math.trunc(
                          this._data[3].price -
                            (this._data[3].price * this._data[3].discount) / 100
                        )}</p>
                      </div>
                      <div class="item-links">
                        <div class="link"> <img src="./images/add-cart.png" alt=""><a href="">Add to Cart</a></div>
                          <ul>
                            <li><a href=""><img src="./images/compare.png" alt="">Compare</a></li>
                            <li><a href=""><img src="./images/wishlist.png" alt="">Wishlist</a></li>
                          </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            <div class="swiper-slide" data-id = "${this._data[4].id}">
                <div class="slide">
                  <div class="timer-side">
                    <div class="left-half-pill">
                      <p>Special Offer</p>
                    </div>
                    <div class="timer">
                      <div class = 'circle' data-time="days">00</div>
                      <div class = 'circle' data-time="hours">00</div>
                      <div class = 'circle' data-time="mins">00</div>
                      <div class = 'circle' data-time="secs">00</div>
                    </div>
                  </div>
                  <div class="product-details" data-save="save $${Math.trunc(
                    this._data[4].price -
                      (this._data[4].price -
                        (this._data[4].price * this._data[4].discount) / 100)
                  )}">
                    <div class="image">
                      <img src=${this._data[4].img} alt=""></div>
                    <div class="product-info">
                      <div class="title">
                        <p>${this._data[4].title}</p>
                      </div>
                      <div class="product-specs">
                        <p>${
                          this._data[4].description
                            .split(" ")
                            .slice(4)
                            .join(" ")
                            .trim()
                            .split(".")[0]
                        }
                          <br>
                          ${
                            this._data[4].description
                              .split(" ")
                              .slice(4)
                              .join(" ")
                              .trim()
                              .split(".")[1]
                          }
                        </p>
                      </div>
                      <div class="price" data-price="$${this._data[4].price}">
                        <p>$${Math.trunc(
                          this._data[4].price -
                            (this._data[4].price * this._data[4].discount) / 100
                        )}</p>
                      </div>
                      <div class="item-links">
                        <div class="link"> <img src="./images/add-cart.png" alt=""><a href="">Add to Cart</a></div>
                          <ul>
                            <li><a href=""><img src="./images/compare.png" alt="">Compare</a></li>
                            <li><a href=""><img src="./images/wishlist.png" alt="">Wishlist</a></li>
                          </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
        `;
  }
  reset() {
    this._parentElement = document.querySelector(
      ".slide-deals .swiper-wrapper"
    );
  }
}
export default new TodayDealsSectionView();
