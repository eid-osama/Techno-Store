"use strict";

import View from "../View.js";

import wishlistImage from "../../../images/wishlist.png";
import compareImage from "../../../images/compare.png";
import addCartImage from "../../../images/add-cart.png";

class ShopPageView extends View {
  _parentElement = document.querySelector(".products-list .items-container");
  _searchInput = document.querySelector("#search-input");
  _searchBtn = document.querySelector("#search-btn");
  _searchKeyword = document.querySelector("#search-keyword");
  _breadcrumbKeyword = document.querySelector("#breadcrumb-keyword");
  _compareBtn;
  _wishlistBtn;
  _addCartBtn;
  _renderIdCounter = 1;
  _updateIdCounter = 1;
  _currentPage = 1;
  _itemsPerPage = 12;
  _start;
  _end;
  _length;

  renderPage(data, page = 1) {
    this._data = data;
    this._currentPage = page;
    this._start = (page - 1) * this._itemsPerPage;
    this._end = Math.min(this._start + this._itemsPerPage, data.length);
    this._length = data.length;
    const pageData = data.slice(this._start, this._end).reverse();
    this._clear();
    pageData.forEach((item) => this.render(item));
    const markup = `<p>Showing ${this._start + 1}–${this._end} of ${
      this._length
    } results</p>`;
    document.querySelector(".pagination .container .index").innerHTML = "";
    document
      .querySelector(".pagination .container .index")
      .insertAdjacentHTML("afterbegin", markup);
  }

  addHandlerSearch(handler) {
    this.reset();
    this._searchBtn.addEventListener("click", (e) => {
      e.preventDefault();
      const query = this._searchInput.value.trim();
      if (!query) {
        return;
      }
      const fadedSection = document.querySelector("#content");
      fadedSection.classList.add("fade-animation");
      setTimeout(() => {
        this._searchKeyword.textContent = query;
        this._breadcrumbKeyword.textContent = query;
        handler(query);
      }, 50);
      setTimeout(() => fadedSection.classList.remove("fade-animation"), 800);
    });
  }

  _generateMarkup() {
    return `<div class="item"  data-id = "${this._data.id}">
                            <div class="item-slider">
                              <div class="swiper mySwiper">
                                <div class="swiper-wrapper">
                                  <div class="swiper-slide" data-index="1"><img src=${
                                    this._data.img
                                  } alt=""> </div>
                                </div>
                              </div>
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
                            <div class="item-links">
                              <div class="link cart-btn"> <img src="${addCartImage}" alt=""><a href="">Add to Cart</a></div>
                              <ul>
                                <li><a class ="compare-btn"  href=""><img src="${compareImage}" alt="">Compare</a></li>
                                <li><a class ="wishlist-btn" href=""><img src="${wishlistImage}" alt="">Wishlist</a></li>
                              </ul>
                            </div>
                          </div>`;
  }

