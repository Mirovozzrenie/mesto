export default class FormValidator {
  constructor(someForm) {
    this.someForm = someForm;
  }

  _showError(input) {
    console.log(input);
    const errorElement = document.querySelector(`#${input.id}-error`);
    console.log(errorElement);
    errorElement.textContent = input.validationMessage;
    console.log(input.validationMessage);
    console.log(input.textContent);
    input.classList.add("popup__input-field_state_invalid");
  }
  _hideError(input) {
    const errorElement = document.querySelector(`#${input.id}-error`);
    errorElement.textContent = "";
    input.classList.remove("popup__input-field_state_invalid");
  }

  _checkInputValidity(input) {
    console.log(input);
    if (input.validity.valid) {
      this._hideError(input);
    } else {
      this._showError(input);
    }
  }

  _eventSupervision(inputElement, mainForm) {
    const _buttonElement = mainForm.querySelector(".popup__save-button");
    inputElement.addEventListener("input", (event) => {
      this._checkInputValidity(inputElement);
      this._toggleButtonState(inputElement, _buttonElement);
    });
    this._toggleButtonState(inputElement, _buttonElement);
  }

  _toggleButtonState(inputElement, buttonElement) {
    if (inputElement.checkValidity()) {
      buttonElement.classList.remove("popup__save-button_invalid");
      buttonElement.disabled = false;
    } else {
      buttonElement.classList.add("popup__save-button_invalid");
      buttonElement.disabled = true;
    }
  }

  enableValidation() {
    console.log(this.someForm);
    this.formElements = Array.from(
      this.someForm.querySelectorAll(".popup__input-field")
    );
    this.formElements.forEach((inputElement) => {
      inputElement.addEventListener("submit", function (event) {
        event.preventDefault();
      });
      this._eventSupervision(inputElement, this.someForm);
    });
  }
}

class FormValidatorForCard {
  constructor(someForm) {}

  _showError(input) {
    const errorElement = this.querySelector(`#${input.id}-error`);
    errorElement.textContent = input.validationMessage;
    input.classList.add("popup__input-field_state_invalid");
  }
  _hideError(input) {
    const errorElement = this.querySelector(`#${input.id}-error`);
    errorElement.textContent = "";
    input.classList.remove("popup__input-field_state_invalid");
  }

  _checkInputValidity(input) {
    if (input.validity.valid) {
      _hideError(input);
    } else {
      _showError(input);
    }
  }

  _eventSupervision(inputElement, mainForm) {
    const _buttonElement = mainForm.querySelector(".popup__save-button");
    inputElement.addEventListener("input", (event) => {
      _checkInputValidity(inputElement);
      _toggleButtonState(inputElement, _buttonElement);
    });
    _toggleButtonState(inputElement, _buttonElement);
  }

  _toggleButtonState(inputElement, buttonElement) {
    if (inputElement.checkValidity()) {
      buttonElement.classList.remove("popup__save-button_invalid");
      buttonElement.disabled = false;
    } else {
      buttonElement.classList.add("popup__save-button_invalid");
      buttonElement.disabled = true;
    }
  }

  enableValidation(mainForm) {
    const formElements = Array.from(
      mainForm.querySelectorAll(".popup__input-field")
    );
    formElements.forEach((inputElement) => {
      inputElement.addEventListener("submit", function (event) {
        event.preventDefault();
      });
      _eventSupervision(inputElement, mainForm);
    });
  }
}

export { FormValidator };
