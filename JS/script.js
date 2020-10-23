//основной массив карточек
const initialCards = [
  {
    name: "Архыз",
    link:
      "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg"
  },
  {
    name: "Челябинская область",
    link:
      "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg"
  },
  {
    name: "Иваново",
    link:
      "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg"
  },
  {
    name: "Камчатка",
    link:
      "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg"
  },
  {
    name: "Холмогорский район",
    link:
      "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg"
  },
  {
    name: "Байкал",
    link:
      "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg"
  }
];

//Основные кнопки профиля
const profileEditButton = document.querySelector(".profile__edit-button");
const popupCancelIcon = document.querySelector(".popup__cancel-icon");
const profileAddButton = document.querySelector(".profile__add-button");

//Основные кнопки добавления карточки
const popupCardEditor = document.querySelector(".popup__cards-editor");
const popupCardEditorCancelIcon = document.querySelector(
  ".popup__cancel-cards"
);
const popupCardEditorSubmit = document.querySelector(".popup__save-cards");

//найдем в DOM осн элементы
const popup = document.querySelector(".popup");
const profileUserName = document.querySelector(".profile__user-name");
const profileUserStatus = document.querySelector(".profile__user-status");
const formElement = document.querySelector(".popup__edit-form");
const nameInput = document.querySelector(".popup__user-name");
const jobInput = document.querySelector(".popup__user-status");
const elements = document.querySelector(".elements");
const placeName = document.querySelector(".popup__place-name");
const pictureLink = document.querySelector(".popup__picture-link");
const newCardForm = document.querySelector(".popup__new-card-picture");
const popupZoom = document.querySelector(".popup__zoom");
const popupZoomCancel = document.querySelector(".popup__zoom-cancel");
const popupZoomPicture = document.querySelector(".popup__zoom-img");
const popupZoomCaption = document.querySelector(".popup__zoom-caption");
//загатовка карточки для отрисовки
const cardTemplate = document.querySelector(".card__template");

//функция добавления карточек
const renderElements = () => {
  const items = initialCards.map(element => getCard(element));
  elements.append(...items);
};
const favoriteCard = event => {
  event.target.classList.toggle("elements__like_condition_on");
};
const removeCard = event => {
  event.target.closest(".elements__card").remove();
};

function popup__zoom(event) {
  const pictureSrc = event.target.getAttribute("src");
  const pictureCaption = event.target.nextElementSibling.querySelector('.elements__name').textContent;
  popupZoomPicture.setAttribute("src", pictureSrc);
  popupZoomCaption.textContent = pictureCaption;
  console.log(pictureCaption);
  console.log(pictureSrc);
  popupToggle(popupZoom);
}

//добавление карточки через popup
const getCard = data => {
  const card = cardTemplate.content.cloneNode(true);
  card.querySelector(".elements__name").innerHTML = data.name;
  card.querySelector(".elements__picture").setAttribute("src", data.link);

  const cardLike = card.querySelector(".elements__like");
  cardLike.addEventListener("click", favoriteCard);
  const cardRemove = card.querySelector(".elements__remove-btn");
  cardRemove.addEventListener("click", removeCard);

  const cardPicture = card.querySelector(".elements__picture");
  cardPicture.addEventListener("click", popup__zoom);

  return card;
};
renderElements();

function bindHandlers() {
  newCardForm.addEventListener("submit", () => {
    event.preventDefault();
    const item = getCard({
      name: placeName.value,
      link: pictureLink.value
    });
    elements.prepend(item);
  });
}
bindHandlers();
//включение/выключение popup
function popupToggle(arg) {
  arg.classList.toggle("popup_active");
}
//отправка формы
function formSubmitHandler(event) {
  event.preventDefault();
  profileUserName.textContent = nameInput.value;
  profileUserStatus.textContent = jobIubmitnput.value;
  popupToggle(popup);
}

//добавим прослушку в профиль
profileEditButton.addEventListener("click", function() {
  nameInput.value = profileUserName.textContent;
  jobInput.value = profileUserStatus.textContent;
  popupToggle(popup);
});
popupCancelIcon.addEventListener("click", function() {
  popupToggle(popup);
});
formElement.addEventListener("submit", formSubmitHandler);

//окно добавления карточек
profileAddButton.addEventListener("click", function() {
  popupToggle(popupCardEditor);
});
popupCardEditorCancelIcon.addEventListener("click", function() {
  popupToggle(popupCardEditor);
});

popupZoomCancel.addEventListener("click", function() {
  popupToggle(popupZoom);
});
