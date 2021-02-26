import "./index.css";
import { Api } from "./../components/Api.js";
import { Card } from "./../components/card.js";
import { FormValidator, validationConfig } from "./../components/FormValidator.js";
import { Section } from "./../components/Section.js";
import { Popup } from "./../components/Popup.js";
import { PopupWithImage } from "./../components/PicturePopup.js";
import { PopupWithForm } from "./../components/PopupWithForm.js";
import { UserInfo } from "./../components/UserInfo.js";
import { profileEditButton } from "./../utils/const.js";
import { popupCancelIcon } from "./../utils/const.js";
import { profileAddButton } from "./../utils/const.js";
import { profileAddForm } from "./../utils/const.js";
import { cardAddForm } from "./../utils/const.js";
import { popupCardEditor } from "./../utils/const.js";
import { popupCardEditorCancelIcon } from "./../utils/const.js";
import { popupCardEditorSubmit } from "./../utils/const.js";
import { popupProfileEditor } from "./../utils/const.js";
import { profileUserName } from "./../utils/const.js";
import { profileUserStatus } from "./../utils/const.js";
import { formElement } from "./../utils/const.js";
import { nameInput } from "./../utils/const.js";
import { jobInput } from "./../utils/const.js";
import { placeName } from "./../utils/const.js";
import { pictureLink } from "./../utils/const.js";
import { newCardForm } from "./../utils/const.js";
import { popupZoom } from "./../utils/const.js";
import { popupZoomCancel } from "./../utils/const.js";
import { cardTemplate } from "./../utils/const.js";
import { profileAvatar } from "./../utils/const.js";
import { PopupConfirm } from "./../components/PopupConf.js";
import { profileAvatarBtn } from "./../utils/const.js";
import { profileAvatarForm } from "./../utils/const.js";
import { initialCards } from "./../utils/data.js";
// // // // // // // // // // // // // // // // // // // // // // // // // // // // // //
const validationAvatar = new FormValidator(validationConfig, profileAvatarForm);
const validationProfile = new FormValidator(validationConfig, profileAddForm);
const validationCardEditor = new FormValidator(validationConfig, cardAddForm);

function renderValidation() {
  validationProfile.enableValidation();
  validationCardEditor.enableValidation();
  validationAvatar.enableValidation();
}
renderValidation();
// // // // // // // // // // // // // // // // // // // // // // // // // // // // // //

const removeCardPopup = new PopupConfirm({
  popupSelector: ".popup_del"
});
removeCardPopup.setEventListeners();

function removeCardFromList(card, removeCardId) {
  const placeCardElement = card;
  const cardId = removeCardId;
  removeCardPopup.open();
  removeCardPopup.changeConfirmHandler(() => {
  removeCardPopup.changeButtonText();
  event.preventutils
    api
      .removeCard(cardId)
      .then(res => {
        return res;
      })
      .then(() => {
        placeCardElement.remove();
      })
      .then(() => {
        removeCardPopup.close();
      })
      .catch(err => {
        console.log(err); // выведем ошибку в консоль
      });
  });
}
// // // // // // // // // // // // // // // // // // // // // // // // // // // // // //

const zoomPopup = new PopupWithImage(".popup_zoom");
zoomPopup.setEventListeners();

function zoomPopupSwitch(event) {
  const pictureSrc = event.target.getAttribute("src");
  const pictureCaption = event.target.nextElementSibling.querySelector(
    ".elements__name"
  ).textContent;
  zoomPopup.open(pictureSrc, pictureCaption);
}
// // // // // // // // // // // // // // // // // // // // // // // // // // // // // //

const cardPopup = new PopupWithForm({
  popupSelector: ".popup_cards-editor",
  formSubmit: data => {
    bindHandlers(data);
  }
});
cardPopup.setEventListeners();

function bindHandlers(data) {
  cardPopup.changeButtonText();
  api
    .addNewCard(data)
    .then(res => renderPlaces(res))
    .then(() => {
      cardPopup.close();
    })
    .catch(err => {
      console.log(err); // выведем ошибку в консоль
    });
}
const newProfileAvatar = new PopupWithForm({
  popupSelector: ".popup_change-avatar",
  formSubmit: data => {
    newProfileAvatar.changeButtonText();
    api
      .patchUserAvatar(data)
      .then(res => {
        userInfo.setUserAvatar(res);
      })
      .then(() => {
        newProfileAvatar.close();
      })
      .catch(err => {
        console.log(err); // выведем ошибку в консоль
      });
  }
});
newProfileAvatar.setEventListeners();

const newProfilePopup = new PopupWithForm({
  popupSelector: ".popup_profile-editor",
  formSubmit: data => {
    submitFormHandler(data);
  }
});
newProfilePopup.setEventListeners();

const userInfo = new UserInfo({
  name: profileUserName,
  about: profileUserStatus,
  avatar: profileAvatar
});

function submitFormHandler(data) {
  newProfilePopup.changeButtonText();
  api
    .setUserServerInfo(data)
    .then(res => {
      userInfo.setUserInfo(res);
      userInfo.updateUserInfo();
    })
    .then(() => {
      newProfilePopup.close();
    })
    .catch(err => {
      console.log(err); // выведем ошибку в консоль
    });
}

function renderPlaces(data) {
  const newPlace = new Card(
    {
      data: data,
      popupZoomSwitch: zoomPopupSwitch,
      handleLikeCard: handleLikeCard,
      profileUserName: profileUserName,
      removeCardFromList: removeCardFromList
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

profileEditButton.addEventListener("click", function() {
  const data = userInfo.getUserInfo();
  nameInput.value = data.name;
  jobInput.value = data.status;
validationProfile.cleanErrors(); 
  validationProfile.setButtonState(profileAddForm.checkValidity());
  newProfilePopup.open();
});

profileAddButton.addEventListener("click", event => {
  validationCardEditor.cleanErrors();
  cardPopup.open();
});

profileAvatarBtn.addEventListener("click", event => {
  validationAvatar.cleanErrors();
  newProfileAvatar.open();
});

const handleLikeCard = card => {
  const cardId = card.cardId;
  if (card.isLiked()) {
    api
      .removeLike(cardId)
      .then(res => {
        card.favoriteCardHandle(res);
      })
      .catch(err => {
        console.log(err);
      });
  } else {
    api
      .addLike(cardId)
      .then(res => {
        card.favoriteCardHandle(res);
      })
      .catch(err => {
        console.log(err);
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

Promise.all([api.getInitialCards(), api.getUserServerInfo()])
  .then(([cardsInitialRes, userServerRes]) => {
    userInfo.setUserInfo(userServerRes);
    userInfo.updateUserInfo();
    placeList.renderItems(cardsInitialRes);
  })
  .catch(err => {
    console.log(err); // выведем ошибку в консоль
  });