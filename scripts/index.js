/////////////////////////////////////////////////
//БЛОК ПЕРЕМЕННЫХ
/////////////////////////////////////////////////

// ПОИСК ШАБЛОНА
const elements = document.querySelector('.elements');
const templateElement = document.querySelector('.template-element').content;
const cloneElement = templateElement.querySelector('.element').cloneNode(true);
const buttonsDeleteCards = cloneElement.querySelector('.element__button-delete');
const cloneElementImage = cloneElement.querySelector('.element__image');
const buttonsLike = cloneElement.querySelector('.element__button-like');
const textCloneElement = cloneElement.querySelector('.element__title');


// POPUP ОТКРЫВАЕТСЯ
const editButton = document.querySelector('.profile__edit-button');
const popupProfile = document.querySelector('.popup');


// POPUPS ЗАКРЫВАЮТСЯ ПО КЛИКУ НА КНОПКУ ЗАКРЫТИЯ
const popupsButtonsClose = document.querySelector('.popup__button-close');


// POPUP СОХРАНЯЕТ ИНФОРМАЦИЮ ИЗ INPUTS
const profileFormElement = document.querySelector('.popup__form');
const nameInput = profileFormElement.querySelector('#popup_name');
const statusInput = profileFormElement.querySelector('#popup_status');
const profileName = document.querySelector('.profile__name'); // Жак-Ив Кусто
const profileStatus = document.querySelector('.profile__status'); // Исследователь океана


// POPUP МАСШТАБНОГО ОТКРЫТИЯ КАРТОЧКИ
const popupZoomOpenCardImage = document.querySelector('#popup-open-card-image');
const srcZoomOpenCardImage = popupZoomOpenCardImage.querySelector('#popup-image');
const altZoomOpenCardImage = popupZoomOpenCardImage.querySelector('#popup-image');
const textZoomOpenCardImage = popupZoomOpenCardImage.querySelector('#popup-title-card-image');
const buttonCloseCardImage = popupZoomOpenCardImage.querySelector('#button-close-card-image');


// ДОБАВЛЕНИЕ НОВОЙ КАРТОЧКИ [ + ]
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


// POPUP ДОБАВЛЕНИЯ НОВОЙ КАРТОЧКИ => ОТКРЫВАЕТСЯ
function popupAddNewCardOpen() {
  openPopup(popupAddNewCard);
}


// ПЕРВОНАЧАЛЬНЫЙ ЦИКЛ ДОБАВЛЕНИЯ НАЧАЛЬНЫХ КАРТОЧЕК
initialCards.forEach(function (element) {
  const cloneElementImageParameters = createNewCard(element.link, element.name, element.name, element.link, element.name, element.name);
  elements.append(cloneElementImageParameters);
});


//ФУНКЦИЯ СОЗДАНИЯ КАРТОЧКИ
function createNewCard(src, alt, textContent) {

  const cloneElement = templateElement.querySelector('.element').cloneNode(true);
  const cloneElementImage = cloneElement.querySelector('.element__image');
  const buttonsLike = cloneElement.querySelector('.element__button-like');
  const textCloneElement = cloneElement.querySelector('.element__title');
  const buttonsDeleteCards = cloneElement.querySelector('.element__button-delete');

  cloneElementImage.src = src;
  cloneElementImage.alt = alt;
  textCloneElement.textContent = textContent;

  buttonsDeleteCards.addEventListener('click', () => { cloneElement.remove(); });
  buttonsLike.addEventListener('click', () => { buttonsLike.classList.toggle('element__button-like_active'); });

  cloneElementImage.addEventListener('click', event => {

    const target = event.target;
    srcZoomOpenCardImage.src = target.src;
    altZoomOpenCardImage.alt = target.alt;
    textZoomOpenCardImage.textContent = target.parentElement.lastElementChild.firstElementChild.innerText;

    openPopup(popupZoomOpenCardImage);
    closePopup(popupAddNewCard);
  });

  elements.prepend(cloneElement);
  closePopup(popupAddNewCard);

  return cloneElement;
}


//ФОРМА ДОБАВЛЕНИЯ НОВОЙ КАРТОЧКИ [ + ]
function submitAddNewCard(event) {
  event.preventDefault();
  createNewCard(addNewCardLink.value, addNewCardTitle.value, addNewCardTitle.value);
  formAddNewCard.reset();
}


// POPUP (ЛЮБОЙ) ОТКРЫВАЕТСЯ
function openPopup(popup) {
  popup.classList.add('popup_opened');
}


// POPUP (ЛЮБОЙ) ЗАКРЫВАЕТСЯ ПО КЛИКУ НА КНОПКУ ЗАКРЫТИЯ
function closePopup(popup) {
  popup.classList.remove('popup_opened');
}


// POPUP-PROFILE СОХРАНЯЕТ ИНФОРМАЦИЮ ИЗ INPUTS
// ФУНКЦИЯ ИЗМЕНЕНИЯ ЗНАЧНИЙ ЭЛЕМЕНТОВ NAME И STATUS НА ЗНАЧЕНИЕ ИЗ INPUTS
function formSubmitHandler(event) {
  event.preventDefault();
  profileName.textContent = nameInput.value;
  profileStatus.textContent = statusInput.value;
  closePopup(popupProfile);
}


/////////////////////////////////////////////////
// БЛОК СЛУШАТЕЛЕЙ
/////////////////////////////////////////////////


// POPUP ПРОФАЙЛА => ОТКРЫВАЕТСЯ
editButton.addEventListener('click', () => {
  nameInput.value = profileName.textContent;
  statusInput.value = profileStatus.textContent;
  openPopup(popupProfile);
});


// POPUP ПРОФАЙЛА => ЗАКРЫВАЕТСЯ
popupsButtonsClose.addEventListener('click', () => { closePopup(popupProfile); });


// POPUP ДОБАВЛЕНИЯ НОВОЙ КАРТОЧКИ => ОТКРЫВАЕТСЯ
addNewCardButton.addEventListener('click', popupAddNewCardOpen);


// ФОРМА ОТПРАВКИ ДОБАВЛЕНИЯ НОВОЙ КАРТОЧКИ [ + ]
formAddNewCard.addEventListener('submit', submitAddNewCard);


// POPUP СОХРАНЯЕТ ИНФОРМАЦИЮ ИЗ INPUTS
profileFormElement.addEventListener('submit', formSubmitHandler);


// POPUP ДОБАВЛЕНИЯ НОВОЙ КАРТОЧКИ => ЗАКРЫВАЕТСЯ
popupAddNewCardButtonClose.addEventListener('click', () => { closePopup(popupAddNewCard); });


// POPUP МАСШТАБНОГО ОТКРЫТИЯ КАРТОЧКИ => ЗАКРЫВАЕТСЯ
buttonCloseCardImage.addEventListener('click', () => { closePopup(popupZoomOpenCardImage); });



