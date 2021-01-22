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
const profileAddForm = document.querySelector(".popup__new-card-picture");
const cardAddForm = document.querySelector(".popup__new-profile-info");
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
//загатовка карточки для отрисовки
const cardTemplate = document.querySelector(".card__template");
//функция добавления карточек
const renderElements = () => {
  const items = initialCards.map((element) => new Card(element, cardTemplate, popupZoomSwitch).getCard());
  elements.append(...items);
};

let detector = false;

function removePopupListener(e) {
  document.removeEventListener("keydown", popupCloseEsc);
  detector = false;
}

function addPopupListener(e) {
  document.addEventListener("keydown", popupCloseEsc);
  detector = true;
}

function popupCloseEsc(event) {
  const activePopup = document.querySelector(".popup.popup_active");
  if (activePopup && event.key === "Escape") {
    popupToggle(activePopup);
  }
}

function popupZoomSwitch(event) {
  const pictureSrc = event.target.getAttribute("src");
  const pictureCaption = event.target.nextElementSibling.querySelector(
    ".elements__name"
  ).textContent;
  popupZoomPicture.setAttribute("src", pictureSrc);
  popupZoomCaption.textContent = pictureCaption;
  popupToggle(popupZoom);
}

function bindHandlers() {
  newCardForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const item = new Card({
      name: placeName.value,
      link: pictureLink.value,
    }, cardTemplate, popupZoomSwitch).getCard();
    elements.prepend(item);
    placeName.value = "";
    pictureLink.value = "";
    popupToggle(popupCardEditor);
  });
}

//включение/выключение popup
function popupToggle(arg) {
  arg.classList.toggle("popup_active");
  if (detector === true) {
    removePopupListener();
  } else {
    addPopupListener();
  }
}
//отправка формы
function formSubmitHandler(event) {
  event.preventDefault();
  profileUserName.textContent = nameInput.value;
  profileUserStatus.textContent = jobInput.value;
  popupToggle(popupProfileEditor);
}
renderElements();
bindHandlers();

//добавим прослушку в профиль
profileEditButton.addEventListener("click", function () {
  nameInput.value = profileUserName.textContent;
  jobInput.value = profileUserStatus.textContent;
  const validationFormAdd = new Validation(validationConfig, popupProfileEditor).enableValidation();
  //enableValidation(validationConfig);
  popupToggle(popupProfileEditor);

});
popupCancelIcon.addEventListener("click", function () {
  popupToggle(popupProfileEditor);
});
formElement.addEventListener("submit", formSubmitHandler);

//окно добавления карточек
profileAddButton.addEventListener("click", function () {
  const validationFormAdd = new Validation(validationConfig, popupCardEditor).enableValidation();
  //  enableValidation(validationConfig);
  popupToggle(popupCardEditor);
});
popupCardEditorCancelIcon.addEventListener("click", function () {
  popupToggle(popupCardEditor);
});
popupZoomCancel.addEventListener("click", function () {
  popupToggle(popupZoom);
});

document.querySelectorAll(".popup").forEach((popup) => {
  popup.addEventListener("click", (event) => {
    if (event.target.classList.contains("popup")) {
      popupToggle(event.target);
    }
  });
});