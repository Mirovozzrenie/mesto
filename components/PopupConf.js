import { Popup } from "./Popup.js";

class PopupConfirm extends Popup {
  constructor({ popupSelector }) {
    super(popupSelector);
  }

 
  changeConfirmHandler(hand) {
    this._handleSubmit = hand;
  }

  changeButtonText() {
    this._submitButton.textContent = 'Удаление...';
  }

  close() {
    super.close();
    this._submitButton.textContent = 'Да';
  }

  setEventListeners() {
    super.setEventListeners();
    this._submitButton.addEventListener("click", () => {
      this._handleSubmit(this._cardId)})
  }
}


export { PopupConfirm };
