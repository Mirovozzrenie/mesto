import { Popup } from "./Popup.js";

class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._popupZoomPicture = document.querySelector(".popup__zoom-img");
    this._pupZoomCaption = document.querySelector(".popup__zoom-caption");
  }

  open(pictureSrc, pictureCaption) {
    this._popupZoomPicture.setAttribute("src", pictureSrc);
    this._pupZoomCaption.textContent = pictureCaption;
    super.open();
  }
}

export { PopupWithImage };
