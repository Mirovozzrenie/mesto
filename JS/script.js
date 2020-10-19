const initialCards = [
    {
        name: 'Архыз',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
    },
    {
        name: 'Челябинская область',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
    },
    {
        name: 'Иваново',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
    },
    {
        name: 'Камчатка',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
    },
    {
        name: 'Холмогорский район',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
    },
    {
        name: 'Байкал',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
    }
  ]
;//Найдем в DOM основные кнопки 
let profileEditButton = document.querySelector('.profile__edit-button');
let popupCancelIcon = document.querySelector('.popup__cancel-icon');
//найдем в DOM осн элементы 
let popup = document.querySelector('.popup');
let profileUserName = document.querySelector('.profile__user-name');
let profileUserStatus = document.querySelector('.profile__user-status');
let formElement = document.querySelector('.popup__edit-form');
let nameInput = document.querySelector('.popup__user-name');
let jobInput = document.querySelector('.popup__user-status');
const elements = document.querySelector('.elements');
//загатовка карточки для отрисовки 
const cardTemplate = document.querySelector('.card__template');

//функция добавления карточек 
const renderElements = () => {
const items =  initialCards.map(element => {
    return `<div class="elements__card">
        <img src="${initialCards.link}" alt="" class="elements__picture">
        <div class="elements__place-panel">
          <h2 class="elements__name">${initialCards.name}</h2>
          <button class="elements__like" type="button"></button>
        </div>
      </div>`
  }).join('');

elements.insertAdjacentHTML('afterbegin', items);
console.log(items);
};
renderElements();
//функции видимости блока popup
function popupActivation() {
  nameInput.value = profileUserName.textContent;
  jobInput.value = profileUserStatus.textContent;
  popup.classList.add('popup_active');
}

function popupDeactivation() {
  popup.classList.remove('popup_active');
}

function formSubmitHandler(event) {
  event.preventDefault();
  profileUserName.textContent = nameInput.value;
  profileUserStatus.textContent = jobInput.value;
  popupDeactivation();
}
   

//добавим прослушку
profileEditButton.addEventListener('click', popupActivation);
popupCancelIcon.addEventListener('click', popupDeactivation);
formElement.addEventListener('submit', formSubmitHandler);

