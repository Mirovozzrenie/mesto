let detector = false;
function removePopupListener (){
  document.removeEventListener('keydown', popupCloseEsc);
  detector = false;
}

function addPopupListener (){
  document.addEventListener('keydown', popupCloseEsc);
  detector = true;
}
function popupToggle(arg) {
    arg.classList.toggle("popup_active");
    if (detector === true) {
      removePopupListener();
    } else{
      addPopupListener()
    }
  }
  export {popupToggle, detector, addPopupListener, removePopupListener};