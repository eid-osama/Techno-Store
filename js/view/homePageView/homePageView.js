"use strict";

import View from "../View.js";

import returnImage from "../../../images/return.png";
import paymentImage from "../../../images/payment.png";
import orderImage from "../../../images/order.png";
import carImage from "../../../images/car.png";
import wishlistImage from "../../../images/wishlist.png";
import compareImage from "../../../images/compare.png";
import addCartImage from "../../../images/add-cart.png";

import arrowRightImage from "../../../images/right-2.png";

class HomePageView extends View {
  _searchBtn;
  _compareBtn;
  _wishlistBtn;
  _addCartBtn;

  addHandlerSearch() {
    this.reset();
    this._searchBtn.addEventListener("click", (e) => {
      e.preventDefault();
      if (window.location.pathname === "/shop") return;
      const navigateEvent = new CustomEvent("navigate", {
        detail: { href: "/shop" },
      });
      const fadedSection = document.querySelector("#content");
      fadedSection.classList.add("fade-animation");
      setTimeout(() => {
        document.dispatchEvent(navigateEvent);
      }, 50);
    });
  }

  addHandlerCompare(handler) {
    this.reset();
    this._compareBtn.forEach((btn) => {
      btn.addEventListener("click", (e) => {
        e.preventDefault();
        const productCard = e.target.closest(".item");
        handler(productCard.dataset.id);
      });
    });
  }

  addHandlerWishlist(handler) {
    this.reset();
    this._wishlistBtn.forEach((btn) => {
      btn.addEventListener("click", (e) => {
        e.preventDefault();
        const productCard = e.target.closest(".item");
        handler(productCard.dataset.id);
      });
    });
  }

  addHandlerCart(handler) {
    this.reset();
    this._addCartBtn.forEach((btn) => {
      btn.addEventListener("click", (e) => {
        e.preventDefault();
        const productCard = e.target.closest(".item");
        handler(productCard.dataset.id);
      });
    });
  }
  todaydealSmoothScrolling() {
    const todaydealsBtn = document.querySelector(".today-deals");

    const gotoSection = document.querySelector(".slide-deals");
    todaydealsBtn.addEventListener("click", (e) => {
      e.preventDefault();
      gotoSection.scrollIntoView({ behavior: "smooth" });
    });
  }

