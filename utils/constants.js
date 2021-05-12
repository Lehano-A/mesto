export {
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
}


// ШАБЛОН КАРТОЧКИ
const template = document.querySelector(".template-element");

// СЕЛЕКТОР РАЗМЕТКИ ДЛЯ ВСТАВКИ КАРТОЧЕК
const elements = '.elements';

// КРЕСТИК ЗАКРЫТИЯ ПОПАПОВ
const popupButtonClose = document.querySelector(".popup__button-close");



/* -------------------------------------------------------------------------- */
/*                               ID ВСЕХ ПОПАПОВ                              */
/* -------------------------------------------------------------------------- */

const popupsSelectors = {
  popupProfile: '#popup-open-profile',
  popupZoomOpenCardImage: '#popup-open-card-image',
  popupAddNewCard: '#popup-add-new-card',
}



/* -------------------------------------------------------------------------- */
/*                     СЕЛЕКТОРА ИМЕНИ И СТАТУСА ПРОФАЙЛА                     */
/* -------------------------------------------------------------------------- */

const selectorsProfileElements = {
  name: '.profile__name',
  status: '.profile__status',
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
/*                                   ПРОФАЙЛ                                  */
/* -------------------------------------------------------------------------- */

// БЛОК ПРОФАЙЛА
const profile = document.querySelector(".profile");

// КНОПКА ОТКРЫТИЯ ПРОФАЙЛА
const editButton = document.querySelector(".profile__edit-button");

// ФОРМА ПРОФАЙЛА
const profileFormElement = document.querySelector(".popup__form");

// ПОЛЯ ИМЕНИ ПРОФАЙЛА
const nameInputProfile = profileFormElement.querySelector("#popup-name");

// ПОЛЯ СТАТУСА ПРОФАЙЛА
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






