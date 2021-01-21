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
  }

  _showError(form, input) {
    const _error = form.querySelector(
      `#${input.id}-error`
    );
    _error.textContent = input.validationMessage;
    input.classList.add(this._config.inputInvalidClass);
  }

  _hideError(form, input) {
    const _error = form.querySelector(
      `#${input.id}-error`
    );
    _error.textContent = "";
    input.classList.remove(this._config.inputInvalidClass);
  }

  _checkInputValidity(form, input) {
    if (input.validity.valid) {
      this._hideError(form, input)
    } else {
      this._showError(form, input)
    }
  }

  _setButtonState(button, isActive) {
    if (isActive) {
      button.classList.remove(this._config.buttonInvalidClass);
      button.disabled = false;
    } else {
      button.classList.add(this._config.buttonInvalidClass);
      button.disabled = true;
    }
  }

  _setEventListener(form) {
    const inputList = form.querySelectorAll(this._config.inputSelector);
    const submitButton = form.querySelector(this._config.submitButtonSelector);

    inputList.forEach(input => {
      input.addEventListener("input", (event) => {
        this._checkInputValidity(form, input, this._config);
        this._setButtonState(submitButton, form.checkValidity(), this._config);
      });

    })
  }

  enableValidation() {
    const forms = this._addForm.querySelectorAll(this._config.formSelector);
    forms.forEach(form => { this._setEventListener(form);
    const submitButton = form.querySelector(this._config.submitButtonSelector);
    this._setButtonState(submitButton, form.checkValidity());
  });
}
}
export {
  Validation,
  validationConfig
};
