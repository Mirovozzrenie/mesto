const newPlaceForm = document.querySelector('.popup__new-card-picture');
const newPlaceName = newPlaceForm.querySelector('.popup__place-name');
const newPlaceLink = newPlaceForm.querySelector('.popup__picture-link');

function showError(input){
  const errorElement = newPlaceForm.querySelector(`#${input.id}-error`);
  errorElement.textContent = input.validationMessage;
  input.classList.add('popup__input-field_state_invalid');
}
function hideError(input){
  const errorElement = newPlaceForm.querySelector(`#${input.id}-error`);
  errorElement.textContent = ''; 
  input.classList.remove('popup__input-field_state_invalid');
}
function checkInputValidity(input){
  if (input.validity.valid) {
    hideError(input);
  }else {
    showError(input);
  }
}
function setEventListener() {
const inputElements = Array.from(newPlaceForm.querySelectorAll('.popup__input-field'));
  inputElements.forEach((input) => {
  input.addEventListener('input', (event) => {
    checkInputValidity(event.target);   
  });
  });
};
function toggleButtonState(buttonElement){
  
};

newPlaceForm.addEventListener('submit', function(event) {
  event.preventDefault();
}) 
  setEventListener();