class Popup {
  constructor(popupSelector) {
    this._popup = document.querySelector(popupSelector);
    this._cancelIcon = this._popup.querySelector(".popup__cancel-icon");
    this._handleEscClose = this._handleEscClose.bind(this);
  }

  open() {
    console.log("открыли");
    this._popup.classList.add("popup_active");
    document.addEventListener("keydown", this._handleEscClose);
  }
  close() {
    console.log("закрыли");
    this._popup.classList.remove("popup_active");
    document.removeEventListener("keydown", this._handleEscClose);
  }

  _handleEscClose() {
    if (event.key === "Escape") {
      this.close();
    }
  }
  setEventListeners() {
    this._popup.addEventListener("click", event => {
      if (event.target.classList.contains("popup_active")) {
        console.log(2);
        this.close();
      }
      if (event.target.classList.contains("popup__cancel-icon")) {
        console.log(1);
        this.close();
      }
    });
  }
}

export { Popup };
