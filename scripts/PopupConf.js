import { Popup } from "./Popup.js";

class PopupConfirm extends Popup {
  constructor({ popupSelector, formSubmit }) {
    super(popupSelector);
    this._formSubmit = formSubmit;
    this._form = this._popup.querySelector(".popup__edit-form");
    this._cardId;
  }

  setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener("submit", (event) => {
      event.preventDefault();
       const cardElement = event.target.closest(".elements__card");
      this._formSubmit(this._cardId, cardElement );
    });
  }

  open(cardId) {
    this._cardId = cardId;
    super.open();
  }
  close() {
    this._cardId = ''
    this._submitButton.textContent = 'Да';
    super.close();
  }
     changeButtonText() {
    this._submitButton.textContent = 'Удаление...';
  }
}

export { PopupConfirm };
