"use strict";
import * as model from "./model.js";

import MainSlideSectionView from "./view/homePageView/mainSlideSectionView.js";
import FeatureSectionView from "./view/homePageView/featureSectionView.js";
import CategorySectionView from "./view/homePageView/categorySectionView.js";
import TodayDealsSectionView from "./view/homePageView/todayDealsSectionView.js";
import MostviewedSectionView from "./view/homePageView/mostviewedSectionView.js";
import ShopPageView from "./view/shopPageView/shopPageView.js";
import paginationView from "./view/shopPageView/paginationView.js";
import FilterView from "./view/shopPageView/filterView.js";
import shopPageView from "./view/shopPageView/shopPageView.js";
import homePageView from "./view/homePageView/homePageView.js";
import compareView from "./view/compareView.js";
import wishlistView from "./view/wishlistView.js";
import cartView from "./view/cartView.js";

function controlFeatureTabs(e) {
  if (e.target.id === "top") {
    res = model.getTopRatedProduct();
  } else if (e.target.id === "new") {
    res = model.getNewProducts();
  } else if (e.target.id === "feature") {
    res = model.getFeaturedProduct();
  }
  res.forEach((prod) => FeatureSectionView.update(prod));
}

function controlCategoryTabs(e) {
  const category_tabs_grid = document.querySelector(
    ".category-tabs .items-wrapper"
  );
  let categoryProducts;
  if (e.target.id === "smartphones") {
    category_tabs_grid.classList.remove("grid-2", "grid-3");
    category_tabs_grid.classList.add("grid-1");
    categoryProducts = model.getProductByCategory("smartphones");
  }
  if (e.target.id === "accessories") {
    category_tabs_grid.classList.remove("grid-1", "grid-3");
    category_tabs_grid.classList.add("grid-2");
    categoryProducts = model.getProductByCategory("mobile-accessories");
  }
  if (e.target.id === "laptops") {
    category_tabs_grid.classList.remove("grid-2", "grid-1");
    category_tabs_grid.classList.add("grid-3");
    categoryProducts = model.getProductByCategory("laptops");
  }
  CategorySectionView.update(categoryProducts);
}

function controlPagination(page) {
  const gotoSection = document.querySelector(".products-list");
  const fadedSection = document.querySelector(
    ".products-list .items-container"
  );

  const filteredData = model.getFilteredProduct();
  const searchedData = model.getSearchedProduct();
  const sortedData = model.getSortedProduct();
  const allData = model.getAllProduct();
  let data;

  if (searchedData.length !== 0) {
    data = searchedData;
  } else if (filteredData.length !== 0) {
    data = filteredData;
  } else if (sortedData.length !== 0) {
    data = sortedData;
  } else if (allData.length !== 0) {
    data = allData;
  }
  ShopPageView.renderPage(data, page, "controlPagination");
  paginationView.paginatePages(data, page);

  fadedSection.classList.add("fade-animation");

  setTimeout(() => {
    fadedSection.classList.remove("fade-animation");
  }, 1200);

  // Update the pagination view

  gotoSection.scrollIntoView({ behavior: "smooth" });
}

function controlApplyFilter(
  selectedCategory,
  selectedBrands,
  minPrice,
  maxPrice
) {
  model.applyFilters(selectedCategory, selectedBrands, minPrice, maxPrice);
  const filteredProducts = model.getFilteredProduct();
  ShopPageView.renderPage(filteredProducts, 1);
  paginationView.paginatePages(filteredProducts, 1);
}

function controlSorting(sortingType) {
  if (sortingType === "rating") {
    model.sortProductsByRating();
  } else if (sortingType === "price") {
    model.sortProductsByPrice();
  }
  const data = model.getSortedProduct();
  if (data.length !== 0) {
    ShopPageView.renderPage(data, 1, "controlSorting");
    paginationView.paginatePages(data, 1);
    return;
  }
}

async function controlSearch(searchQuery) {
  await model.searchProduct(searchQuery);
  const searchResults = model.getSearchedProduct();
  ShopPageView.renderPage(searchResults, 1, "controlSearch");
  paginationView.paginatePages(searchResults, 1);
}

function controlAddComparedProduct(id) {
  const allProducts = model.getAllProduct();
  const product = allProducts.find(
    (prod) => parseInt(prod.id) === parseInt(id)
  );
  if (model.state.compared.includes(product)) return;
  else if (model.state.compared.length >= 3) {
    compareView.fullAlert();
    return;
  } else {
    compareView.addProductAlert();
    model.addComparedProduct(product);
  }
}

function controlDeleteComparedProduct(id) {
  model.deleteComparedProduct(id);
  const comparedProducts = model.getComparedProduct();
  compareView.render(comparedProducts);
}

function controlAddWishlistProduct(id) {
  const allProducts = model.getAllProduct();
  const product = allProducts.find(
    (prod) => parseInt(prod.id) === parseInt(id)
  );
  if (model.state.wishlist.includes(product)) return;
  else {
    wishlistView.addProductAlert();
    model.addWishlistProduct(product);
  }
}

function controlDeleteWishlistProduct(id) {
  model.deleteWishlistProduct(id);
  const widhlistedProducts = model.getWishlistProduct();
  wishlistView.render(widhlistedProducts);
}

