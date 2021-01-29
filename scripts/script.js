//основной массив карточек
import {
  initialCards
} from "./data.js";
import {
  Card
} from "./card.js";
import {
  Validation,
  validationConfig
} from "./validation.js"
//Основные кнопки профиля
const profileEditButton = document.querySelector(".profile__edit-button");
const popupCancelIcon = document.querySelector(".popup__cancel-profile");
const profileAddButton = document.querySelector(".profile__add-button");
//
const profileAddForm = document.querySelector(".popup__new-profile-info");
const cardAddForm = document.querySelector(".popup__new-card-picture" );
//Основные кнопки добавления карточки
const popupCardEditor = document.querySelector(".popup_cards-editor");
const popupCardEditorCancelIcon = document.querySelector(".popup__cancel-cards");
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
const popupZoomPicture = document.querySelector(".popup__zoom-img");
const popupZoomCaption = document.querySelector(".popup__zoom-caption");
let detector = false;
//загатовка карточки для отрисовки
const cardTemplate = document.querySelector(".card__template");
//создание экземпляров класса валидации 
const validationProfile = new Validation(validationConfig, profileAddForm);
const validationCardEditor = new Validation(validationConfig, cardAddForm);
//функция добавления карточек
const renderElements = () => {
  const items = initialCards.map((element) => new Card(element, cardTemplate, zoomPopupSwitch).getCard());
  elements.append(...items);
};


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

function zoomPopupSwitch(event) {
  const pictureSrc = event.target.getAttribute("src");
  const pictureCaption = event.target.nextElementSibling.querySelector(
    ".elements__name"
  ).textContent;
  popupZoomPicture.setAttribute("src", pictureSrc);
  popupZoomCaption.textContent = pictureCaption;
  togglePopup(popupZoom);
}

function bindHandlers() {
  newCardForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const item = new Card({
      name: placeName.value,
      link: pictureLink.value,
    }, cardTemplate, zoomPopupSwitch).getCard();
    elements.prepend(item);
    placeName.value = "";
    pictureLink.value = "";
    togglePopup(popupCardEditor);
  });
}

//включение/выключение popup
function togglePopup(arg) {
  arg.classList.toggle("popup_active");
  if (detector === true) {
    removePopupListener();
    validationProfile.cleanErrors();
  } else {
    addPopupListener();
  }
}
//отправка формы
function submitFormHandler(event) {
  event.preventDefault();
  profileUserName.textContent = nameInput.value;
  profileUserStatus.textContent = jobInput.value;
  togglePopup(popupProfileEditor);
}

function renderValidation() {
  validationProfile.enableValidation();
  validationCardEditor.enableValidation();
}

renderValidation();
renderElements();
bindHandlers();

//добавим прослушку в профиль
profileEditButton.addEventListener("click", function () {
  nameInput.value = profileUserName.textContent;
  jobInput.value = profileUserStatus.textContent;
  validationProfile.setButtonState(profileAddForm.checkValidity());
  togglePopup(popupProfileEditor);

});
popupCancelIcon.addEventListener("click", function () {
  togglePopup(popupProfileEditor);
});

formElement.addEventListener("submit", submitFormHandler);

//окно добавления карточек
profileAddButton.addEventListener("click", function () {
  togglePopup(popupCardEditor);
});

popupCardEditorCancelIcon.addEventListener("click", function () {
  togglePopup(popupCardEditor);
});

popupZoomCancel.addEventListener("click", function () {
  togglePopup(popupZoom);
});

document.querySelectorAll(".popup").forEach((popup) => {
  popup.addEventListener("click", (event) => {
    if (event.target.classList.contains("popup")) {
      togglePopup(event.target);
    }
  });
});