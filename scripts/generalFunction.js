function popupZoomSwitch(event) {
    const pictureSrc = event.target.getAttribute("src");
    const pictureCaption = event.target.nextElementSibling.querySelector(
      ".elements__name"
    ).textContent;
    popupZoomPicture.setAttribute("src", pictureSrc);
    popupZoomCaption.textContent = pictureCaption;
    popupToggle(popupZoom);
  }


function popupToggle(arg) {
    arg.classList.toggle("popup_active");
    if (detector === true) {
      removePopupListener();
    } else{
      addPopupListener()
    }
  }
  export {popupZoomSwitch, popupToggle};