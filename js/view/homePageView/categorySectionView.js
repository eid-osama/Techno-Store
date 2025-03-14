"use strict";

import View from "../View.js";

import wishlistImage from "../../../images/wishlist.png";
import compareImage from "../../../images/compare.png";
import addCartImage from "../../../images/add-cart.png";

class CategorySectionView extends View {
  _parentElement = document.querySelector(".category-tabs .items-wrapper");

  update(data) {
    this._data = data;
    const newMarkup = this._generateMarkup();

    const newDOM = document.createRange().createContextualFragment(newMarkup);
    const newElements = Array.from(
      newDOM.querySelectorAll(".product-card, .product-small-card")
    ).flatMap((card) => Array.from(card.querySelectorAll("*")));

    const curElements = Array.from(
      document.querySelectorAll(".product-card, .product-small-card")
    ).flatMap((card) => Array.from(card.querySelectorAll("*")));
    newElements.forEach((newEl, i) => {
      const curEl = curElements[i];
      if (
        !newEl.isEqualNode(curEl) &&
        newEl.firstChild &&
        newEl.firstChild.nodeType === Node.TEXT_NODE &&
        newEl.firstChild.nodeValue?.trim() !== ""
      ) {
        if (curEl.firstChild && curEl.firstChild.nodeType === Node.TEXT_NODE) {
          curEl.firstChild.nodeValue = newEl.firstChild.nodeValue;
        }
      }
      if (!newEl.isEqualNode(curEl)) {
        Array.from(newEl.attributes).forEach((attr) =>
          curEl.setAttribute(attr.name, attr.value)
        );
      }
    });
  }

  _generateMarkup() {
    return `<div class="product-card big">
                <div class="item big-item" data-id = "${this._data[0].id}">
                  <img src=${this._data[0].img} alt="">
                  <div class = "wrapper">
                      <div class="category-name">
                      <p>${this._data[0].cat}</p>
                    </div>
                    <div class="item-details">
                      <div class="item-name"><a href="">${
                        this._data[0].title
                      }</a></div>
                      <div class="price" data-price="$${
                        this._data[0].price
                      }"><p>$${Math.trunc(
      this._data[0].price - (this._data[0].price * this._data[0].discount) / 100
    )}</p></div>
                    </div>
                    <div class="item-links">
                      <div class="link cart-btn"> <img src="${addCartImage}" alt=""><a href="">Add to Cart</a></div>
                      <ul>
                        <li><a class ="compare-btn"  href=""><img src="${compareImage}" alt="">Compare</a></li>
                        <li><a class ="wishlist-btn" href=""><img src="${wishlistImage}" alt="">Wishlist</a></li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
              <div class="product-small-card small1">
                  <div class="item" data-id = "${this._data[1].id}">
                    <div class="img-card">
                        <img src=${this._data[1].img} alt="">
                    </div>
                    <div class="category-name">
                      <p>${this._data[1].cat}</p>
                    </div>
                    <div class="item-details">
                      <div class="item-name"><a href="">${
                        this._data[1].title
                      }</a></div>
                      <div class="price" data-price="$${
                        this._data[1].price
                      }"><p>$${Math.trunc(
      this._data[1].price - (this._data[1].price * this._data[1].discount) / 100
    )}</p></div>
                    </div>
                    <div class="item-links">
                      <div class="link cart-btn"> <img src="${addCartImage}" alt=""><a href="">Add to Cart</a></div>
                      <ul>
                        <li><a class ="compare-btn"  href=""><img src="${compareImage}" alt="">Compare</a></li>
                        <li><a class ="wishlist-btn" href=""><img src="${wishlistImage}" alt="">Wishlist</a></li>
                      </ul>
                    </div>
                  </div>
                <div class="item" data-id = "${this._data[2].id}">
                    <div class="img-card">
                        <img src=${this._data[2].img} alt="">
                    </div>
                    <div class="category-name">
                      <p>${this._data[2].cat}</p>
                    </div>
                    <div class="item-details">
                      <div class="item-name"><a href="">${
                        this._data[2].title
                      }</a></div>
                      <div class="price" data-price="$${
                        this._data[2].price
                      }"><p>$${Math.trunc(
      this._data[2].price - (this._data[2].price * this._data[2].discount) / 100
    )}</p></div>
                    </div>
                    <div class="item-links">
                      <div class="link cart-btn"> <img src="${addCartImage}" alt=""><a href="">Add to Cart</a></div>
                      <ul>
                        <li><a class ="compare-btn"  href=""><img src="${compareImage}" alt="">Compare</a></li>
                        <li><a class ="wishlist-btn" href=""><img src="${wishlistImage}" alt="">Wishlist</a></li>
                      </ul>
                    </div>
                  </div>
              </div>
              <div class="product-small-card small2">
                <div class="item" data-id = "${this._data[3].id}">
                    <div class="img-card">
                        <img src=${this._data[3].img} alt="">
                    </div>
                    <div class="category-name">
                      <p>${this._data[3].cat}</p>
                    </div>
                    <div class="item-details">
                      <div class="item-name"><a href="">${
                        this._data[3].title
                      }</a></div>
                      <div class="price" data-price="$${
                        this._data[3].price
                      }"><p>$${Math.trunc(
      this._data[3].price - (this._data[3].price * this._data[3].discount) / 100
    )}</p></div>
                    </div>
                    <div class="item-links">
                      <div class="link cart-btn"> <img src="${addCartImage}" alt=""><a href="">Add to Cart</a></div>
                      <ul>
                        <li><a class ="compare-btn"  href=""><img src="${compareImage}" alt="">Compare</a></li>
                        <li><a class ="wishlist-btn" href=""><img src="${wishlistImage}" alt="">Wishlist</a></li>
                      </ul>
                    </div>
                  </div>
                <div class="item" data-id = "${this._data[4].id}">
                    <div class="img-card">
                        <img src=${this._data[4].img} alt="">
                    </div>
                    <div class="category-name">
                      <p>${this._data[4].cat}</p>
                    </div>
                    <div class="item-details">
                      <div class="item-name"><a href="">${
                        this._data[4].title
                      }</a></div>
                      <div class="price" data-price="$${
                        this._data[4].price
                      }"><p>$${Math.trunc(
      this._data[4].price - (this._data[4].price * this._data[4].discount) / 100
    )}</p></div>
                    </div>
                    <div class="item-links">
                      <div class="link cart-btn"> <img src="${addCartImage}" alt=""><a href="">Add to Cart</a></div>
                      <ul>
                        <li><a class ="compare-btn"  href=""><img src="${compareImage}" alt="">Compare</a></li>
                        <li><a class ="wishlist-btn" href=""><img src="${wishlistImage}" alt="">Wishlist</a></li>
                      </ul>
                    </div>
                  </div>
              </div>`;
  }
  addHandlerTabs(handler) {
    const category_tabs = document.querySelector(".category-tabs .tabs");
    category_tabs.addEventListener("click", (e) => {
      if (e.target.classList.contains("tab")) {
        this._parentElement.classList.add("fade-animation");
        setTimeout(() => {
          Array.from(category_tabs.getElementsByTagName("li")).forEach((li) => {
            li.classList.remove("tab-active");
          });
          e.target.closest("li").classList.add("tab-active");
          handler(e);
        }, 50);

        setTimeout(
          () => this._parentElement.classList.remove("fade-animation"),
          800
        );
      }
    });
  }
  reset() {
    this._parentElement = document.querySelector(
      ".category-tabs .items-wrapper"
    );
  }
}

export default new CategorySectionView();
