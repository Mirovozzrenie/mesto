const newPlaceForm = document.querySelector('.popup__new-card-picture');
const newPlaceName = newPlaceForm.querySelector('.popup__place-name');
const newPlaceLink = newPlaceForm.querySelector('.popup__picture-link');
const newProfileInfo = document.querySelector('.popup__new-profile-info')

function showError(formElements, input) {
  const errorElement = formElements.querySelector(`#${input.id}-error`);
  errorElement.textContent = input.validationMessage;
  input.classList.add("popup__input-field_state_invalid");
}
function hideError(formElements, input) {
  const errorElement = formElements.querySelector(`#${input.id}-error`);
  errorElement.textContent = "";
  input.classList.remove("popup__input-field_state_invalid");
}
function checkInputValidity(formElements, input) {
  if (input.validity.valid) {
    hideError(formElements, input);
  } else {
    showError(formElements, input);
  }
}
function setEventListener(formElements, form) {
  const inputElements = Array.from(
    newPlaceForm.querySelectorAll(".popup__input-field")
  );
  const buttonElement = newPlaceForm.querySelector(".popup__save-cards");
  inputElements.forEach(input => {
    input.addEventListener("input", event => {
      checkInputValidity(formElements, event.target);
      toggleButtonState(formElements, buttonElement);
    });
  });
  toggleButtonState(formElements, buttonElement);
}

function toggleButtonState(formElements, buttonElement) {
  if (formElements.checkValidity()) {
    buttonElement.classList.remove("popup__save-button_invalid");
    buttonElement.disabled = false;
  } else {
    buttonElement.classList.add("popup__save-button_invalid");
    buttonElement.disabled = true;
  }
}

function enableValidation() {
    const formElements = Array.from(
    newProfileInfo.querySelectorAll(".popup__input-field"));
  formElements.forEach( form => {
   form.addEventListener("submit", function(event) {
  event.preventDefault();
});
    setEventListener(form);
  })
}

enableValidation();
