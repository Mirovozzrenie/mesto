const newPlaceForm = document.querySelector('.popup__new-card-picture');
const newProfileInfo = document.querySelector('.popup__new-profile-info')

class FormValidator {
  constructor(inputElement, formElement){

  }
  enableValidation(mainForm) {
    const formElements = Array.from(mainForm.querySelectorAll(".popup__input-field"));
  formElements.forEach((formElement) => {
   formElement.addEventListener("submit", function (event) {
  event.preventDefault();
});
    setEventListener(formElement, mainForm);
  })
  }

  _toggleButtonState(formElement, buttonElement) {
    if (formElement.checkValidity()) {
      buttonElement.classList.remove("popup__save-button_invalid");
      buttonElement.disabled = false;
    } else {
      buttonElement.classList.add("popup__save-button_invalid");
      buttonElement.disabled = true;
    }
  }
  _setEventListener(formElement, mainForm) {
    const buttonElement = mainForm.querySelector(".popup__save-button"); 
    formElement.addEventListener("input", (event) => {
    checkInputValidity(formElement);
    toggleButtonState(formElement, buttonElement);
    });
    toggleButtonState(formElement, buttonElement);
  }
  _checkInputValidity(input) {
    if (input.validity.valid) {
      hideError(input);
    } else {
      showError(input);
    }
  }
  _hideError(input) {
    const errorElement = document.querySelector(`#${input.id}-error`);
    errorElement.textContent = '';
    input.classList.remove("popup__input-field_state_invalid");
  }

_showError(input) {
  const errorElement = document.querySelector(`#${input.id}-error`);
  errorElement.textContent = input.validationMessage;
  input.classList.add('popup__input-field_state_invalid');
  }
}


enableValidation(newPlaceForm);
enableValidation(newProfileInfo);
