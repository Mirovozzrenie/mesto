import { popupToggle } from "./generalFunction.js";

const popupZoomPicture = document.querySelector(".popup__zoom-img");
const popupZoomCaption = document.querySelector(".popup__zoom-caption");
const popupZoom = document.querySelector(".popup_zoom");

export default class Card {
  constructor(data) {
    this.name = data.name;
    this.link = data.link;
  }

  _getTemplate() {
    const cardElement = document
      .querySelector(".elements__template")
      .content.cloneNode(true);
    return cardElement;
  }

  _generateCard() {
    this._element = this._getTemplate();
    this._element.querySelector(".elements__name").innerHTML = this.name;
    this._element
      .querySelector(".elements__picture")
      .setAttribute("src", this.link);
    this._element
      .querySelector(".elements__like")
      .addEventListener("click", this.cardLike);
    this._element
      .querySelector(".elements__remove-btn")
      .addEventListener("click", this.cardRemove);
    this._element
      .querySelector(".elements__picture")
      .addEventListener("click", this.popupZoomSwitch);
    return this._element;
  }

  cardLike(event) {
    event.target.classList.toggle("elements__like_condition_on");
  }

  cardRemove(event) {
    event.target.closest(".elements__card").remove();
  }

  popupZoomSwitch(event) {
    const pictureSrc = event.target.getAttribute("src");
    const pictureCaption = event.target.nextElementSibling.querySelector(
      ".elements__name"
    ).textContent;
    popupZoomPicture.setAttribute("src", pictureSrc);
    popupZoomCaption.textContent = pictureCaption;
    popupToggle(popupZoom);
  }
}
