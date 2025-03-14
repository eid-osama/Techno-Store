import { urlRoute } from "./urlRoute.js";

document.addEventListener("click", function (e) {
  const link = e.target.closest(".three-fourth ul li a");
  if (!link) return;
  e.preventDefault();
  urlRoute(e);
});
document.addEventListener("click", function (e) {
  const link = e.target.closest(".col .button a");
  if (!link) return;
  e.preventDefault();
  urlRoute(e);
});
document.addEventListener("navigate", function (e) {
  urlRoute({ target: { href: e.detail.href } });
});
