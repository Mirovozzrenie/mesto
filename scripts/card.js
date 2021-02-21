import { profileUserName } from "./const.js";

class Card {
  constructor(
    { data, popupZoomSwitch, popupRemoveCard, handleLikeCard },
    cardTemplate
  ) {
    this._name = data.name;
    this._link = data.link;
    this._cardTemplate = cardTemplate;
    this._popupZoomSwitch = popupZoomSwitch;
    this._likes = data.likes;
    this._ownerId = data.owner._id;
    this._userId = profileUserName._id;
    this._cardId = data._id;
    this._popupRemoveCard = popupRemoveCard;
    this._handleLikeCard = handleLikeCard;
  }

  getCard = data => {
    const _card = this._cardTemplate.content.cloneNode(true);
    _card.querySelector(".elements__name").innerHTML = this._name;
    const _cardPicture = _card.querySelector(".elements__picture");
    _cardPicture.setAttribute("src", this._link);
    _cardPicture.addEventListener("click", this._popupZoomSwitch);
    const _cardLike = _card.querySelector(".elements__like");
    _cardLike.addEventListener("click", this.favoriteCard);
    const _cardRemove = _card.querySelector(".elements__remove-btn");
    _cardRemove.addEventListener("click", this._removeCard);
    const _cardLikes = _card.querySelector(".elements__like-counter");
    _cardLikes.textContent = this._likes.length;

    if (this._ownerId === this._userId) {
      _cardRemove.classList.remove("elements__remove-btn_condition_disabled");
    } else {
      _cardRemove.classList.add("elements__remove-btn_condition_disabled");
    }
    if (this.isLiked()) {
      _cardLike.classList.add('elements__like_condition_on');
    } else {
      _cardLike.classList.remove('elements__like_condition_on');
    }
    return _card;
  };

  favoriteCard = event => {

    this._handleLikeCard(this);
  };

  _removeCard = event => {
    this._popupRemoveCard.open(this);
  };

  isLiked() {
    return !!this._likes.find(({ _id }) => _id ===  this._userId );
  }
}

export { Card };
