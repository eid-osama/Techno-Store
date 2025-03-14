"use strict";

class FilterView {
  _parentElement = document.querySelector(".filter-menu");
  _categoryCheckbox = document.querySelectorAll(
    "input[name='category-option']"
  );
  _selectSorting = document.querySelector("#sorting");
  _brandCheckbox = document.querySelectorAll("input[name='brands']");
  _sliderOne = document.getElementById("slider-1");
  _sliderTwo = document.getElementById("slider-2");
  _displayValOne = document.getElementById("range1");
  _displayValTwo = document.getElementById("range2");
  _sliderTrack = document.querySelector(".slider-track");
  _sliderMaxValue = 2000;
  _minGap = 300;

  addHandlerSorting(handler) {
    this.reset();
    this._selectSorting.addEventListener("change", (e) => {
      const fadedSection = this._parentElement.nextElementSibling;
      fadedSection.classList.add("fade-animation");
      setTimeout(() => fadedSection.classList.remove("fade-animation"), 1200);
      handler(e.target.value);
    });
  }

  showFilterMenu() {
    const filterBtn = document.querySelector(".filter-toolbar .filter-btn");
    filterBtn.addEventListener(
      "click",
      function (e) {
        this.reset();
        this._rippleEffect(e);
        if (!this._parentElement.classList.contains("open")) {
          this._openFilterMenu();
        } else {
          this._closeFilterMenu();
        }
      }.bind(this)
    );
  }

  _rippleEffect(e) {
    const ripple = document.createElement("span");
    ripple.classList.add("ripple");

    // Get the position of the button
    const rect = e.target.getBoundingClientRect();

    // Calculate the position of the ripple
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    // Set the ripple's position
    ripple.style.left = `${x}px`;
    ripple.style.top = `${y}px`;

    // Add the ripple to the button
    e.target.appendChild(ripple);

    // Remove the ripple after the animation ends
    ripple.addEventListener("animationend", function () {
      ripple.remove();
    });
  }

  _openFilterMenu() {
    this._parentElement.classList.add("open");
    setTimeout(() => {
      this._parentElement.style.opacity = "1";
      this._parentElement.style.top = "180px";
    }, 100);
  }
  _closeFilterMenu() {
    this._parentElement.style.opacity = "0";
    this._parentElement.style.top = "300px";
    setTimeout(() => {
      this._parentElement.classList.remove("open");
    }, 300);
  }

  addHandlerFiltering(handler) {
    // this.reset();
    const applyBtn = this._parentElement.querySelector(".filter-btn");
    applyBtn.addEventListener("click", (e) => {
      this._rippleEffect(e);
      const selectedCategory = Array.from(this._categoryCheckbox)
        .filter((checkbox) => checkbox.checked)
        .map((checkbox) => checkbox.id);
      const selectedBrands = Array.from(this._brandCheckbox)
        .filter((checkbox) => checkbox.checked)
        .map((checkbox) => checkbox.value);
      const minPrice = this._sliderOne.value;
      const maxPrice = this._sliderTwo.value;

      const fadedSection = this._parentElement.nextElementSibling;
      fadedSection.classList.add("fade-animation");
      setTimeout(() => fadedSection.classList.remove("fade-animation"), 1200);
      setTimeout(() => this._closeFilterMenu(), 80);

      handler(selectedCategory, selectedBrands, minPrice, maxPrice);
    });
  }

  initilizeRangeBar() {
    this.reset();
    this._sliderOne.addEventListener(
      "input",
      function (event) {
        if (
          parseInt(this._sliderTwo.value) - parseInt(event.target.value) <
          this._minGap
        ) {
          event.target.value = parseInt(this._sliderTwo.value) - this._minGap;
        }
        this._displayValOne.textContent = event.target.value;
        this._fillColor();
      }.bind(this)
    );
    this._sliderTwo.addEventListener(
      "input",
      function (event) {
        if (
          parseInt(event.target.value) - parseInt(this._sliderOne.value) <
          this._minGap
        ) {
          event.target.value = parseInt(this._sliderOne.value) + this._minGap;
        }
        this._displayValTwo.textContent = event.target.value;
        this._fillColor();
      }.bind(this)
    );
  }

  _fillColor() {
    const sliderOneValue = Number(this._sliderOne.value);
    const sliderTwoValue = Number(this._sliderTwo.value);

    const minPercentage =
      (Math.min(sliderOneValue, sliderTwoValue) / this._sliderMaxValue) * 100;
    const maxPercentage =
      (Math.max(sliderOneValue, sliderTwoValue) / this._sliderMaxValue) * 100;

    if (maxPercentage === undefined || maxPercentage < minPercentage) {
      return;
    }

    // Create a smooth gradient transition
    this._sliderTrack.style.background = `linear-gradient(to right,
        #dadae5 ${minPercentage}%,
        #f28b00 ${maxPercentage - minPercentage}%,
        #f28b00 ${maxPercentage}%,
        #dadae5 ${maxPercentage}%)`;
  }

  reset() {
    this._parentElement = document.querySelector(".filter-menu");
    // this._categoryCheckbox = document.querySelectorAll(
    //   "input[name='category-option']"
    // );
    this._selectSorting = document.querySelector("#sorting");
    // this._brandCheckbox = document.querySelectorAll("input[name='brands']");
    this._sliderOne = document.getElementById("slider-1");
    this._sliderTwo = document.getElementById("slider-2");
    this._displayValOne = document.getElementById("range1");
    this._displayValTwo = document.getElementById("range2");
    this._sliderTrack = document.querySelector(".slider-track");
  }
}

export default new FilterView();
