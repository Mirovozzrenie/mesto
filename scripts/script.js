import {initialCards} from './data.js';
import Card from './card.js';
import {popupToggle,  addPopupListener, removePopupListener} from './generalFunction.js';

//Основные кнопки профиля
const profileEditButton = document.querySelector(".profile__edit-button");
const popupCancelIcon = document.querySelector(".popup__cancel-profile");
const profileAddButton = document.querySelector(".profile__add-button");

//Основные кнопки добавления карточки
const popupCardEditor = document.querySelector(".popup_cards-editor");
const popupCardEditorCancelIcon = document.querySelector(
  ".popup__cancel-cards"
);
const popupCardEditorSubmit = document.querySelector(".popup__save-cards");

//найдем в DOM осн элементы
const popupProfileEditor = document.querySelector(".popup_profile-editor");
const profileUserName = document.querySelector(".profile__user-name");
const profileUserStatus = document.querySelector(".profile__user-status");
const formElement = document.querySelector(".popup__edit-form");
const nameInput = document.querySelector(".popup__user-name");
const jobInput = document.querySelector(".popup__user-status");
const elements = document.querySelector(".elements");
const placeName = document.querySelector(".popup__place-name");
const pictureLink = document.querySelector(".popup__picture-link");
const newCardForm = document.querySelector(".popup__new-card-picture");
const popupZoom = document.querySelector(".popup_zoom");
const popupZoomCancel = document.querySelector(".popup__zoom-cancel");

//let detector = false;
// function removePopupListener (){
//   document.removeEventListener('keydown', popupCloseEsc);
//   detector = false;
// }

// function addPopupListener (){
//   document.addEventListener('keydown', popupCloseEsc);
//   detector = true;
// }
function popupCloseEsc(event){
  const activePopup = document.querySelector('.popup.popup_active');
  if (activePopup && event.key === 'Escape'){
    popupToggle(activePopup);
  }
}

function bindHandlers() {
  newCardForm.addEventListener("submit", event => {
    event.preventDefault();
    const item = {
      name: placeName.value,
      link: pictureLink.value
    };
    const card = new Card(item);
   const newCard = card._generateCard();
    elements.preend(newCard);
    placeName.value = "";
    pictureLink.value = "";
    popupToggle(popupCardEditor);
  });
}


//отправка формы
function formSubmitHandler(event) {
  event.preventDefault();
  profileUserName.textContent = nameInput.value;
  profileUserStatus.textContent = jobInput.value;
  popupToggle(popupProfileEditor);
}
//
//bindHandlers();

//добавим прослушку в профиль
profileEditButton.addEventListener("click", function () {
  nameInput.value = profileUserName.textContent;
  jobInput.value = profileUserStatus.textContent;
  popupToggle(popupProfileEditor);
});
popupCancelIcon.addEventListener("click", function () {
  popupToggle(popupProfileEditor);
});
formElement.addEventListener("submit", formSubmitHandler);

//окно добавления карточек
profileAddButton.addEventListener("click", function () {
  popupToggle(popupCardEditor);
});
popupCardEditorCancelIcon.addEventListener("click", function() {
  popupToggle(popupCardEditor);
});
popupZoomCancel.addEventListener("click", function() {
  popupToggle(popupZoom);
});

document.querySelectorAll('.popup').forEach((popup) => {
  popup.addEventListener('click', (event) => {
    if (event.target.classList.contains('popup')) {
      popupToggle(event.target);
    };
  });
});

initialCards.forEach((item) => {
  const card = new Card(item);
  const newCard = card._generateCard();
  elements.append(newCard);
})