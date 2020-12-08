let detector = false;

function popupToggle(arg) {
  arg.classList.toggle("popup_active");
  if (detector === true) {
    removePopupListener();
  } else {
    addPopupListener();
  }
}
function removePopupListener() {
  document.removeEventListener("keydown", popupCloseEsc);
  detector = false;
}

function addPopupListener() {
  document.addEventListener("keydown", popupCloseEsc);
  detector = true;
}

function popupCloseEsc(event) {
  const activePopup = document.querySelector(".popup.popup_active");
  if (activePopup && event.key === "Escape") {
    popupToggle(activePopup);
  }
}

export { popupToggle };
