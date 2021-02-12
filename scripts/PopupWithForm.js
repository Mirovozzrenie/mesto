import {
  Popup
} from "./Popup.js";

class PopupWithForm extends Popup {
  constructor({popupSelector, formSubmit}) {
    super(popupSelector);
    this._formSubmit = formSubmit;
    this._form = this._popup.querySelector(".popup__edit-form");
  }

  _getInputValue() {
    console.log(2);
    this._inputList = this._popup.querySelectorAll(".popup__input-field");
    this._inputValues = [];
    this._inputList.forEach(input => {
      this._inputValues[input.name] = input.value;
    });
    console.log(3)
    return this._inputValues;
  }

  setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener("submit", () => {
      console.log(1)
      this._formSubmit(this._getInputValue());
    });
  }

  close() {
    this._form.reset();
    super.close();
  }
}

export {
  PopupWithForm
};
