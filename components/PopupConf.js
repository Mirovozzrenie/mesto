import { Popup } from "./Popup.js";

class PopupConfirm extends Popup {
  constructor({ popupSelector }) {
    super(popupSelector);
    this._submitButton = this._popup.querySelector(".popup__save-button");
      this._form = this._popup.querySelector(".popup__edit-form");
  }

  changeConfirmHandler(hand) {
    this._handleSubmit = hand;
  }

  changeButtonText() {
    this._submitButton.textContent = "Удаление...";
  }

  close() {
    super.close();
    this._submitButton.textContent = "Да";
  }

  setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener("submit", event => {
      event.preventDefault();
 
      this._handleSubmit();
    });
  }
}

export { PopupConfirm };
