"use strict";

import View from "../View.js";

import wishlistImage from "../../../images/wishlist.png";
import compareImage from "../../../images/compare.png";
import addCartImage from "../../../images/add-cart.png";

class FeatureSectionView extends View {
  _parentElement = document.querySelector(".features-section .items-container");
  _element;
  _renderIdCounter = 1;
  _updateIdCounter = 1;

  update(data) {
    this.reset();
    let id = this._updateIdCounter++;
    this._data = data;
    const newMarkup = this._generateMarkup();

    const newDOM = document.createRange().createContextualFragment(newMarkup);
    const newElements = Array.from(
      newDOM.querySelector(".item").querySelectorAll("*")
    );
    const curElements = Array.from(
      document.getElementById(id).querySelectorAll("*")
    );
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
    if (this._updateIdCounter === 9) {
      this._updateIdCounter = 1;
    }
  }

  _generateMarkup() {
    if (this._renderIdCounter === 9) this._renderIdCounter = 1;
    const id = this._renderIdCounter++;
    return `<div class="item" id="${id}"  data-id = "${this._data.id}">
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
                              <li><a class ="compare-btn" href=""><img src="${compareImage}" alt="">Compare</a></li>
                              <li><a class ="wishlist-btn" href=""><img src="${wishlistImage}" alt="">Wishlist</a></li>
                            </ul>
                          </div>
                        </div>`;
  }
  addHandlerTabs(handler) {
    const tabs = document.querySelector(".features-section .tabs");
    tabs.addEventListener("click", (e) => {
      if (e.target.classList.contains("tab")) {
        this._parentElement.classList.add("fade-animation");
        setTimeout(() => {
          Array.from(tabs.getElementsByTagName("li")).forEach((li) => {
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
      ".features-section .items-container"
    );
  }
}

export default new FeatureSectionView();
