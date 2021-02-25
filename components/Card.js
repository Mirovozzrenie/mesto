class Card {
  constructor(
    {
      data,
      popupZoomSwitch,
      handleLikeCard,
      profileUserName,
      removeCardFromList
    },
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
    this._handleLikeCard = handleLikeCard;
    this._removeCardFromList = removeCardFromList;
  }

  getCard = data => {
    this._card = this._cardTemplate.content.children[0].cloneNode(true);
    this._card.querySelector(".elements__name").innerHTML = this._name;
    const _cardPicture = this._card.querySelector(".elements__picture");
    _cardPicture.setAttribute("src", this._link);
    _cardPicture.addEventListener("click", this._popupZoomSwitch);
    this._cardLike = this._card.querySelector(".elements__like");
    this._cardLike.addEventListener("click", this.favoriteCard);
    this._cardRemove = this._card.querySelector(".elements__remove-btn");
    this._cardRemove.addEventListener("click", (event) => {
      this.pin = event.target.closest(".elements__card");
      this._handleDelete(this.pin, this._cardId);
    });
    this._cardLikes = this._card.querySelector(".elements__like-counter");
    this._cardLikes.textContent = this._likes.length;

    if (this._ownerId === this._userId) {
      this._cardRemove.classList.remove(
        "elements__remove-btn_condition_disabled"
      );
    } else {
      this._cardRemove.classList.add("elements__remove-btn_condition_disabled");
    }

    if (this.isLiked()) {
      this._cardLike.classList.add("elements__like_condition_on");
    } else {
      this._cardLike.classList.remove("elements__like_condition_on");
    }

    return this._card;
  };

  favoriteCard = event => {
    this._handleLikeCard(this);
  };

  _handleDelete(pin, removeCardId) {
    this._removeCardFromList(pin, removeCardId);
  }

  favoriteCardHandle(res) {
    this._cardLike.classList.toggle("elements__like_condition_on");
    this._likes = res.likes;
    this._cardLikes.textContent = res.likes.length;
  }

  isLiked() {
    return !!this._likes.find(({ _id }) => _id === this._userId);
  }
}

export { Card };