function controlAddCartProduct(id) {
  const allProducts = model.getAllProduct();
  const product = allProducts.find(
    (prod) => parseInt(prod.id) === parseInt(id)
  );
  if (model.state.cart.includes(product)) return;
  else {
    cartView.addProductAlert();
    model.addCartProduct(product);
  }
}

function controlDeleteCartProduct(id) {
  model.deleteCartProduct(id);
  const cartProducts = model.getCartProduct();
  cartView.render(cartProducts);
}

async function init() {
  try {
    homePageView.addHandlerSearch();
    await model.loadProduct();
    const mainSlideProducts = model.getRandomProducts();
    MainSlideSectionView.render(mainSlideProducts);
    MainSlideSectionView.addSlideHandler();
    const todayDealProducts = model.getTopDeals();
    console.log(todayDealProducts);
    TodayDealsSectionView.render(todayDealProducts);
    TodayDealsSectionView.addSlideHandler();
    const featureProducts = model.getNewProducts();
    const categoryProducts = model.getProductByCategory("smartphones");
    model.sortProductsByRating();
    const mostViewedProducts = model.getProduct();
    featureProducts.forEach((prod) => FeatureSectionView.render(prod));
    FeatureSectionView.addHandlerTabs(controlFeatureTabs);
    CategorySectionView.addHandlerTabs(controlCategoryTabs);
    CategorySectionView.render(categoryProducts);
    mostViewedProducts.forEach((prod) => MostviewedSectionView.render(prod));
    homePageView.addHandlerCompare(controlAddComparedProduct);
    homePageView.addHandlerWishlist(controlAddWishlistProduct);
    homePageView.addHandlerCart(controlAddCartProduct);
    homePageView.todaydealSmoothScrolling();
  } catch (err) {
    console.error("Error during initialization:", err);
  }
}

export async function initShopPage() {
  try {
    await model.loadProduct();
    const shopProducts = model.getAllProduct();
    ShopPageView.reset();
    ShopPageView.renderPage(shopProducts, 1);
    shopPageView.addHandlerSearch(controlSearch);
    paginationView.paginatePages(shopProducts, 1);
    paginationView.addHandlerPagination(controlPagination);
    FilterView.showFilterMenu();
    FilterView.initilizeRangeBar();
    FilterView.addHandlerFiltering(controlApplyFilter);
    FilterView.addHandlerSorting(controlSorting);
    shopPageView.addHandlerCompare(controlAddComparedProduct);
    shopPageView.addHandlerWishlist(controlAddWishlistProduct);
    homePageView.addHandlerCart(controlAddCartProduct);
  } catch (err) {
    console.error("Error during initialization:", err);
  }
}

export async function initComparePage() {
  try {
    compareView.renderMsg();
    compareView.addHandlerDelete(controlDeleteComparedProduct);
    const comparedProducts = model.getComparedProduct();
    compareView.render(comparedProducts);
  } catch (err) {
    console.error("Error during initialization:", err);
  }
}

export async function initWishlistPage() {
  try {
    wishlistView.renderMsg();
    wishlistView.addHandlerDelete(controlDeleteWishlistProduct);
    const wishlistProducts = model.getWishlistProduct();
    wishlistView.render(wishlistProducts);
  } catch (err) {
    console.error("Error during initialization:", err);
  }
}

export async function initCartPage() {
  try {
    cartView.renderMsg();
    cartView.addHandlerDelete(controlDeleteCartProduct);
    const cartProducts = model.getCartProduct();
    cartView.render(cartProducts);
    cartView.addHandlerQuantity();
  } catch (err) {
    console.error("Error during initialization:", err);
  }
}

export async function rebind() {
  try {
    FeatureSectionView.reset();
    CategorySectionView.reset();
    MostviewedSectionView.reset();
    MainSlideSectionView.reset();
    const mainSlideProducts = model.getRandomProducts();
    MainSlideSectionView.render(mainSlideProducts);
    MainSlideSectionView.addSlideHandler();
    const featureProducts = model.getProduct(true);
    const categoryProducts = model.getProductByCategory("smartphones", 5);
    model.sortProductsByRating();
    const mostViewedProducts = model.getProduct();
    featureProducts.forEach((prod) => FeatureSectionView.render(prod));
    FeatureSectionView.addHandlerTabs(controlFeatureTabs);
    CategorySectionView.addHandlerTabs(controlCategoryTabs);
    CategorySectionView.render(categoryProducts);
    mostViewedProducts.forEach((prod) => MostviewedSectionView.render(prod));
    homePageView.addHandlerCompare(controlAddComparedProduct);
    homePageView.addHandlerWishlist(controlAddWishlistProduct);
    homePageView.addHandlerCart(controlAddCartProduct);
    homePageView.todaydealSmoothScrolling();
  } catch (err) {
    console.error("Error during reloading:", err);
  }
}

// function initializeSwipers() {
//   new Swiper(".main-slide .container .mySwiper", {
//     spaceBetween: 30,
//     centeredSlides: true,
//     autoplay: {
//       delay: 2000,
//       disableOnInteraction: false,
//     },
//     pagination: {
//       el: ".main-slide .swiper-pagination", // Unique pagination selector
//       clickable: true,
//     },
//     navigation: {
//       nextEl: ".main-slide .swiper-button-next", // Unique navigation selectors
//       prevEl: ".main-slide .swiper-button-prev",
//     },
//   });
// }

init();
