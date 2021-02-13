class Card {
  constructor({ data, popupZoomSwitch }, cardTemplate) {
    this._name = data.name;
    this._link = data.link;
    this._cardTemplate = cardTemplate;
    this._popupZoomSwitch = popupZoomSwitch;
  }

  getCard = data => {
    const _card = this._cardTemplate.content.cloneNode(true);
    _card.querySelector(".elements__name").innerHTML = this._name;
    const _cardPicture = _card.querySelector(".elements__picture");
    _cardPicture.setAttribute("src", this._link);
    _cardPicture.addEventListener("click", this._popupZoomSwitch);
    const _cardLike = _card.querySelector(".elements__like");
    _cardLike.addEventListener("click", this._favoriteCard);
    const _cardRemove = _card.querySelector(".elements__remove-btn");
    _cardRemove.addEventListener("click", this._removeCard);
    return _card;
  };

  _favoriteCard = event => {
    event.target.classList.toggle("elements__like_condition_on");
  };

  _removeCard = event => {
    event.target.closest(".elements__card").remove();
  };
}

export { Card };
