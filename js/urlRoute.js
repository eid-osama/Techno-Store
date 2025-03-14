import {
  rebind,
  initShopPage,
  initComparePage,
  initWishlistPage,
  initCartPage,
} from "./controller.js";
import homePageView from "./view/homePageView/homePageView.js";
import ShopPageView from "./view/shopPageView/shopPageView.js";
import compareView from "./view/compareView.js";
import wishlistView from "./view/wishlistView.js";
import cartView from "./view/cartView.js";

const urlRoutes = {
  404: {
    template: "",
    title: "",
    description: "",
  },
  "/": {
    template: homePageView.homePageMarkup(),
    title: "",
    description: "",
  },
  "/shop": {
    template: ShopPageView.shopPageMarkup(),
    title: "",
    description: "",
  },
  "/compare": {
    template: compareView.compareViewMarkup(),
    title: "",
    description: "",
  },
  "/wishlist": {
    template: wishlistView.wishlistViewMarkup(),
    title: "",
    description: "",
  },
  "/cart": {
    template: cartView.cartViewMarkup(),
    title: "",
    description: "",
  },
};

export function urlRoute(event) {
  event = event || window.event;
  if (event.preventDefault) {
    event.preventDefault();
  }
  window.history.pushState({}, "", event.target.href);
  const fadedSection = document.querySelector("#content");
  const fadedSection2 = document.getElementsByTagName("footer")[0];
  fadedSection.classList.add("fade-animation");
  fadedSection2.classList.add("fade-animation");
  setTimeout(() => {
    urlLocationHandler();
  }, 50);
  setTimeout(() => {
    fadedSection.classList.remove("fade-animation");
    fadedSection2.classList.remove("fade-animation");
  }, 800);
}

async function urlLocationHandler() {
  let location = window.location.pathname;
  if (location.length === 0) {
    location = "/";
  }

  const route = urlRoutes[location] || urlRoutes[404];

  const html = route.template;
  const tempDiv = document.createElement("div");
  tempDiv.innerHTML = html;

  const contentHtml = tempDiv.innerHTML;

  document.getElementById("content").innerHTML = contentHtml;

  if (location === "/") {
    await rebind();
  }
  if (location === "/shop") {
    await initShopPage();
  }
  if (location === "/compare") {
    await initComparePage();
  }
  if (location === "/wishlist") {
    await initWishlistPage();
  }
  if (location === "/cart") {
    await initCartPage();
  }
}

window.addEventListener("popstate", urlLocationHandler);
window.route = urlRoute;
