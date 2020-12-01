import {popupZoomSwitch} from generalFunction.js;
export default class Card {
  constructor(data) {
    this.name = data.name;
    this.link = data.link;
  }
  
  _getTemplate() {
    const cardElement = document.querySelector(".card__template").content.cloneNode(true);
    return cardElement;
  }
  
  generateCard() {
    this._element = this._getTemplate();
    this._elemet.querySelector(".elements__name").innerHTML = this.name;
    this._element.querySelector(".elements__picture").setAttribute("src", this.link);
  }
  
  cardLike() {
    this._element.querySelector(".elements__like").addEventListener("click",  (event) => {
      event.target.classList.toggle("elements__like_condition_on");
    });
  }
  
  cardRemove() {
    this._element.querySelector(".elements__remove-btn").addEventListener("click", (event) => {
      event.target.closest(".elements__card").remove();
    });
  }
  cardPicture() {
    this._element.querySelector(".elements__picture").addEventListener("click", popupZoomSwitch);
  }
}