"use strict";

import View from "../view/View.js";

import addCartImage from "../../images/add-cart.png";

class wishlistView extends View {
  _parentElement = document.querySelector(".wishlist .table-container");
  _alert = document.querySelector("#alert");
  _msg = "Your Wishlist is Empty";

  addHandlerDelete(handler) {
    this.reset();
    this._parentElement.addEventListener("click", (e) => {
      e.preventDefault();
      const deleteBtn = e.target.closest(".wishlist .delete i");
      if (!deleteBtn) return;
      const productColumn = deleteBtn.closest(".table-row");
      handler(productColumn.dataset.id);
    });
  }
  addProductAlert() {
    this.reset();
    this._alert.innerHTML = "";
    this._alert.innerHTML = `<i class="fa-solid fa-circle-check"></i>
                      <p>Product wishllisted</p>`;
    this._alert.classList.add("sliding-animation");
    setTimeout(() => this._alert.classList.remove("sliding-animation"), 1750);
  }

  _generateMarkup() {
    let wishlistedProducts = "";
    for (let i = 0; i < this._data.length; i++) {
      wishlistedProducts += `
        <div class="table-row product-points" data-id="${this._data[i].id}">
            <div class="product-point">
              <div class="image-container">
                <img src="${this._data[i].img}" alt="">
              </div>
              <p>${this._data[i].title}</p>
            </div>
            <div class="product-point price">
                <p>$${Math.trunc(
                  this._data[i].price -
                    (this._data[i].price * this._data[i].discount) / 100
                )}</p>
            </div>
            <div class="product-point">
                <p>In Stock: ${this._data[i].stock}</p>
            </div>
            <div class="link"> 
                <img src="${addCartImage}" alt="">
                <a class="table-link">Add to Cart</a>
            </div>
            <div class="delete">
                <i class="fa-regular fa-trash-can"></i>
            </div>
        </div>
`;
    }
    this._clear();
    const markup = `
            <div class="table">
                <div class="table-row table-points">
                    <div class="table-point">
                        <p>Product</p>
                    </div>
                    <div class="table-point">
                        <p>Unit Price</p>
                    </div>
                    <div class="table-point">
                        <p>Stock Status</p>
                    </div>
                </div>
                ${wishlistedProducts}
            </div>
              `;
    return markup;
  }
  wishlistViewMarkup() {
    return `
        <section class="wishlist">
            <div class="container">
              <div class="table-container">
                <div class="table">
                    
                    
                </div>
              </div>
            </div>
        </section>`;
  }
  reset() {
    this._parentElement = document.querySelector(".wishlist .table-container");
    this._alert = document.querySelector("#alert");
  }
}

export default new wishlistView();
