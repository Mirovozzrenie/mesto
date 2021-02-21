import "./../pages/index.css";
import { Api } from "./Api.js";
import { initialCards } from "./data.js";
import { Card } from "./card.js";
import { Validation, validationConfig } from "./validation.js";
import { Section } from "./Section.js";
import { Popup } from "./Popup.js";
import { PopupWithImage } from "./PopupWithImage.js";
import { PopupWithForm } from "./PopupWithForm.js";
import { UserInfo } from "./UserInfo.js";
import { profileEditButton } from "./const.js";
import { popupCancelIcon } from "./const.js";
import { profileAddButton } from "./const.js";
import { profileAddForm } from "./const.js";
import { cardAddForm } from "./const.js";
import { popupCardEditor } from "./const.js";
import { popupCardEditorCancelIcon } from "./const.js";
import { popupCardEditorSubmit } from "./const.js";
import { popupProfileEditor } from "./const.js";
import { profileUserName } from "./const.js";
import { profileUserStatus } from "./const.js";
import { formElement } from "./const.js";
import { nameInput } from "./const.js";
import { jobInput } from "./const.js";
import { placeName } from "./const.js";
import { pictureLink } from "./const.js";
import { newCardForm } from "./const.js";
import { popupZoom } from "./const.js";
import { popupZoomCancel } from "./const.js";
import { cardTemplate } from "./const.js";
import { profileAvatar } from "./const.js";
import { PopupConfirm } from "./PopupConf.js";
import { profileAvatarBtn } from "./const.js";
import { profileAvatarForm } from "./const.js";

const validationAvatar = new Validation(validationConfig, profileAvatarForm);
const validationProfile = new Validation(validationConfig, profileAddForm);
const validationCardEditor = new Validation(validationConfig, cardAddForm);
//let detector = false;
//
//function removePopupListener(e) {
//  document.removeEventListener("keydown", closePopupEsc);
////  detector = false;
//}
//
//function addPopupListener(e) {
//  document.addEventListener("keydown", closePopupEsc);
////  detector = true;
//}

//function closePopupEsc(event) {
//  const activePopup = document.querySelector(".popup.popup_active");
//  if (activePopup && event.key === "Escape") {
//    togglePopup(activePopup);
//  }
//}
/////

const removeCardPopup = new PopupConfirm({
  popupSelector: ".popup_del",
  formSubmit: data => {
    removeCardFromList(data);
  }
});
removeCardPopup.setEventListeners();

function removeCardFromList(cardData, cardElement) {
  const placeCardElement = placeCardElement;
  removeCardPopup.changeButtonText()
  console.log(cardData)
  console.log(cardElement)
  api
    .removeCard(cardData._cardId)
    .then(res =>{cardElement.remove()} ).then(()=>{removeCardPopup.close();})
    .catch(err => {
      console.log(err); // выведем ошибку в консоль
    });
}
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
  console.log(data);
  api
    .addNewCard()
    .then(res => res.json().then(res => console.log(res)))
    .catch(err => {
      console.log(err); // выведем ошибку в консоль
    });
  //  const item = new Card(
  //    {
  //      data: data,
  //      popupZoomSwitch: zoomPopupSwitch
  //    },
  //    cardTemplate
  //  ).getCard();
  //  placeList.setItem(item);

  cardPopup.close();
}
const newProfileAvatar = new PopupWithForm({
  popupSelector: ".popup_change-avatar",
  formSubmit: data => {
    newProfileAvatar.changeButtonText();
    api.patchUserAvatar().then((res) =>{
      userInfo.setUserAvatar(res)}).then(()=>{newProfileAvatar.close()}).catch(err => {
      console.log(err); // выведем ошибку в консоль
    });
  }
});
newProfileAvatar.setEventListeners();

const newProfilePopup = new PopupWithForm({
  popupSelector: ".popup_profile-editor",
  formSubmit: data => {
    submitFormHandler();
  }
});
newProfilePopup.setEventListeners();

const userInfo = new UserInfo(
  profileUserName,
  profileUserStatus,
  profileAvatar
);
function submitFormHandler(data) {
  //  userInfo.setUserInfo(nameInput.value, jobInput.value);
  //  userInfo.updateUserInfo();
   newProfilePopup.changeButtonText();
  api
    .setUserServerInfo()
    .then(res => {
      userInfo.setUserInfo(res);
      userInfo.updateUserInfo();
    }).then(()=>{newProfilePopup.close();})
    .catch(err => {
      console.log(err); // выведем ошибку в консоль
    });
}

function renderValidation() {
  validationProfile.enableValidation();
  validationCardEditor.enableValidation();
  validationAvatar.enableValidation();
}

////
function renderPlaces(data) {
  const newPlace = new Card(
    {
      data: data,
      popupZoomSwitch: zoomPopupSwitch,
      popupRemoveCard: removeCardPopup,
      handleLikeCard: handleLikeCard
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
//placeList.renderItems(initialCards);

renderValidation();

profileEditButton.addEventListener("click", function() {
  let data = [];
  data = userInfo.getUserInfo();
  nameInput.value = data.name;
  jobInput.value = data.status;

  validationProfile.setButtonState(profileAddForm.checkValidity());
  newProfilePopup.open();
});

//окно добавления карточек
profileAddButton.addEventListener("click", event => {
  validationCardEditor.cleanErrors();
  cardPopup.open();
});

profileAvatarBtn.addEventListener("click", event => {
  validationAvatar.cleanErrors();
  newProfileAvatar.open();
});

const handleLikeCard = card => {
  const cardId = card._cardId;
  if (card.isLiked()) {
    api
      .removeLike(cardId)
      .then(res => {
        card.favoriteCard(res);
      })
      .catch(err => {
        console.log(err); // выведем ошибку в консоль
      });
  } else {
    api
      .addLike(cardId)
      .then(res => {
        card.favoriteCard(res);
      })
      .catch(err => {
        console.log(err); // выведем ошибку в консоль
      });
  }
};

const api = new Api({
  url: "https://mesto.nomoreparties.co",
  headers: {
    "content-type": "application/json",
    authorization: "4f7a8deb-b8dc-4715-b562-817f1a68a8cc"
  },
  groupId: "cohort-20"
});
api
  .getInitialCards()
  .then(cardsData => {
    placeList.renderItems(cardsData);
  })
  .catch(err => {
    console.log(err); // выведем ошибку в консоль
  });
//

api
  .getUserServerInfo()
  .then(userServerData => {
    userInfo.setUserInfo(userServerData);
    userInfo.updateUserInfo();
  })
  .catch(err => {
    console.log(err); // выведем ошибку в консоль
  });
//

Promise.all([api.getUserServerInfo(), api.getInitialCards()])
  .then(([userRes, cardRes]) => {
    userInfo.setUserInfo(userRes);
    userInfo.setUserAvatar(userRes);
    userInfo.id = userRes._id;
    const cardsArr = cardRes.map(({ name, link, owner, _id, likes }) => ({
      name,
      link,
      owner,
      _id,
      likes,
    }));
    placeList.renderItems(cardsArr);
  }).catch(err => {
    console.log(err);  
  });
