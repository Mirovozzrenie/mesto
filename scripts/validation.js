const validationConfig = {
  formSelector: '.popup__edit-form',
  submitButtonSelector: '.popup__save-button',
  inputSelector: '.popup__input-field',
  buttonInvalidClass: 'popup__save-button_invalid',
  inputInvalidClass: 'popup__input-field_state_invalid'
}

class Validation {
  constructor(config, addForm) {
    this._config = config;
    this._addForm = addForm;
    this._submitButton = addForm.querySelector(this._config.submitButtonSelector);
  }

  cleanErrors() {
   const errorSpan = this._addForm.querySelectorAll('.popup__error');
//   console.log(errorSpan)
   errorSpan.forEach(span => {
     span.textContent = '';
   });
    const errorInput = this._addForm.querySelectorAll(this._config.inputSelector);
    errorInput.forEach(input => {
      input.classList.remove(this._config.inputInvalidClass);
    })
  }  
  
  _showError(input) {
    const _error = this._addForm.querySelector(
      `#${input.id}-error`
    );
    _error.textContent = input.validationMessage;
    input.classList.add(this._config.inputInvalidClass);
  }

  _hideError(input) {
    const _error = this._addForm.querySelector(
      `#${input.id}-error`
    );
    _error.textContent = "";
    input.classList.remove(this._config.inputInvalidClass);
  }

  _checkInputValidity(input) {
    if (input.validity.valid) {
      this._hideError(input)
    } else {
      this._showError(input)
    }
  }

  setButtonState(isActive) {
    if (isActive) {
      this._submitButton.classList.remove(this._config.buttonInvalidClass);
      this._submitButton.disabled = false;
    } else {
      this._submitButton.classList.add(this._config.buttonInvalidClass);
      this._submitButton.disabled = true;
    }
  }

  _setEventListener() {
    const inputList = this._addForm.querySelectorAll(this._config.inputSelector);
    /*const submitButton = form.querySelector(this._config.submitButtonSelector);*/

    inputList.forEach(input => {
      input.addEventListener("input", (event) => {
        this._checkInputValidity(input, this._config);
        this.setButtonState(this._addForm.checkValidity());
      });

    })
  }

  enableValidation() {
    /*const forms = this._addForm.querySelectorAll(this._config.formSelector);
    forms.forEach(form => {*/
//    console.log(this);
    this._setEventListener();
    this._addForm.addEventListener('submit', (event) => {
      event.preventDefault();
      this.setButtonState();
    })
    /*const submitButton = form.querySelector(this._config.submitButtonSelector);*/
    this.setButtonState();
    //    });
  }
}
export {
  Validation,
  validationConfig
};
