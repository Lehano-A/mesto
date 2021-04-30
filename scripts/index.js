import FormValidator from './FormValidator.js';
import Card from './Card.js';
import openPopup from './open-popup.js';
import { closePopup } from './close-popup.js';
import { initialCards } from './initial-cards.js';


/////////////////////////////////////////////////
// БЛОК ПЕРЕМЕННЫХ
/////////////////////////////////////////////////

// ПОИСК ШАБЛОНА
const elements = document.querySelector(".elements");



// POPUP ПРОФАЙЛА ОТКРЫВАЕТСЯ
const editButton = document.querySelector(".profile__edit-button");
const popupProfile = document.querySelector("#popup-open-profile");

// POPUPS ЗАКРЫВАЮТСЯ ПО КЛИКУ НА КНОПКУ ЗАКРЫТИЯ
const popupsButtonsClose = document.querySelector(".popup__button-close");

// POPUP ПРОФАЙЛА СОХРАНЯЕТ ИНФОРМАЦИЮ ИЗ INPUTS
const profileFormElement = document.querySelector(".popup__form");
const nameInput = profileFormElement.querySelector("#popup-name");
const statusInput = profileFormElement.querySelector("#popup-status");
const profileName = document.querySelector(".profile__name"); // Жак-Ив Кусто
const profileStatus = document.querySelector(".profile__status"); // Исследователь океана


// POPUP МАСШТАБНОГО ОТКРЫТИЯ КАРТОЧКИ
const popupZoomOpenCardImage = document.querySelector("#popup-open-card-image");
const buttonCloseCardImage = popupZoomOpenCardImage.querySelector("#button-close-card-image");

// ДОБАВЛЕНИЕ НОВОЙ КАРТОЧКИ [ + ]
const profile = document.querySelector(".profile");
const addNewCardButton = profile.querySelector(".profile__add-button");
const popupAddNewCard = document.querySelector("#popup-add-new-card");
const windowAddNewCard = document.querySelector("#window-add-new-card");
const formAddNewCard = windowAddNewCard.querySelector("#form-add-new-card");
const popupAddNewCardButtonClose = windowAddNewCard.querySelector("#add-new-card-button-close");
const templateSelector = document.querySelector(".template-element");
const addNewCardTitle = document.querySelector('#add-new-card-title');
const addNewCardLink = document.querySelector('#add-new-card-link');

// ОБЪЕКТ НЕОБХОДИМЫХ ДАННЫХ ДЛЯ ВАЛИДАЦИИ
const enableValidationConfig = ({
  formSelector: ".popup__form", // ФОРМА
  inputSelector: ".popup__input", // ПОЛЕ
  submitButtonSelector: ".popup__button-save", // КНОПКА "ОТПРАВКИ ДАННЫХ"
  inactiveButtonClass: "popup__button-save_disabled", // КНОПКА "ОТПРАВКА ДАННЫХ" НЕАКТИВНА
  inputErrorClass: "popup__input_error_visible", // СТИЛЬ ПОЛЯ ВО ВРЕМЯ НЕВАЛИДНОСТИ
  errorClass: "popup__input_visible", // СПАН С ОШИБКОЙ В ПОЛЕ АКТИВЕН
  spanErrorActive: "popup__input-error_active" // СПАН С ОШИБКОЙ АКТИВЕН
});


/////////////////////////////////////////////////
// БЛОК ФУНКЦИЙ
/////////////////////////////////////////////////

// POPUP ДОБАВЛЕНИЯ НОВОЙ КАРТОЧКИ => ОТКРЫВАЕТСЯ
function openPopupAddNewCard() {
  formAddNewCard.reset();
  openPopup(popupAddNewCard);
}


// ПЕРВОНАЧАЛЬНЫЙ ЦИКЛ ДОБАВЛЕНИЯ НАЧАЛЬНЫХ КАРТОЧЕК

initialCards.forEach(function (element) {
  const initialCard = new Card(templateSelector, element);
  const generateInitialCard = initialCard.generateCard();
  elements.append(generateInitialCard);
});


// ФОРМА ДОБАВЛЕНИЯ НОВОЙ КАРТОЧКИ [ + ]
function submitAddNewCard() {
  const cardData = {
    name: addNewCardTitle.value,
    link: addNewCardLink.value,
  };

  const addNewCard = new Card(templateSelector, cardData);
  const generateNewCard = addNewCard.generateCard();
  elements.prepend(generateNewCard);

  formAddNewCard.reset();

  closePopup(popupAddNewCard);
}


// POPUP-PROFILE СОХРАНЯЕТ ИНФОРМАЦИЮ ИЗ INPUTS
// ФУНКЦИЯ ИЗМЕНЕНИЯ ЗНАЧЕНИЙ ЭЛЕМЕНТОВ NAME И STATUS НА ЗНАЧЕНИЕ ИЗ INPUTS
function handlerProfileSubmit() {
  profileName.textContent = nameInput.value;
  profileStatus.textContent = statusInput.value;
  closePopup(popupProfile);
}


/////////////////////////////////////////////////
// БЛОК СЛУШАТЕЛЕЙ
/////////////////////////////////////////////////


// СЛУШАТЕЛЬ - POPUP ПРОФАЙЛА => ОТКРЫВАЕТСЯ
editButton.addEventListener("click", () => {
  nameInput.value = profileName.textContent;
  statusInput.value = profileStatus.textContent;
  const validityFormProfile = new FormValidator(enableValidationConfig, profileFormElement);
  validityFormProfile.enableValidation();
  openPopup(popupProfile);
});


// СЛУШАТЕЛЬ - POPUP ПРОФАЙЛА => ЗАКРЫВАЕТСЯ НА КНОПКУ ЗАКРЫТИЯ
popupsButtonsClose.addEventListener("click", () => {
  closePopup(popupProfile);
});


// СЛУШАТЕЛЬ - POPUP ДОБАВЛЕНИЯ НОВОЙ КАРТОЧКИ => ОТКРЫВАЕТСЯ
addNewCardButton.addEventListener("click", () => {
  const validityFormAddNewCard = new FormValidator(enableValidationConfig, formAddNewCard);
  validityFormAddNewCard.enableValidation();
  openPopupAddNewCard();
});


// СЛУШАТЕЛЬ - ФОРМА ОТПРАВКИ ДОБАВЛЕНИЯ НОВОЙ КАРТОЧКИ [ + ]
formAddNewCard.addEventListener("submit", submitAddNewCard);


// СЛУШАТЕЛЬ - POPUP СОХРАНЯЕТ ИНФОРМАЦИЮ ИЗ INPUTS
profileFormElement.addEventListener("submit", handlerProfileSubmit);


// СЛУШАТЕЛЬ - POPUP ДОБАВЛЕНИЯ НОВОЙ КАРТОЧКИ => ЗАКРЫВАЕТСЯ НА КНОПКУ ЗАКРЫТИЯ
popupAddNewCardButtonClose.addEventListener("click", () => {
  closePopup(popupAddNewCard);
});


// СЛУШАТЕЛЬ - POPUP МАСШТАБНОГО ОТКРЫТИЯ КАРТОЧКИ => ЗАКРЫВАЕТСЯ НА КНОПКУ ЗАКРЫТИЯ
buttonCloseCardImage.addEventListener("click", () => {
  closePopup(popupZoomOpenCardImage);
});



