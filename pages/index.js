import "./index.css";
import { Api } from "./../components/Api.js";
import { Card } from "./../components/card.js";
import { Validation, validationConfig } from "./../components/FormValidator.js";
import { Section } from "./../components/Section.js";
import { Popup } from "./../components/Popup.js";
import { PopupWithImage } from "./../components/PicturePopup.js";
import { PopupWithForm } from "./../components/PopupWithForm.js";
import { UserInfo } from "./../components/UserInfo.js";
import { profileEditButton } from "./../components/const.js";
import { popupCancelIcon } from "./../components/const.js";
import { profileAddButton } from "./../components/const.js";
import { profileAddForm } from "./../components/const.js";
import { cardAddForm } from "./../components/const.js";
import { popupCardEditor } from "./../components/const.js";
import { popupCardEditorCancelIcon } from "./../components/const.js";
import { popupCardEditorSubmit } from "./../components/const.js";
import { popupProfileEditor } from "./../components/const.js";
import { profileUserName } from "./../components/const.js";
import { profileUserStatus } from "./../components/const.js";
import { formElement } from "./../components/const.js";
import { nameInput } from "./../components/const.js";
import { jobInput } from "./../components/const.js";
import { placeName } from "./../components/const.js";
import { pictureLink } from "./../components/const.js";
import { newCardForm } from "./../components/const.js";
import { popupZoom } from "./../components/const.js";
import { popupZoomCancel } from "./../components/const.js";
import { cardTemplate } from "./../components/const.js";
import { profileAvatar } from "./../components/const.js";
import { PopupConfirm } from "./../components/PopupConf.js";
import { profileAvatarBtn } from "./../components/const.js";
import { profileAvatarForm } from "./../components/const.js";
import { initialCards } from "./../components/data.js";
// // // // // // // // // // // // // // // // // // // // // // // // // // // // // //
const validationAvatar = new Validation(validationConfig, profileAvatarForm);
const validationProfile = new Validation(validationConfig, profileAddForm);
const validationCardEditor = new Validation(validationConfig, cardAddForm);

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
    event.preventDefault();
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
    .addNewCard()
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
      .patchUserAvatar()
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
    submitFormHandler();
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
    .setUserServerInfo()
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
  let data = [];
  data = userInfo.getUserInfo();
  nameInput.value = data.name;
  jobInput.value = data.status;

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
  const cardId = card._cardId;
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

//
//api
//  .getInitialCards()
//  .then(cardsData => {
//    placeList.renderItems(cardsData);
//  })
//  .catch(err => {
//    console.log(err); // выведем ошибку в консоль
//  });
//
//api
//  .getUserServerInfo()
//  .then(userServerData => {
//    userInfo.setUserInfo(userServerData);
//    userInfo.updateUserInfo();
//  })
//  .catch(err => {
//    console.log(err); // выведем ошибку в консоль
//  });
//
