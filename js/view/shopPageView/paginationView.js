"use strict";

import View from "../View.js";

class paginationView extends View {
  _parentElement = document.querySelector(
    ".pagination .container .pagination-links"
  );
  _curPages;
  _numPages;

  paginatePages(data, page = 1) {
    this.reset();
    this._curPages = page;
    this._numPages = Math.ceil(data.length / 12);
    this.render(data);
  }

  _generateMarkup() {
    const curPage = this._curPages;
    const numPages = this._numPages;
    this._clear();

    if (curPage === 1 && numPages > 1) {
      return `
        <button data-goto="${curPage}" class="page current">${curPage}</button>
        <button data-goto="${curPage + 1}" class="page">${curPage + 1}</button>
        <button data-goto="${curPage + 1}" class="next">Next Page</button>
      `;
    }

    // Last page
    if (curPage === numPages && numPages > 1) {
      return `
        <button data-goto="${curPage - 1}" class="previous">Prev Page</button>
        <button data-goto="${curPage - 1}" class="page">${curPage - 1}</button>
        <button data-goto="${curPage}" class="page current">${curPage}</button>
      `;
    }

    // Other pages
    if (curPage < numPages) {
      return `
        <button data-goto="${curPage - 1}" class="previous">Prev Page</button>
        <button data-goto="${curPage - 1}" class="page">${curPage - 1}</button>
        <button data-goto="${curPage}" class="page current">${curPage}</button>
        <button data-goto="${curPage + 1}" class="page">${curPage + 1}</button>
        <button data-goto="${curPage + 1}" class="next">Next Page</button>
      `;
    }

    // Only one page
    return `<button data-goto="${curPage}" class="page current">${curPage}</button>`;
  }

  addHandlerPagination(handler) {
    this._parentElement.addEventListener("click", (e) => {
      const btn = e.target.closest("button");
      if (!btn) return;
      if (btn.classList.contains("current")) {
        return;
      }

      // Get the target page number from the data attribute
      const goToPage = +btn.dataset.goto;

      // Call the handler function with the new page number
      handler(goToPage);
    });
  }

  reset() {
    this._parentElement = document.querySelector(
      ".pagination .container .pagination-links"
    );
  }
}

export default new paginationView();
