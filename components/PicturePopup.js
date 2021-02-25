import { Popup } from "./Popup.js";

class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._popupZoomPicture = this._popup.querySelector(".popup__zoom-img");
    this._pupZoomCaption = this._popup.querySelector(".popup__zoom-caption");
  }

  open(pictureSrc, pictureCaption) {
    this._popupZoomPicture.setAttribute("src", pictureSrc);
    this._pupZoomCaption.textContent = pictureCaption;
    super.open();
  }
}

export { PopupWithImage };
