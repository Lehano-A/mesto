/////////////////////////////////////////////////
//БЛОК ПЕРЕМЕННЫХ
/////////////////////////////////////////////////

// Поиск шаблона
const elements = document.querySelector('.elements');
const templateElement = document.querySelector('.template-element').content;
const cloneElement = templateElement.querySelector('.element').cloneNode(true);
const buttonsDeleteCards = cloneElement.querySelector('.element__button-delete');
const cloneElementImage = cloneElement.querySelector('.element__image');
const buttonsLike = cloneElement.querySelector('.element__button-like');
const textCloneElement = cloneElement.querySelector('.element__title');


// Popup открывается
const editButton = document.querySelector('.profile__edit-button');
const popupProfile = document.querySelector('.popup');


// Popups закрываются по клику на кнопку закрытия
const popupsButtonsClose = document.querySelector('.popup__button-close');


// Popup сохраняет информацию из inputs
const profileFormElement = document.querySelector('.popup__form');
const nameInput = profileFormElement.querySelector('#popup_name');
const statusInput = profileFormElement.querySelector('#popup_status');
const profileName = document.querySelector('.profile__name'); // Жак-Ив Кусто
const profileStatus = document.querySelector('.profile__status'); // Исследователь океана


// Popup масштабного открытия карточки
const popupOpenCardImage = document.querySelector('#popup-open-card-image');
const srcOpenCardImage = popupOpenCardImage.querySelector('#popup-image');
const altOpenCardImage = popupOpenCardImage.querySelector('#popup-image');
const textOpenCardImage = popupOpenCardImage.querySelector('#popup-title-card-image');
const buttonCloseCardImage = popupOpenCardImage.querySelector('#button-close-card-image');


// Добавление новой карточки [ + ]
const profile = document.querySelector('.profile');
const addNewCardButton = profile.querySelector('.profile__add-button');
const popupAddNewCard = document.querySelector('#popup-add-new-card');
const windowAddNewCard = document.querySelector('#window-add-new-card');
const formAddNewCard = windowAddNewCard.querySelector('#form-add-new-card');
const popupAddNewCardButtonClose = windowAddNewCard.querySelector('#add-new-card-button-close');
const addNewCardTitle = document.querySelector('#add-new-card-title');
const addNewCardLink = document.querySelector('#add-new-card-link');


/////////////////////////////////////////////////
// БЛОК ФУНКЦИЙ
/////////////////////////////////////////////////

// Функция первоначальной загрузки всех элементов массива на страницу


// Кнопка AddNewCard [ + ] в блоке "Profile"
// Popup добавления новой карточки => ОТКРЫВАЕТСЯ
function popupAddNewCardOpen() {
  openPopup(popupAddNewCard);
}


// Функция добавления новой карточки [ + ]
function submitAddNewCard(evt) {
  evt.preventDefault();
  const cloneElement = templateElement.querySelector('.element').cloneNode(true);
  const cloneElementImage = cloneElement.querySelector('.element__image');
  const buttonsLike = cloneElement.querySelector('.element__button-like');
  const textCloneElement = cloneElement.querySelector('.element__title');
  const buttonsDeleteCards = cloneElement.querySelector('.element__button-delete');

  cloneElementImage.src = addNewCardLink.value;
  cloneElementImage.alt = addNewCardTitle.value;
  textCloneElement.textContent = addNewCardTitle.value;

  buttonsDeleteCards.addEventListener('click', () => { cloneElement.remove(); });
  buttonsLike.addEventListener('click', () => { buttonsLike.classList.toggle('element__button-like_active'); });

  cloneElementImage.addEventListener('click', () => {
    addCardDataListener(cloneElementImage.src, cloneElementImage.alt, textCloneElement.textContent)
    openPopup(popupOpenCardImage);
  });


  elements.prepend(cloneElement);

  closePopup(popupAddNewCard);

  formAddNewCard.reset();
}



initialCards.forEach(function (element) {
  const cloneElement = templateElement.querySelector('.element').cloneNode(true);
  const cloneElementImage = cloneElement.querySelector('.element__image');
  const buttonsLike = cloneElement.querySelector('.element__button-like');
  const textCloneElement = cloneElement.querySelector('.element__title');
  const buttonsDeleteCards = cloneElement.querySelector('.element__button-delete');


  cloneElementImage.src = element.link;
  cloneElementImage.alt = element.name;
  textCloneElement.textContent = element.name;

  buttonsDeleteCards.addEventListener('click', () => { cloneElement.remove(); });
  buttonsLike.addEventListener('click', () => { buttonsLike.classList.toggle('element__button-like_active'); });

  cloneElementImage.addEventListener('click', () => {
    addCardDataListener(element.link, element.name, element.name);
    openPopup(popupOpenCardImage);
  });

  elements.append(cloneElement);
});



//Функция добавления параметров в слушатель внутри создания карточки
function addCardDataListener(src, alt, textContent) {
  srcOpenCardImage.src = src;
  altOpenCardImage.alt = alt;
  textOpenCardImage.textContent = textContent;
}


// Popup открывается
function openPopup(popup) {
  popup.classList.add('popup_opened');
}


// Popup закрывается по клику на кнопку закрытия
function closePopup(popup) {
  popup.classList.remove('popup_opened');
}


// Popup-profile сохраняет информацию из inputs
// Функция изменения значений элементов name и status на значение из inputs
function formSubmitHandler(evt) {
  evt.preventDefault();
  profileName.textContent = nameInput.value;
  profileStatus.textContent = statusInput.value;
  closePopup(popupProfile);
}


/////////////////////////////////////////////////
// БЛОК СЛУШАТЕЛЕЙ
/////////////////////////////////////////////////


// Popup профайла => ОТКРЫВАЕТСЯ
editButton.addEventListener('click', () => {
  nameInput.value = profileName.textContent;
  statusInput.value = profileStatus.textContent;
  openPopup(popupProfile);
});


// Popup добавления новой карточки => ОТКРЫВАЕТСЯ
addNewCardButton.addEventListener('click', popupAddNewCardOpen);


// Форма отправки добавления новой карточки [ + ]
formAddNewCard.addEventListener('submit', submitAddNewCard);


// Popup сохраняет информацию из inputs
profileFormElement.addEventListener('submit', formSubmitHandler);


// Popup профайла => ЗАКРЫВАЕТСЯ
popupsButtonsClose.addEventListener('click', () => { closePopup(popupProfile); });


// Popup добавления новой карточки => ЗАКРЫВАЕТСЯ
popupAddNewCardButtonClose.addEventListener('click', () => { closePopup(popupAddNewCard) });


// Popup масштабного открытия карточки => ЗАКРЫВАЕТСЯ
buttonCloseCardImage.addEventListener('click', () => { closePopup(popupOpenCardImage) });



