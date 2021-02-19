//основной массив карточек
import './../pages/index.css';
import { initialCards } from "./data.js";
import { Card } from "./card.js";
import { Validation, validationConfig } from "./validation.js";
import { Section } from "./Section.js";
import {Popup} from './Popup.js';
import { PopupWithImage } from "./PopupWithImage.js";
import { PopupWithForm } from "./PopupWithForm.js";
import { UserInfo } from "./UserInfo.js";
import {profileEditButton}  from './const.js'
import {popupCancelIcon} from './const.js'
import {profileAddButton} from './const.js'
import {profileAddForm} from './const.js'
import {cardAddForm} from './const.js'
import {popupCardEditor} from './const.js'
import {popupCardEditorCancelIcon} from './const.js'
import {popupCardEditorSubmit} from './const.js'
import {popupProfileEditor} from './const.js'
import {profileUserName} from './const.js'
import {profileUserStatus} from './const.js'
import {formElement} from './const.js'
import {nameInput} from './const.js'
import {jobInput} from './const.js'
import {placeName} from './const.js'
import {pictureLink} from './const.js'
import {newCardForm} from './const.js'
import {popupZoom} from './const.js'
import {popupZoomCancel} from './const.js'
import {cardTemplate} from './const.js'

const validationProfile = new Validation(validationConfig, profileAddForm);
const validationCardEditor = new Validation(validationConfig, cardAddForm);
let detector = false;


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


  const item = new Card(
    {
      data: data,
      popupZoomSwitch: zoomPopupSwitch
    },
    cardTemplate
  ).getCard();
  placeList.setItem(item);

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
//  userInfo.updateUserInfo();
  let data = [];
  data = userInfo.getUserInfo();
  nameInput.value = data.name;
  jobInput.value = data.status;

  validationProfile.setButtonState(profileAddForm.checkValidity());
  newProfilePopup.open();
});

//окно добавления карточек
profileAddButton.addEventListener("click", event => {
  cardPopup.open();
});