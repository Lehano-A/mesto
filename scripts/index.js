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
const nameInput = profileFormElement.querySelector("#popup_name");
const statusInput = profileFormElement.querySelector("#popup_status");
const profileName = document.querySelector(".profile__name"); // Жак-Ив Кусто
const profileStatus = document.querySelector(".profile__status"); // Исследователь океана

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
const addNewCardTitle = document.querySelector("#add-new-card-title");
const addNewCardLink = document.querySelector("#add-new-card-link");




/////////////////////////////////////////////////
// БЛОК ФУНКЦИЙ
/////////////////////////////////////////////////

// POPUP ДОБАВЛЕНИЯ НОВОЙ КАРТОЧКИ => ОТКРЫВАЕТСЯ
function openPopupAddNewCard() {
  enableValidation(enableValidationConfig.formSelector, enableValidationConfig.inputSelector)
  openPopup(popupAddNewCard);
}

// ПЕРВОНАЧАЛЬНЫЙ ЦИКЛ ДОБАВЛЕНИЯ НАЧАЛЬНЫХ КАРТОЧЕК
initialCards.forEach(function (element) {
  const cloneElementImageParameters = createNewCard(element);
  elements.append(cloneElementImageParameters);
});

// ФУНКЦИЯ СОЗДАНИЯ КАРТОЧКИ
function createNewCard(cardData) {
  const cloneElement = templateElement
    .querySelector(".element")
    .cloneNode(true);
  const cloneElementImage = cloneElement.querySelector(".element__image");
  const buttonsLike = cloneElement.querySelector(".element__button-like");
  const titleCloneElement = cloneElement.querySelector(".element__title");
  const buttonsDeleteCards = cloneElement.querySelector(".element__button-delete");

  cloneElementImage.src = cardData.link;
  cloneElementImage.alt = cardData.name;
  titleCloneElement.textContent = cardData.name;

  buttonsDeleteCards.addEventListener("click", () => {
    cloneElement.remove();
  });
  buttonsLike.addEventListener("click", () => {
    buttonsLike.classList.toggle("element__button-like_active");
  });

  cloneElementImage.addEventListener("click", (event) => {
    const target = event.target;
    srcZoomOpenCardImage.src = target.src;
    altZoomOpenCardImage.alt = target.alt;
    titleZoomOpenCardImage.textContent = titleCloneElement.textContent;

    openPopup(popupZoomOpenCardImage);
  });

  return cloneElement;
}

// ФОРМА ДОБАВЛЕНИЯ НОВОЙ КАРТОЧКИ [ + ]
function submitAddNewCard() {
  const cardData = {
    link: addNewCardLink.value,
    name: addNewCardTitle.value
  };

  const cloneElementImageParameters = createNewCard(cardData);
  elements.prepend(cloneElementImageParameters);
  closePopup(popupAddNewCard);
  formAddNewCard.reset();
  enableValidation(enableValidationConfig.formSelector, enableValidationConfig.inputSelector);
}

// POPUP (ЛЮБОЙ) ОТКРЫВАЕТСЯ
function openPopup(popup) {
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
  enableValidation(enableValidationConfig.formSelector, enableValidationConfig.inputSelector);
  openPopup(popupProfile);
});

// СЛУШАТЕЛЬ - POPUP ПРОФАЙЛА => ЗАКРЫВАЕТСЯ НА КНОПКУ ЗАКРЫТИЯ
popupsButtonsClose.addEventListener("click", () => {
  closePopup(popupProfile);
});

// СЛУШАТЕЛЬ - POPUP ДОБАВЛЕНИЯ НОВОЙ КАРТОЧКИ => ОТКРЫВАЕТСЯ
addNewCardButton.addEventListener("click", openPopupAddNewCard);

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

// СЛУШАТЕЛЬ - ЗАКРЫТИЕ ПОПАПА ПО КНОПКЕ 'ESCAPE'
document.addEventListener('keydown', (evt) => {
  closePopupAtEsc(evt);
});
