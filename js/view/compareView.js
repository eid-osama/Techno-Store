"use strict";

import View from "../view/View.js";

import addCartImage from "../../images/add-cart.png";

class CompareView extends View {
  _parentElement = document.querySelector(".comparison .table-container");
  _alert = document.querySelector("#alert");
  _msg = "Add Products to Compare List";

  addHandlerDelete(handler) {
    this.reset();
    this._parentElement.addEventListener("click", (e) => {
      e.preventDefault();
      const deleteBtn = e.target.closest("#delete-btn");
      if (!deleteBtn) return;
      const productColumn = deleteBtn.closest(".table-column");
      handler(productColumn.dataset.id);
    });
  }
  fullAlert() {
    this.reset();
    this._alert.innerHTML = "";
    this._alert.innerHTML = `<i class="fa-solid fa-circle-xmark"></i>
                      <p>3 products only</p>`;
    this._alert.classList.add("sliding-animation");
    setTimeout(() => this._alert.classList.remove("sliding-animation"), 1750);
  }
  addProductAlert() {
    this.reset();
    this._alert.innerHTML = "";
    this._alert.innerHTML = `<i class="fa-solid fa-circle-check"></i>
                      <p>Product Added</p>`;
    this._alert.classList.add("sliding-animation");
    setTimeout(() => this._alert.classList.remove("sliding-animation"), 1750);
  }

  _generateMarkup() {
    let comparedProducts = "";
    for (let i = 0; i < this._data.length; i++) {
      let starsHTML = "";
      const ratingToOneDecimal = Math.round(this._data[i].rating * 10) / 10;
      const rating = Math.round(ratingToOneDecimal * 2) / 2;
      const fullStars = Math.floor(rating);
      const halfStar = rating % 1 !== 0;
      const emptyStars = 5 - fullStars - (halfStar ? 1 : 0);
      for (let i = 0; i < fullStars; i++) {
        starsHTML += '<i class="fa-solid fa-star"></i>';
      }

      if (halfStar) {
        starsHTML += '<i class="fa-solid fa-star-half-stroke"></i>';
      }

      for (let i = 0; i < emptyStars; i++) {
        starsHTML += '<i class="fa-regular fa-star"></i>';
      }
      comparedProducts += `<div class="table-column" data-id = ${
        this._data[i].id
      }>
                  <div class="compare-info">
                    <img src="${this._data[i].img}" alt="">
                    <p>${this._data[i].title}</p>
                  </div>
                  <div class="price compare-info">
                    <p>$${Math.trunc(
                      this._data[i].price -
                        (this._data[i].price * this._data[i].discount) / 100
                    )}</p> 
                  </div>
                  <div class="compare-info">
                    <div class="link"> 
                        <img src="${addCartImage}" alt="">
                        <a class="table-link">Add to Cart</a>
                    </div>
                  </div>
                  <div class="description compare-info">
                    <p>
                      ${this._data[i].description}
                    </p>
                  </div>
                  <div class="compare-info">
                    ${starsHTML}
                  </div>
                  <div class="compare-info">
                    in stock: ${this._data[i].stock}
                  </div>
                  <div class="compare-info delete">
                    <i class="fa-regular fa-trash-can" id="delete-btn"></i>
                  </div>
                </div>`;
    }
    this._clear();
    const markup = `
            <div class="table">
                <div class="table-column compare-points">
                    <div class="compare-point">
                      <p>Product</p>
                    </div>
                    <div class="compare-point">
                      <p>Price</p>
                    </div>
                    <div class="compare-point">
                      <p>add to cart</p>
                    </div>
                    <div class="compare-point">
                      <p>Description</p>
                    </div>
                    <div class="compare-point">
                      <p>Rating</p>
                    </div>
                    <div class="compare-point">
                      <p>stock</p>
                    </div>
                    <div class="compare-point">
                      <p>Delete</p>
                    </div>
                </div>
                ${comparedProducts}
              </div>
              `;
    return markup;
  }
  compareViewMarkup() {
    return `
        <section class="comparison">
            <div class="container">
                <div class="table-container">
                                
                </div>
            </div>
        </section>`;
  }
  reset() {
    this._parentElement = document.querySelector(
      ".comparison .table-container"
    );
    this._alert = document.querySelector("#alert");
  }
}

export default new CompareView();
