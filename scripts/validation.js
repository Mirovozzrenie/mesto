const newPlaceForm = document.querySelector(".popup__new-card-picture");
const newProfileInfo = document.querySelector(".popup__new-profile-info");

class FormValidator {
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
new newPlaceForm.enableValidation();
