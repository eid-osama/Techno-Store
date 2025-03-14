"use strict";
import { API_URL } from "./config.js";

export const state = {
  product: [],
  compared: [],
  wishlist: [],
  cart: [],
  search: [],
  filtered: [],
  filtering: {
    selectedCategory: [],
    selectedBrands: [],
    minPrice: 0,
    maxPrice: 0,
  },
  sorted: [],
  topRated: [],
  featured: [],
  topDeals: [],
  newProducts: [],
  accessories: [],
  laptops: [],
  smartphones: [],
};

async function fetchCategoryData(category) {
  const response = await fetch(
    `${API_URL}/category/${category}?limit=1000&timestamp=${new Date().getTime()}`
  );
  const data = await response.json();
  return data.products;
}

function mapProductData(product) {
  return {
    id: product.id,
    img: product.images[0],
    cat: product.category,
    title: product.title,
    description: product.description,
    price: product.price,
    discount: product.discountPercentage,
    rating: product.rating,
    stock: product.stock,
    brand: product.brand,
  };
}

function filterAndMapProducts(data, category) {
  return data
    .filter((product) => product.category === category)
    .map(mapProductData);
}

export async function loadProduct() {
  try {
    if (state.product.length > 0) {
      return;
    }
    const categories = [
      "mobile-accessories",
      "laptops",
      "smartphones",
      "tablets",
    ];
    let data = [];

    for (const category of categories) {
      const categoryData = await fetchCategoryData(category);
      data = [...data, ...categoryData];
    }

    state.product = data.map(mapProductData);
    state.accessories = filterAndMapProducts(data, "mobile-accessories");
    state.laptops = filterAndMapProducts(data, "laptops");
    state.smartphones = filterAndMapProducts(data, "smartphones");
  } catch (err) {
    console.log(`${err}💥💥💥`);
    throw err;
  }
}

export async function searchProduct(searchQuery) {
  if (!searchQuery.trim()) {
    return;
  }

  try {
    const response = await fetch(
      `https://dummyjson.com/products/search?q=${searchQuery.trim()}&timestamp=${new Date().getTime()}`
    );

    const result = await response.json();
    const data = result.products;

    const allowedCategories = [
      "mobile-accessories",
      "laptops",
      "smartphones",
      "tablets",
    ];
    const filteredData = data.filter((product) =>
      allowedCategories.includes(product.category)
    );

    // state.product = filteredData.map(mapProductData);
    state.search = filteredData.map(mapProductData);
  } catch (error) {
    console.error("Error fetching search results:", error);
  }
}

export function getProduct(default_render = false, productsPerTab = 8) {
  const start = 0;
  const end = productsPerTab;
  if (default_render) {
    state.product.sort(function (a, b) {
      return b.stock - a.stock;
    });
  }
  return state.product.slice(start, end);
}

export function getAllProduct() {
  return state.product || [];
}
export function getSearchedProduct() {
  return state.search || [];
}
export function getFilteredProduct() {
  return state.filtered || [];
}
export function getSortedProduct() {
  return state.sorted || [];
}

export function getRandomProducts() {
  return state.product.sort(() => Math.random() - 0.5).slice(0, 5);
}

export function getTopDeals() {
  return (state.topDeals = state.product
    .sort((a, b) => b.discount - a.discount)
    .slice(0, 5));
}

export function getTopRatedProduct() {
  state.topRated = state.product
    .sort((a, b) => b.rating - a.rating)
    .slice(1, 9);
  return state.topRated;
}

export function getFeaturedProduct() {
  state.featured = state.product.sort((a, b) => b.price - a.price).slice(1, 9);
  return state.featured;
}

export function getNewProducts() {
  state.newProducts = state.product
    .sort((a, b) => b.stock - a.stock)
    .slice(1, 9);
  return state.newProducts;
}

export function getProductByCategory(productType) {
  const start = 0;
  const end = 5;
  if (productType === "smartphones") {
    return state.smartphones.slice(start, end);
  }
  if (productType === "laptops") {
    return state.laptops.slice(start, end);
  }
  if (productType === "mobile-accessories") {
    return state.accessories.slice(start, end);
  }
}

export function sortProductsByRating() {
  if (state.filtered.length !== 0) {
    state.sorted = state.filtered.sort((a, b) => b.rating - a.rating);
    return;
  } else if (state.search.length !== 0) {
    state.sorted = state.search.sort((a, b) => b.rating - a.rating);
    return;
  } else state.sorted = state.product.sort((a, b) => b.rating - a.rating);
}

export function sortProductsByPrice() {
  if (state.search.length !== 0) {
    state.sorted = state.search.sort((a, b) => b.price - a.price);
    return;
  } else if (state.filtered.length !== 0) {
    state.sorted = state.filtered.sort((a, b) => b.price - a.price);
    return;
  } else state.sorted = state.product.sort((a, b) => b.price - a.price);
}

function filtering(
  selectedCategory,
  selectedBrands,
  minPrice,
  maxPrice,
  product
) {
  const matchesCategory =
    selectedCategory.length === 0 || selectedCategory.includes(product.cat);

  const matchesBrand =
    selectedBrands.length === 0 || selectedBrands.includes(product.brand);

  const matchesPrice = product.price >= minPrice && product.price <= maxPrice;

  return matchesCategory && matchesBrand && matchesPrice;
}

export function applyFilters(
  selectedCategory,
  selectedBrands,
  minPrice,
  maxPrice
) {
  state.filtering.selectedCategory = selectedCategory;
  state.filtering.selectedBrands = selectedBrands;
  state.filtering.minPrice = minPrice;
  state.filtering.maxPrice = maxPrice;
  if (state.sorted.length !== 0) {
    state.filtered = state.sorted.filter((product) =>
      filtering(selectedCategory, selectedBrands, minPrice, maxPrice, product)
    );
    return;
  }
  if (state.search.length !== 0) {
    state.filtered = state.search.filter((product) =>
      filtering(selectedCategory, selectedBrands, minPrice, maxPrice, product)
    );
    return;
  }

  state.filtered = state.product.filter((product) =>
    filtering(selectedCategory, selectedBrands, minPrice, maxPrice, product)
  );
}

export function addComparedProduct(product) {
  state.compared.push(product);
}

export function getComparedProduct() {
  return state.compared;
}

export function deleteComparedProduct(id) {
  const index = state.compared.findIndex(
    (prod) => parseInt(prod.id) === parseInt(id)
  );
  if (index === -1) return;
  state.compared.splice(index, 1);
}

export function addWishlistProduct(product) {
  state.wishlist.push(product);
}

export function getWishlistProduct() {
  return state.wishlist;
}

export function deleteWishlistProduct(id) {
  const index = state.wishlist.findIndex(
    (prod) => parseInt(prod.id) === parseInt(id)
  );
  if (index === -1) return;
  state.wishlist.splice(index, 1);
}

export function addCartProduct(product) {
  state.cart.push(product);
}

export function getCartProduct() {
  return state.cart;
}

export function deleteCartProduct(id) {
  const index = state.cart.findIndex(
    (prod) => parseInt(prod.id) === parseInt(id)
  );
  if (index === -1) return;
  state.cart.splice(index, 1);
}