  addHandlerCompare(handler) {
    this.reset();
    console.log(this._compareBtn);
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

  shopPageMarkup() {
    const markup = `<section class="breadcrumb">
    <div class="container">
      <div class="wrapper">
        <p>Home</p>
        <i class="fa-solid fa-arrow-right"></i>
        <p>Shop</p>
        <i class="fa-solid fa-arrow-right"></i>
        <p id ="breadcrumb-keyword">All</p>
      </div>
    </div>
  </section>
  <section class="products-list">
    <div class="container">
      <div class="category-title">
        <p id ="search-keyword">All Items</p>
      </div>
      <div class="filter-toolbar">
        <div>
          <button class="filter-btn">Filter</button>
        </div>
        <div class="sort-products">

          <div class="custom-arrow">
            <select name="sorting" class="sorting" id="sorting">
              <option value = "" selected hidden>sorting</option>
              <option value="rating">sort by rating</option>
              <option value="price">sort by price</option>
            </select>
          </div>
        </div>
      </div>
      <div class="filter-menu">
        <div class="filter-options">
          <div class="categories-option filter-type">
            <h2>Categories</h2>
            <div class="options">
              <label class="custom-checkbox">
              <input type="checkbox" id="smartphones" name="category-option">
              <span class="checkmark"></span>
              Smartphones
              </label>
              <label class="custom-checkbox">
                <input type="checkbox" id="mobile-accessories" name="category-option">
                <span class="checkmark"></span>
                Mobile Accessories
              </label>
              <label class="custom-checkbox">
                <input type="checkbox" id="headphones" name="category-option">
                <span class="checkmark"></span>
                Headphones
              </label>
              <label class="custom-checkbox">
                <input type="checkbox" id="laptops" name="category-option">
                <span class="checkmark"></span>
                Laptops
              </label>
            </div>
          </div>
          
          <div class="price-option filter-type">
            <h2>Price</h2>
            <p>Price</p>
            <!-- double slider range start -->
            <div class="slider-wrapper">
              <div class="slider-container">
                  <div class="slider-track"></div>
                  <input type="range" min="0" max="2000" value="0" id="slider-1" >
                  <input type="range" min="0" max="2000" value="2000" id="slider-2" >
              </div>
              <div class="slider-values">
                <span id="range1">
                    0
                </span>
                <span> &dash; </span>
                <span id="range2">
                    2000
                </span>
            </div>
          </div>

            <!-- double slider range end -->
          </div>
          <div class="brands-option filter-type">
            <h2>Brands</h2>
            <div class="options">
              <label class="custom-checkbox">
                <input type="checkbox" id="brand-apple" name="brands" value="Apple">
                <span class="checkmark"></span>
                Apple
              </label>
              <label class="custom-checkbox">
                <input type="checkbox" id="brand-samsung" name="brands" value="Samsung">
                <span class="checkmark"></span>
                Samsung
              </label>
              <label class="custom-checkbox">
                <input type="checkbox" id="brand-huawei" name="brands" value="Huawei">
                <span class="checkmark"></span>
                Huawei
              </label>
              <label class="custom-checkbox">
                <input type="checkbox" id="brand-realme" name="brands" value="Realme">
                <span class="checkmark"></span>
                Realme
              </label>
              <label class="custom-checkbox">
                <input type="checkbox" id="brand-beats" name="brands" value="Beats">
                <span class="checkmark"></span>
                Beats
              </label>
              <label class="custom-checkbox">
                <input type="checkbox" id="brand-provision" name="brands" value="ProVision">
                <span class="checkmark"></span>
                ProVision
              </label>
              <label class="custom-checkbox">
                <input type="checkbox" id="brand-amazon" name="brands" value="Amazon">
                <span class="checkmark"></span>
                Amazon
              </label>
              <label class="custom-checkbox">
                <input type="checkbox" id="brand-oppo" name="brands" value="Oppo">
                <span class="checkmark"></span>
                Oppo
              </label>
              <label class="custom-checkbox">
                <input type="checkbox" id="brand-asus" name="brands" value="Asus">
                <span class="checkmark"></span>
                Asus
              </label>
              <label class="custom-checkbox">
                <input type="checkbox" id="brand-vivo" name="brands" value="Vivo">
                <span class="checkmark"></span>
                Vivo
              </label>
              <label class="custom-checkbox">
                <input type="checkbox" id="brand-techgear" name="brands" value="TechGear">
                <span class="checkmark"></span>
                TechGear
              </label>
              <label class="custom-checkbox">
                <input type="checkbox" id="brand-lenovo" name="brands" value="Lenovo">
                <span class="checkmark"></span>
                Lenovo
              </label>
              <label class="custom-checkbox">
                <input type="checkbox" id="brand-dell" name="brands" value="Dell">
                <span class="checkmark"></span>
                Dell
              </label>
              <label class="custom-checkbox">
                <input type="checkbox" id="brand-snaptech" name="brands" value="SnapTech">
                <span class="checkmark"></span>
                SnapTech
              </label>
              <label class="custom-checkbox">
                <input type="checkbox" id="brand-gadgetmaster" name="brands" value="GadgetMaster">
                <span class="checkmark"></span>
                GadgetMaster
              </label>

          </div> 
          </div>
        </div>
        <div>
          <button class="filter-btn">Apply</button>
        </div>
      </div>
      <div class="items-container">
        <!-- item render -->
      </div>
    </div>
  </section>
  <section class="pagination">
    <div class="container">
      <div class="index"></div>
      <div class="pagination-links"></div>
    </div>
  </section>
  `;
    return markup;
  }
  reset() {
    this._parentElement = document.querySelector(
      ".products-list .items-container"
    );
    this._searchInput = document.querySelector("#search-input");
    this._searchBtn = document.querySelector("#search-btn");

    this._searchKeyword = document.querySelector("#search-keyword");
    this._breadcrumbKeyword = document.querySelector("#breadcrumb-keyword");

    this._compareBtn = document.querySelectorAll(".compare-btn");
    this._wishlistBtn = document.querySelectorAll(".wishlist-btn");
    this._addCartBtn = document.querySelectorAll(".cart-btn");
  }
}

export default new ShopPageView();
