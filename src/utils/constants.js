export {
  dataApi,
  popupsSelectors,
  elements,
  editButton,
  popupButtonClose,
  profileFormElement,
  nameInputProfile,
  statusInputProfile,
  buttonCloseCardImage,
  cardImageZoom,
  titleCardZoom,
  profile,
  addNewCardButton,
  windowAddNewCard,
  formAddNewCard,
  popupAddNewCardButtonClose,
  template,
  enableValidationConfig,
  selectorsProfileElements,
  profileElements,
  popupAreYouSureElements,
}



/* -------------------------------------------------------------------------- */
/*                               ПОПАП-ЭЛЕМЕНТЫ                               */
/* -------------------------------------------------------------------------- */

// КРЕСТИК ЗАКРЫТИЯ ПОПАПОВ
const popupButtonClose = document.querySelector(".popup__button-close");



/* -------------------------------------------------------------------------- */
/*                       ЭЛЕМЕНТЫ ПОПАПА - ARE YOU SURE                       */
/* -------------------------------------------------------------------------- */

const popupAreYouSureElements = {
  popup: document.querySelector('#popup-are-you-sure'),
  buttonClose: document.querySelector('#are-you-sure-button-close'),
  buttonAccept: document.querySelector('#are-you-sure-button-accept'),
}



/* -------------------------------------------------------------------------- */
/*                               ШАБЛОН КАРТОЧКИ                              */
/* -------------------------------------------------------------------------- */

const template = document.querySelector(".template-element");


// СЕЛЕКТОР РАЗМЕТКИ ДЛЯ ВСТАВКИ КАРТОЧЕК
const elements = '.elements';



/* -------------------------------------------------------------------------- */
/*                               ID ВСЕХ ПОПАПОВ                              */
/* -------------------------------------------------------------------------- */

const popupsSelectors = {
  popupProfile: '#popup-open-profile',
  popupZoomOpenCardImage: '#popup-open-card-image',
  popupAddNewCard: '#popup-add-new-card',
  popupAvatarProfile: '#popup-edit-avatar-profile',
  popupAreYouSure: '#popup-are-you-sure',
}


/* -------------------------------------------------------------------------- */
/*                              ЭЛЕМЕНТЫ ПРОФАЙЛА                             */
/* -------------------------------------------------------------------------- */

const profileElements = {
  name: document.querySelector('.profile__name'),
  status: document.querySelector('.profile__status'),
  avatar: document.querySelector('.profile__photo'),
  avatarBox: document.querySelector('.profile__photo-box'),

}


/* -------------------------------------------------------------------------- */
/*                     СЕЛЕКТОРА ИМЕНИ, СТАТУСА И АВАТАРА ПРОФАЙЛА                     */
/* -------------------------------------------------------------------------- */

const selectorsProfileElements = {
  name: '.profile__name',
  status: '.profile__status',
  avatar: '.profile__photo',
}



/* -------------------------------------------------------------------------- */
/*                            ДАННЫЕ ДЛЯ ВАЛИДАЦИИ                            */
/* -------------------------------------------------------------------------- */

const enableValidationConfig = {
  formSelector: ".popup__form", // ФОРМА
  inputSelector: ".popup__input", // ПОЛЕ
  submitButtonSelector: ".popup__button-save", // КНОПКА "ОТПРАВКИ ДАННЫХ"
  inactiveButtonClass: "popup__button-save_disabled", // КНОПКА "ОТПРАВКА ДАННЫХ" НЕАКТИВНА
  inputErrorClass: "popup__input_error_visible", // СТИЛЬ ПОЛЯ ВО ВРЕМЯ НЕВАЛИДНОСТИ
  errorClass: "popup__input_visible", // СПАН С ОШИБКОЙ В ПОЛЕ АКТИВЕН
  spanErrorActive: "popup__input-error_active", // СПАН С ОШИБКОЙ АКТИВЕН
};




/* -------------------------------------------------------------------------- */
/*                                     API                                    */
/* -------------------------------------------------------------------------- */

const dataApi = {
  profile: {
    baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-24/users/me',
  },

  cards: {
    baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-24/cards',
  },

  avatarProfile: {
    baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-24/users/me/avatar',
  },

  likes: {
    baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-24/cards/likes',
  },

  myIdProfile: '71c6bcf75b7f5095f6b3ea1f',

  authorizationToken: 'a01ca780-a2b9-4eac-8ef8-6ccbfc06da5f',
}




/* -------------------------------------------------------------------------- */
/*                                   ПРОФАЙЛ                                  */
/* -------------------------------------------------------------------------- */

// БЛОК ПРОФАЙЛА
const profile = document.querySelector(".profile");

// КНОПКА ОТКРЫТИЯ ПРОФАЙЛА
const editButton = document.querySelector(".profile__edit-button");

// ФОРМА ПРОФАЙЛА
const profileFormElement = document.querySelector(".popup__form");

// ПОЛЕ ИМЕНИ ПРОФАЙЛА
const nameInputProfile = profileFormElement.querySelector("#popup-name");

// ПОЛЕ СТАТУСА ПРОФАЙЛА
const statusInputProfile = profileFormElement.querySelector("#popup-status");



/* -------------------------------------------------------------------------- */
/*                             КАРТОЧКА В МАСШТАБЕ                            */
/* -------------------------------------------------------------------------- */

// ПОПАП МАСШТАБНОГО ОТКРЫТИЯ КАРТОЧКИ
const popupZoomOpenCardImage = document.querySelector('#popup-open-card-image');

// АЙДИ КРЕСТИКА ЗАКРЫТИЯ КАРТИНКИ В МАСШТАБЕ
const buttonCloseCardImage = popupZoomOpenCardImage.querySelector("#button-close-card-image");

// КАРТИНКА В МАСШТАБЕ
const cardImageZoom = popupZoomOpenCardImage.querySelector("#popup-image");

// ТУТУЛЬНИК КАРТИНКИ В МАСШТАБЕ
const titleCardZoom = popupZoomOpenCardImage.querySelector("#popup-title-card-image");




/* -------------------------------------------------------------------------- */
/*                          ДОБАВЛЕНИЕ НОВОЙ КАРТОЧКИ                         */
/* -------------------------------------------------------------------------- */

// КНОПКА ДОБАВЛЕНИЯ НОВОЙ КАРТОЧКИ
const addNewCardButton = profile.querySelector(".profile__add-button");

// ОКОШКО ДОБАВЛЕНИЯ НОВОЙ КАРТОЧКИ
const windowAddNewCard = document.querySelector("#window-add-new-card");

// ФОРМА ДОБАВЛЕНИЯ НОВОЙ КАРТОЧКИ
const formAddNewCard = windowAddNewCard.querySelector("#form-add-new-card");

// АЙДИ КРЕСТИКА ЗАКРЫТИЯ ПОПАПА ДОБАВЛЕНИЯ НОВОЙ КАРТОЧКИ
const popupAddNewCardButtonClose = windowAddNewCard.querySelector("#add-new-card-button-close");


