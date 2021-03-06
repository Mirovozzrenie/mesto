import { Popup } from "./Popup.js";


class PopupWithForm extends Popup {
  constructor({ popupSelector, formSubmit }) {
    super(popupSelector);
    this._formSubmit = formSubmit;
    this._form = this._popup.querySelector(".popup__edit-form");
        this._submitButton = this._popup.querySelector('.popup__save-button');

  }

  _getInputValue() {
    this._inputList = this._popup.querySelectorAll(".popup__input-field");
    this._inputValues = [];
    this._inputList.forEach(input => {
      this._inputValues[input.name] = input.value;
    });
    return this._inputValues;
  }

  setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener("submit", (event) => {
      event.preventDefault();
      this._formSubmit(this._getInputValue());
    });
  }

  close() {
    this._form.reset();
    this._submitButton.textContent = 'Сохранить';
    super.close();
  }
  
   changeButtonText() {
    this._submitButton.textContent = 'Сохранение...';
  }
}

export { PopupWithForm };
