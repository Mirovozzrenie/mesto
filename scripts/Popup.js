import {ESCbutton} from './const.js';

class Popup {
  constructor(popupSelector) {
    this._popup = document.querySelector(popupSelector);
    this._cancelIcon = this._popup.querySelector(".popup__cancel-icon");
    this._handleEscClose = this._handleEscClose.bind(this);
  }

  open() {

    this._popup.classList.add("popup_active");
    document.addEventListener("keydown", this._handleEscClose);
  }
  close() {

    this._popup.classList.remove("popup_active");
    document.removeEventListener("keydown", this._handleEscClose);
  }

  _handleEscClose(event) {
    if (event.code === ESCbutton) {
      this.close();
    }
  }
  setEventListeners() {
    this._popup.addEventListener("click", event => {
      if (event.target.classList.contains("popup_active")) {

        this.close();
      }
      if (event.target.classList.contains("popup__cancel-icon")) {

        this.close();
      }
    });
  }
}

export { Popup };