  homePageMarkup() {
    const markup = `
    <section class="main-slide">
        <div class="container">
          <div class="swiper mySwiper">
            <div class="swiper-wrapper">
            </div>
            <div class="swiper-pagination"></div>

            
          </div>
        </div>
      </section>
      <section class="features-section">
        <div class="container">
          <div class="wrapper">
            <div class="card1">
              <img src="${dealImage1}" alt="">
            </div>
            <div class="card2">
              <img src="${dealImage2}" alt="">
            </div>
            <div class="tall-card">
              <img src="${dealImage3}" alt="">
            </div>
            <div class="fat-card">
              <img src="${dealImage4}" alt="">
            </div>
          </div>
          <div class="best-items">
            <div class="small-nav">
              <ul class="tabs">
                <li class="tab-active"><button class="tab" id="new">New Arrivals</button></li>
                <li><button class="tab" id="feature">Featured</button></li>
                <li><button class="tab" id="top">Top Selling</button></li>
              </ul>
            </div>
            <div class="items-container">
              
              <!-- item render -->
            </div>
          </div>
        </div>
      </section>
      <section class="category-tabs">
        <div class="container">
          <div class="best-items">
            <div class="small-nav">
              <ul class="tabs">
                <li class="tab-active"><button class="tab" id="smartphones">Smartphones</button></li>
                <li><button class="tab" id="accessories">Accessories</button></li>
                <li><button class="tab" id="laptops">Laptops</button></li>
              </ul>
            </div>
          </div>
          <div class="items-wrapper grid-1">
            <!-- item rendered -->
          </div>
        </div>
      </section>
      <section class="slide-deals">
        <div class="container">
          <div class="swiper mySwiper">
            <div class="swiper-wrapper">
              <div class="swiper-slide">
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
                  <div class="product-details">
                    <div class="image">
                      <img src="${testImage}" alt=""></div>
                    <div class="product-info">
                      <div class="title">
                        <p>27-inch iMac with Retina 5K display</p>
                      </div>
                      <div class="product-specs">
                        <p>3.3GHz quad-core Intel Core i5 processor 
                          <br>
                          Turbo Boost up to 3.9GHz
                          <br>
                          8GB (two 4GB) memory, configurable up to 32GB
                          <br>
                          2TB Fusion Drive1
                          <br>
                          AMD Radeon R9 M395 with 2GB video memory 
                          <br>
                          Retina 5K 5120-by-2880 P3 display
                        </p>
                      </div>
                      <div class="price" data-price="$2,999.00">
                        <p>$2,500.00</p>
                        <p>$2,500.00</p>
                      </div>
                      <div class="item-links">
                        <div class="link"> <img src="${addCartImage}" alt=""><a href="">Add to Cart</a></div>
                          <ul>
                            <li><a href=""><img src="${compareImage}" alt="">Compare</a></li>
                            <li><a href=""><img src="${wishlistImage}" alt="">Wishlist</a></li>
                          </ul>
                      </div>
                    </div>
                  </div>
                </div>
                
              </div>
              <div class="swiper-slide">
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
                  <div class="product-details">
                    <div class="image">
                      <img src="${testImage}" alt=""></div>
                    <div class="product-info">
                      <div class="title">
                        <p>27-inch iMac with Retina 5K display</p>
                      </div>
                      <div class="product-specs">
                        <p>3.3GHz quad-core Intel Core i5 processor 
                          <br>
                          Turbo Boost up to 3.9GHz
                          <br>
                          8GB (two 4GB) memory, configurable up to 32GB
                          <br>
                          2TB Fusion Drive1
                          <br>
                          AMD Radeon R9 M395 with 2GB video memory 
                          <br>
                          Retina 5K 5120-by-2880 P3 display
                        </p>
                      </div>
                      <div class="price" data-price="$2,999.00">
                        <p>$2,500.00</p>
                        <p>$2,500.00</p>
                      </div>
                      <div class="item-links">
                        <div class="link"> <img src="${addCartImage}" alt=""><a href="">Add to Cart</a></div>
                          <ul>
                            <li><a href=""><img src="${compareImage}" alt="">Compare</a></li>
                            <li><a href=""><img src="${wishlistImage}" alt="">Wishlist</a></li>
                          </ul>
                      </div>
                    </div>
                  </div>
                </div>
                
              </div>
            </div>
            <div class="swiper-button-next"></div>
            <div class="swiper-button-prev"></div>
          </div>
        </div>
      </section>
      <section class="most-viewed">
        <div class="container">
          <div class="best-items">
            <div class="small-nav">
              <ul class="tabs">
                <li ><p>Most Viewed</p></li>
              </ul>
            </div>
          </div>
            <div class="swiper mySwiper">
              <div class="swiper-wrapper">

                  <!-- item rendered -->
                
              </div>
              <div class="swiper-button-next"></div>
              <div class="swiper-button-prev"></div>
            </div>
        </div>
      </section>
      <section class="services">
        <div class="container">
          <div class="service-wrapper">
            <div class="service-block">
              <div class="button">
                <a>
                  <img src="${carImage}" alt="" />
                </a>
              </div>
              <div class="service-details">
                <p>Worldwide Shipping</p>
                <p>Free Shipping On Order Over $100</p>
              </div>
            </div>
            <div class="service-block">
              <div class="button">
                <a>
                  <img src="${orderImage}" alt="" />
                </a>
              </div>
              <div class="service-details">
                <p>Order Online Service</p>
                <p>Free return products in 30 days</p>
              </div>
            </div>
            <div class="service-block">
              <div class="button">
                <a>
                  <img src="${paymentImage}" alt="" />
                </a>
              </div>
              <div class="service-details">
                <p>Payment</p>
                <p>Secure System</p>
              </div>
            </div>
            <div class="service-block">
              <div class="button">
                <a>
                  <img src="${returnImage}" alt="" />
                </a>
              </div>
              <div class="service-details">
                <p>Return 30 Days</p>
                <p>Free return products in 30 days</p>
              </div>
            </div>
          </div>
        </div>
      </section>
      <script  type="module" src="./js/swipper.js" data-route="./js/swipper.js"></script>
    <script  type="module" src="./js/controller.js" data-route="./js/controller.js"></script>
    `;
    return markup;
    // this.render(this.tabsParentElement, markup);
  }
  reset() {
    this._searchBtn = document.querySelector("#search-btn");
    this._compareBtn = document.querySelectorAll(".compare-btn");
    this._wishlistBtn = document.querySelectorAll(".wishlist-btn");
    this._addCartBtn = document.querySelectorAll(".cart-btn");
  }
}

export default new HomePageView();
