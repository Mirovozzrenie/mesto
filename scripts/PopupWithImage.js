import { Popup } from './Popup.js';

class PopupWithImage extends Popup {
  constructor(popupSelector){ 
    super(popupSelector, )
    this._popupZoomPicture = document.querySelector(".popup__zoom-img");
    this._pupZoomCaption = document.querySelector(".popup__zoom-caption");
  }
  
  open(pictureSrc, pictureCaption) {
//    console.log(pictureSrc);
//    console.log(pictureCaption);
    //  popupZoomPicture.setAttribute("src", pictureSrc);
    this._popupZoomPicture.setAttribute("src", pictureSrc);
    this._pupZoomCaption.textContent = pictureCaption;

//    this._popupZoomPicture.src = data.link;
//    this._pupZoomCaption.textContent = data.name;
    super.open();
//    console.log('Мы открылись');
  }
}

export { PopupWithImage };