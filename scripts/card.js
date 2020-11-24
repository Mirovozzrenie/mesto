import {popupToggle, popupZoom} from './script.js';

class Card {
  constructor(data) {
    data.name = name;
    data.link = link;
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
    this._element.querySelector(".elements__picture").addEventListener("click", (event) => {
      const pictureSrc = event.target.getAttribute("src");
      const pictureCaption = event.target.nextElementSibling.querySelector(".elements__name").textContent;
      popupZoomPicture.setAttribute("src", pictureSrc);
      popupZoomCaption.textContent = pictureCaption;
      const popupZoom = this._element.querySelector(".popup_zoom");
      popupToggle(popupZoom) { 
      arg.classList.toggle("popup_active");
      if (detector === true) {
        removePopupListener();
        } else {
        addPopupListener()
        }
     }
    });
  }
}