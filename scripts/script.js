//основной массив карточек
import { initialCards } from "./data.js";
import { Card } from "./Card.js";
import { Validation, validationConfig } from "./validation.js";
import { Section } from "./Section.js";
//import {Popup} from './Popup.js';
import { PopupWithImage } from "./PopupWithImage.js";
import { PopupWithForm } from "./PopupWithForm.js";
import { UserInfo } from "./UserInfo.js";
//Основные кнопки профиля
const profileEditButton = document.querySelector(".profile__edit-button");
const popupCancelIcon = document.querySelector(".popup__cancel-profile");
const profileAddButton = document.querySelector(".profile__add-button");
//
const profileAddForm = document.querySelector(".popup__new-profile-info");
const cardAddForm = document.querySelector(".popup__new-card-picture");
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
const placeName = document.querySelector(".popup__place-name");
const pictureLink = document.querySelector(".popup__picture-link");
const newCardForm = document.querySelector(".popup__new-card-picture");
const popupZoom = document.querySelector(".popup_zoom");
const popupZoomCancel = document.querySelector(".popup__zoom-cancel");
let detector = false;
//загатовка карточки для отрисовки
const cardTemplate = document.querySelector(".card__template");
//создание экземпляров класса валидации
const validationProfile = new Validation(validationConfig, profileAddForm);
const validationCardEditor = new Validation(validationConfig, cardAddForm);
//функция добавления карточек

function removePopupListener(e) {
  document.removeEventListener("keydown", closePopupEsc);
  detector = false;
}

function addPopupListener(e) {
  document.addEventListener("keydown", closePopupEsc);
  detector = true;
}

function closePopupEsc(event) {
  const activePopup = document.querySelector(".popup.popup_active");
  if (activePopup && event.key === "Escape") {
    togglePopup(activePopup);
  }
}
/////

const zoomPopup = new PopupWithImage(".popup_zoom");
zoomPopup.setEventListeners();
function zoomPopupSwitch(event) {
  const pictureSrc = event.target.getAttribute("src");
  const pictureCaption = event.target.nextElementSibling.querySelector(
    ".elements__name"
  ).textContent;
  zoomPopup.open(pictureSrc, pictureCaption);
}

const cardPopup = new PopupWithForm({
  popupSelector: ".popup_cards-editor",
  formSubmit: data => {
    bindHandlers(data);
  }
});
cardPopup.setEventListeners();

function bindHandlers(data) {
  console.log(4);
  console.log(5);
  event.preventDefault();
  console.log(data);
  const item = new Card(
    {
      data: data,
      popupZoomSwitch: zoomPopupSwitch
    },
    cardTemplate
  ).getCard();
  placeList.setItem(item);
  console.log("форма должна закрыться");
  cardPopup.close();
}

//включение/выключение popup
//отправка формы
const newProfilePopup = new PopupWithForm({
  popupSelector: ".popup_profile-editor",
  formSubmit: data => {
    submitFormHandler();
  }
});
newProfilePopup.setEventListeners();
const userInfo = new UserInfo(profileUserName, profileUserStatus);

function submitFormHandler(data) {
  event.preventDefault();
  userInfo.setUserInfo(nameInput.value, jobInput.value);
  userInfo.updateUserInfo();
  newProfilePopup.close();
}

function renderValidation() {
  validationProfile.enableValidation();
  validationCardEditor.enableValidation();
}

function renderPlaces(data) {
  const newPlace = new Card(
    {
      data: data,
      popupZoomSwitch: zoomPopupSwitch
    },
    cardTemplate
  ).getCard();
  placeList.setItem(newPlace);
}

const placeList = new Section(
  {
    data: initialCards,
    renderer: renderPlaces
  },
  ".elements"
);
placeList.renderItems();

renderValidation();

profileEditButton.addEventListener("click", function() {
  let data = [];
  data = userInfo.getUserInfo();
  console.log(data.name);
  nameInput.value = data.name.textContent;
  jobInput.value = data.status.textContent;

  validationProfile.setButtonState(profileAddForm.checkValidity());
  newProfilePopup.open();
});

//окно добавления карточек
profileAddButton.addEventListener("click", event => {
  cardPopup.open();
});
