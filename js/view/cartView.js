"use strict";
import View from "../view/View.js";

class cartView extends View {
  constructor() {
    super();
    this._parentElement = document.querySelector(".cart .container");
    this._alert = document.querySelector("#alert");
    this._msg = "Your Cart is Empty";
  }

  addHandlerDelete(handler) {
    this._parentElement.addEventListener("click", (e) => {
      e.preventDefault();
      const deleteBtn = e.target.closest(".cart .delete i");
      if (!deleteBtn) return;
      const productColumn = deleteBtn.closest(".table-row");
      handler(productColumn.dataset.id);
      this.addHandlerQuantity();
    });
  }

  addHandlerQuantity() {
    const subtotal = document.querySelector(
      ".reset .reset-point:first-child p:last-child"
    );
    const resetTotal = document.querySelector(
      ".reset .reset-point:last-child p:last-child"
    );
    this._parentElement.removeEventListener("click", this._quantityHandler);
    this._quantityHandler = (e) => {
      e.preventDefault();
      const quantityBtn = e.target.closest(".cart .quantity button");
      if (!quantityBtn) return;

      const id = quantityBtn.closest(".product-points").dataset.id;
      const amount = quantityBtn
        .closest(".product-points")
        .querySelector(".amount");
      const total = quantityBtn
        .closest(".product-points")
        .querySelector(".price p:last-child");

      let price;
      for (let i = 0; i < this._data.length; i++) {
        if (parseInt(this._data[i].id) === parseInt(id)) {
          price = Math.trunc(
            this._data[i].price -
              (this._data[i].price * this._data[i].discount) / 100
          );
        }
      }

      if (quantityBtn.classList.contains("decrease") && amount.value > 1) {
        amount.value = parseInt(amount.value) - 1;
      }
      if (
        quantityBtn.classList.contains("increase") &&
        parseInt(amount.value) < parseInt(amount.max)
      ) {
        amount.value = parseInt(amount.value) + 1;
      }

      total.textContent = `${parseInt(amount.value) * parseInt(price)}`;

      let allTotals = document.querySelectorAll(".price p:last-child");
      subtotal.textContent = `$${Array.from(allTotals).reduce(
        (acc, cur) => acc + parseInt(cur.textContent),
        0
      )}`;
      resetTotal.textContent = `$${
        parseInt(subtotal.textContent.replace("$", "")) + 50.0
      }`;
    };

    this._parentElement.addEventListener("click", this._quantityHandler);
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
    let cartProducts = "";
    let subtotal = 0;
    for (let i = 0; i < this._data.length; i++) {
      subtotal += Math.trunc(
        this._data[i].price -
          (this._data[i].price * this._data[i].discount) / 100
      );
      cartProducts += `
        <div class="table-row product-points" data-id="${this._data[i].id}">
            <div class="product-point">
                <div class="image-container">
                    <img src="${this._data[i].img}" alt="">
                </div>
                <p>${this._data[i].title}</p>
            </div>
            <div class="product-point">
                <div class="quantity">
                    <button class="decrease"><i class="fa-solid fa-minus"></i></button>
                    <input type="number" class="amount" name="quantity" disabled  value="1" min="1" max="${
                      this._data[i].stock
                    }">
                    <button class="increase"><i class="fa-solid fa-plus"></i></button>
                </div>
            </div>
            <div class="product-point price">
                <p>$</p><p>${Math.trunc(
                  this._data[i].price -
                    (this._data[i].price * this._data[i].discount) / 100
                )}</p>
            </div>
            <div class="delete">
                <i class="fa-regular fa-trash-can"></i>
            </div>
        </div>
`;
    }
    this._clear();
    const markup = `
        <div class="table-container">
            <div class="table">
                <div class="table-row table-points">
                        <div class="table-point">
                            <p>Product</p>
                        </div>
                        <div class="table-point">
                            <p>Quantity</p>
                        </div>
                        <div class="table-point">
                            <p>Total</p>
                        </div>
                    </div>
                ${cartProducts}
            </div>
        </div>
        <div class="reset">
            <h3>Cart Totals</h3>
            <div class="reset-details">
                <div class="reset-point">
                    <p>Subtotal</p>
                    <p>$${subtotal}</p>
                </div>
                <div class="reset-point">
                    <p>Shipping</p>
                    <p>$50.00</p>
                </div>
                <div class="reset-point">
                    <p>Total</p>
                    <p>$${subtotal + 50.0}</p>
                </div>
            </div>
            <div class="link">
                <a class="table-link">Proceed to checkout</a>
            </div>
        </div>
              `;
    return markup;
  }
  cartViewMarkup() {
    return `
        <section class="cart">
            <div class="container">
              
            </div>
        </section>`;
  }
  reset() {
    this._parentElement = document.querySelector(".cart .container");
    this._alert = document.querySelector("#alert");
  }
}

export default new cartView();
