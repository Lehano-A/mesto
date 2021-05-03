import FormValidator from './FormValidator.js';
import Card from './Card.js';
import openPopup from './open-popup.js';
import { closePopup } from './close-popup.js';
import { initialCards } from './initial-cards.js';
import {
  popups, elements, editButton, popupProfile, profileFormElement, nameInput, statusInput, profileName, profileStatus,
  popupZoomOpenCardImage, buttonCloseCardImage, addNewCardButton, popupAddNewCard, formAddNewCard, popupAddNewCardButtonClose, template, addNewCardTitle, addNewCardLink, enableValidationConfig
} from './constants.js';


/////////////////////////////////////////////////
// БЛОК ФУНКЦИЙ
/////////////////////////////////////////////////


// ФУНКЦИЯ СОЗДАНИЯ КАРТОЧКИ
function createCard(template, element) {
  const initialCard = new Card(template, element);
  const generateCard = initialCard.generateCard();
  return generateCard;
}


// ПЕРВОНАЧАЛЬНЫЙ ЦИКЛ ДОБАВЛЕНИЯ НАЧАЛЬНЫХ КАРТОЧЕК
initialCards.forEach((element) => {

  const createdCard = createCard(template, element);
  elements.append(createdCard);
});


// ФОРМА ДОБАВЛЕНИЯ НОВОЙ КАРТОЧКИ [ + ]
function submitAddNewCard() {
  const cardData = {
    name: addNewCardTitle.value,
    link: addNewCardLink.value,
  };

  const addNewCard = createCard(template, cardData);
  elements.prepend(addNewCard);

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

// ВКЛЮЧЕНИЕ ВАЛИДАЦИИ
function enableValidationForm(formConfig, formElement) {
  const createValidatorExemplar = new FormValidator(formConfig, formElement);
  createValidatorExemplar.enableValidation();

}

// ОТПРАВКА ФОРМ НА ВКЛЮЧЕНИЕ ВАЛИДАЦИИ
function transferFormInValidator() {
  enableValidationForm(enableValidationConfig, profileFormElement);
  enableValidationForm(enableValidationConfig, formAddNewCard);
}
transferFormInValidator();


// POPUP ДОБАВЛЕНИЯ НОВОЙ КАРТОЧКИ => ОТКРЫВАЕТСЯ
function openPopupAddNewCard() {
  formAddNewCard.reset();
  const createValidatorExemplar = new FormValidator(enableValidationConfig, formAddNewCard);
  createValidatorExemplar.resetValidation();
  openPopup(popupAddNewCard);
}

/////////////////////////////////////////////////
// БЛОК СЛУШАТЕЛЕЙ
/////////////////////////////////////////////////


// СЛУШАТЕЛЬ - POPUP ПРОФАЙЛА => ОТКРЫВАЕТСЯ
editButton.addEventListener("click", () => {
  nameInput.value = profileName.textContent;
  statusInput.value = profileStatus.textContent;
  const createValidatorExemplar = new FormValidator(enableValidationConfig, profileFormElement);
  createValidatorExemplar.resetValidation();
  openPopup(popupProfile);
  ;
});


// СЛУШАТЕЛЬ - ЗАКРЫТИE POPUP НА КНОПКУ ЗАКРЫТИЯ ИЛИ НА ОВЕРЛЕЙ
popups.forEach((popup) => {
  popup.addEventListener('click', (evt) => {
    if (evt.target.classList.contains('popup_opened') || evt.target.classList.contains('popup__button-close')) {
      closePopup(popup);
    };
  })
})



// СЛУШАТЕЛЬ - POPUP ДОБАВЛЕНИЯ НОВОЙ КАРТОЧКИ => ОТКРЫВАЕТСЯ
addNewCardButton.addEventListener("click", () => {
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



