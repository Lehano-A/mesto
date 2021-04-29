
/////////////////////////////////////////////////
// БЛОК ПЕРЕМЕННЫХ
/////////////////////////////////////////////////

// ПОИСК ШАБЛОНА
const elements = document.querySelector(".elements");
const templateElement = document.querySelector(".template-element").content;


// POPUP ПРОФАЙЛА ОТКРЫВАЕТСЯ
const editButton = document.querySelector(".profile__edit-button");
const popupProfile = document.querySelector("#popup-open-profile");
const windowPopupProfile = document.querySelector('#window-popup-profile');

// POPUPS ЗАКРЫВАЮТСЯ ПО КЛИКУ НА КНОПКУ ЗАКРЫТИЯ
const popupsButtonsClose = document.querySelector(".popup__button-close");

// POPUP ПРОФАЙЛА СОХРАНЯЕТ ИНФОРМАЦИЮ ИЗ INPUTS
const profileFormElement = document.querySelector(".popup__form");
const nameInput = profileFormElement.querySelector("#popup-name");
const statusInput = profileFormElement.querySelector("#popup-status");
const profileName = document.querySelector(".profile__name"); // Жак-Ив Кусто
const profileStatus = document.querySelector(".profile__status"); // Исследователь океана
const profileButtonSave = profileFormElement.querySelector('.popup__button-save');

// POPUP МАСШТАБНОГО ОТКРЫТИЯ КАРТОЧКИ
const popupZoomOpenCardImage = document.querySelector("#popup-open-card-image");
const srcZoomOpenCardImage = popupZoomOpenCardImage.querySelector("#popup-image");
const altZoomOpenCardImage = popupZoomOpenCardImage.querySelector("#popup-image");
const titleZoomOpenCardImage = popupZoomOpenCardImage.querySelector("#popup-title-card-image");
const buttonCloseCardImage = popupZoomOpenCardImage.querySelector("#button-close-card-image");

// ДОБАВЛЕНИЕ НОВОЙ КАРТОЧКИ [ + ]
const profile = document.querySelector(".profile");
const addNewCardButton = profile.querySelector(".profile__add-button");
const popupAddNewCard = document.querySelector("#popup-add-new-card");
const windowAddNewCard = document.querySelector("#window-add-new-card");
const formAddNewCard = windowAddNewCard.querySelector("#form-add-new-card");
const popupAddNewCardButtonClose = windowAddNewCard.querySelector("#add-new-card-button-close");
const templateSelector = document.querySelector(".template-element");
const addNewCardButtonSave = formAddNewCard.querySelector('.popup__button-save');
const addNewCardTitle = document.querySelector('#add-new-card-title');
const addNewCardLink = document.querySelector('#add-new-card-link');





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
  }

  const addNewCard = new Card(templateSelector, cardData);
  const generateNewCard = addNewCard.generateCard();
  elements.prepend(generateNewCard);

  formAddNewCard.reset();

  closePopup(popupAddNewCard);
  const inputsFormAddNewCard = [addNewCardTitle, addNewCardLink]; // ВСЕ ПОЛЯ ФОРМЫ ДОБАВЛЕНИЯ НОВОЙ КАРТОЧКИ
  toggleButtonDesign(inputsFormAddNewCard, addNewCardButtonSave); // ОТПРАВЛЯЕМ ВСЕ ПОЛЯ И КНОПКУ ОТПРАВКИ ДАННЫХ НА ВАЛИДАЦИЮ
}



// POPUP (ЛЮБОЙ) ОТКРЫВАЕТСЯ
function openPopup(popup) {
  document.addEventListener('keydown', closePopupByEsc);
  popup.classList.add('popup_opened');
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
  inputsFormProfile = [nameInput, statusInput];
  hideInputError(profileFormElement, nameInput);
  hideInputError(profileFormElement, statusInput);
  toggleButtonDesign(inputsFormProfile, profileButtonSave);
  openPopup(popupProfile);
});


// СЛУШАТЕЛЬ - POPUP ПРОФАЙЛА => ЗАКРЫВАЕТСЯ НА КНОПКУ ЗАКРЫТИЯ
popupsButtonsClose.addEventListener("click", () => {
  closePopup(popupProfile);
});







// СЛУШАТЕЛЬ - POPUP ДОБАВЛЕНИЯ НОВОЙ КАРТОЧКИ => ОТКРЫВАЕТСЯ
addNewCardButton.addEventListener("click", () => {
  hideInputError(formAddNewCard, document.querySelector("#add-new-card-title"));
  hideInputError(formAddNewCard, document.querySelector("#add-new-card-link"));
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



