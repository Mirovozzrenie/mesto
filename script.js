//Найдем в DOM основные кнопки 
let profileEditButton = document.querySelector('.profile__edit-button');
let popupCancelIcon = document.querySelector('.popup__cancel-icon');
//найдем в DOM осн элементы 
let popup = document.querySelector('.popup');
let profileUserName = document.querySelector('.profile__user-name');
let profileUserStatus = document.querySelector('.profile__user-status');
let formElement = document.querySelector('.popup__edit-form');
let nameInput = document.querySelector('.popup__user-name');
let jobInput = document.querySelector('.popup__user-status');

//добавим прослушку
profileEditButton.addEventListener('click', popupActivation);
popupCancelIcon.addEventListener('click', popupDeactivation);
formElement.addEventListener('submit', formSubmitHandler);


//функции видимости блока popup
function popupActivation() {
  nameInput.setAttribute('value', profileUserName.textContent);
  jobInput.setAttribute('value', profileUserStatus.textContent);
  popup.classList.add('popup_active');
}

function popupDeactivation() {
  popup.classList.remove('popup_active');
}

function formSubmitHandler(event) {
  event.preventDefault();
  profileUserName.textContent = nameInput.value;
  profileUserStatus.textContent = jobInput.value;
  popupDeactivation();
}
