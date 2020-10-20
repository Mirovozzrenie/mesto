//основной массив карточек
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
  ];

//Основные кнопки профиля 
const profileEditButton = document.querySelector('.profile__edit-button');
const popupCancelIcon = document.querySelector('.popup__cancel-icon');
const profileAddButton = document.querySelector('.profile__add-button');

//Основные кнопки добавления карточки
const popupCardEditor = document.querySelector('.popup__cards-editor');
const popupCardEditorCancelIcon = document.querySelector('.popup__cancel-cards');
const popupCardEditorSubmit = document.querySelector('.popup__save-cards');

//найдем в DOM осн элементы 
const popup = document.querySelector('.popup');
const profileUserName = document.querySelector('.profile__user-name');
const profileUserStatus = document.querySelector('.profile__user-status');
const formElement = document.querySelector('.popup__edit-form');
const nameInput = document.querySelector('.popup__user-name');
const jobInput = document.querySelector('.popup__user-status');
const elements = document.querySelector('.elements');
const placeName = document.querySelector('.popup__place-name');
const pictureLink = document.querySelector('.popup__picture-link');



//загатовка карточки для отрисовки 
const cardTemplate = document.querySelector('.card__template');

//функция добавления карточек 
const renderElements = () => {
  const items = initialCards.map(element => {
    return getCard(element);
  }).join('');

  elements.insertAdjacentHTML('afterbegin', items);
};

//добавление карточки через popup
const getCard = (data) => {
  return `<div class="elements__card">
        <img src="${data.link}" alt="" class="elements__picture">
        <div class="elements__place-panel">
          <h2 class="elements__name">${data.name}</h2>
          <button class="elements__like" type="button"></button>
        </div>
      </div>  `
}
renderElements();

const bindHandlers = () => {
    popupCardEditorSubmit.addEventListener('submit', () => {
        const item = getCard({
          name: placeName.value,
          link: pictureLink.value
        })
        elements.insertAdjacentHTML('afterbegin', items);
    })
    };
bindHandlers();
    //включение/выключение popup
    function popupToggle(arg) {
      arg.classList.toggle('popup_active');
    }
    //отправка формы 
    function formSubmitHandler(event) {
      event.preventDefault();
      profileUserName.textContent = nameInput.value;
      profileUserStatus.textContent = jobInput.value;
      popupToggle(popup);
    }


    //добавим прослушку в профиль 
    profileEditButton.addEventListener('click', function () {
      nameInput.value = profileUserName.textContent;
      jobInput.value = profileUserStatus.textContent;
      popupToggle(popup);
    });
    popupCancelIcon.addEventListener('click', function () {
      popupToggle(popup);
    });
    formElement.addEventListener('submit', formSubmitHandler);

    //окно добавления карточек 
    profileAddButton.addEventListener('click', function () {
      popupToggle(popupCardEditor);
    });
    popupCardEditorCancelIcon.addEventListener('click', function () {
      popupToggle(popupCardEditor);
    })
