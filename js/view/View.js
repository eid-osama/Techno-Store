export default class View {
  _data;
  render(data) {
    this.reset();
    // if (data.length === 0) {
    //   this.renderMsg();
    //   return;
    // }
    this._data = data;
    const markup = this._generateMarkup();
    // this._clear();
    this._parentElement.insertAdjacentHTML("afterbegin", markup);
  }

  renderMsg(msg = this._msg) {
    this.reset();
    const markup = `
    <div class="msg">
    <p>${msg} <i class="fa-solid fa-triangle-exclamation"></i></p>
    </div>
    `;
    this._clear();
    this._parentElement.insertAdjacentHTML("afterbegin", markup);
  }

  _clear() {
    this._parentElement.innerHTML = "";
  }
}
