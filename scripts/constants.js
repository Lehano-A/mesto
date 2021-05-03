export {
  popups, elements, editButton, popupProfile, profileFormElement, nameInput, statusInput, profileName, profileStatus,
  popupZoomOpenCardImage, buttonCloseCardImage, cardImageZoom, titleCardZoom, profile, addNewCardButton, popupAddNewCard, windowAddNewCard,
  formAddNewCard, popupAddNewCardButtonClose, template, addNewCardTitle, addNewCardLink, enableValidationConfig
}

/////////////////////////////////////////////////
// БЛОК ПЕРЕМЕННЫХ
/////////////////////////////////////////////////

// ВСЕ ПОПАПЫ
const popups = document.querySelectorAll('.popup');

// МЕСТО В РАЗМЕТКЕ ДЛЯ ВСТАВКИ КАРТОЧЕК
const elements = document.querySelector(".elements");

// POPUP ПРОФАЙЛА ОТКРЫВАЕТСЯ
const editButton = document.querySelector(".profile__edit-button");
const popupProfile = document.querySelector("#popup-open-profile");

// POPUPS ЗАКРЫВАЮТСЯ ПО КЛИКУ НА КНОПКУ ЗАКРЫТИЯ
/* const popupButtonClose = document.querySelector(".popup__button-close"); */

// POPUP ПРОФАЙЛА СОХРАНЯЕТ ИНФОРМАЦИЮ ИЗ INPUTS
const profileFormElement = document.querySelector(".popup__form");
const nameInput = profileFormElement.querySelector("#popup-name");
const statusInput = profileFormElement.querySelector("#popup-status");
const profileName = document.querySelector(".profile__name"); // Жак-Ив Кусто
const profileStatus = document.querySelector(".profile__status"); // Исследователь океана

// POPUP МАСШТАБНОГО ОТКРЫТИЯ КАРТОЧКИ
const popupZoomOpenCardImage = document.querySelector("#popup-open-card-image");
const buttonCloseCardImage = popupZoomOpenCardImage.querySelector("#button-close-card-image");
const cardImageZoom = popupZoomOpenCardImage.querySelector("#popup-image");
const titleCardZoom = popupZoomOpenCardImage.querySelector("#popup-title-card-image");

// ДОБАВЛЕНИЕ НОВОЙ КАРТОЧКИ [ + ]
const profile = document.querySelector(".profile");
const addNewCardButton = profile.querySelector(".profile__add-button");
const popupAddNewCard = document.querySelector("#popup-add-new-card");
const windowAddNewCard = document.querySelector("#window-add-new-card");
const formAddNewCard = windowAddNewCard.querySelector("#form-add-new-card");
const popupAddNewCardButtonClose = windowAddNewCard.querySelector("#add-new-card-button-close");
const addNewCardTitle = document.querySelector('#add-new-card-title');
const addNewCardLink = document.querySelector('#add-new-card-link');

const template = document.querySelector(".template-element");

// ОБЪЕКТ НЕОБХОДИМЫХ ДАННЫХ ДЛЯ ВАЛИДАЦИИ
const enableValidationConfig = {
  formSelector: ".popup__form", // ФОРМА
  inputSelector: ".popup__input", // ПОЛЕ
  submitButtonSelector: ".popup__button-save", // КНОПКА "ОТПРАВКИ ДАННЫХ"
  inactiveButtonClass: "popup__button-save_disabled", // КНОПКА "ОТПРАВКА ДАННЫХ" НЕАКТИВНА
  inputErrorClass: "popup__input_error_visible", // СТИЛЬ ПОЛЯ ВО ВРЕМЯ НЕВАЛИДНОСТИ
  errorClass: "popup__input_visible", // СПАН С ОШИБКОЙ В ПОЛЕ АКТИВЕН
  spanErrorActive: "popup__input-error_active" // СПАН С ОШИБКОЙ АКТИВЕН
};
