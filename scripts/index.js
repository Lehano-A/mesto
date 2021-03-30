// Поиск шаблона и его элементов
const elements = document.querySelector('.elements');
const templateElement = document.querySelector('.template-element').content;
const cloneElement = templateElement.querySelector('.element').cloneNode(true);
const titleBoxElement = cloneElement.querySelector('.element__title-icon-box');

//Popup открывается
const editButton = document.querySelector('.profile__edit-button');
const popup = document.querySelector('.popup');

//Popup закрывается по клику на кнопку закрытия
const popupButtonClose = document.querySelector('.popup__button-close');

//Popup сохраняет информацию из inputs
const buttonSave = document.querySelector('.popup__button-save');
const formElement = document.querySelector('.popup__form');
const nameInput = formElement.querySelector('#popup_name')
const statusInput = formElement.querySelector('#popup_status')
const profileName = document.querySelector('.profile__name'); //Жак-Ив Кусто
const profileStatus = document.querySelector('.profile__status'); //Исследователь океана

//Button Add New Card [ + ]
const profile = document.querySelector('.profile');
const addNewCardButton = profile.querySelector('.profile__add-button');
const popupAddNewCard = document.querySelector('#popupAddNewCard');
const popupAddNewCardButtonClose = document.querySelector('#addNewCardButtonClose')
const popupAddNewCardButtonSave = document.querySelector('#addNewCardButtonSave')


const initialCards = [
  {
    name: 'Планета Земля',
    link: './images/milky-way-planet-earth.jpg'
  },
  {
    name: 'Судак, Крым',
    link: './images/sudak-crimea.jpg'
  },
  {
    name: 'Моаб, США',
    link: './images/moab-usa.jpg'
  },
  {
    name: 'Чжанъе, Китай',
    link: './images/zhangye-china.jpg'
  },
  {
    name: 'Онтарио, Канада',
    link: './images/ontario-canada.jpg'
  },
  {
    name: 'Мон-Сен-Мишель, Франция',
    link: './images/mont-saint-michel-france.jpg'
  }
];

//Функция первоначальной загрузки всех элементов массива на страницу
const addCard = initialCards.forEach(function (element) {
  const cloneElement = templateElement.querySelector('.element').cloneNode(true);
  cloneElement.querySelector('.element__image').src = element.link;
  cloneElement.querySelector('.element__title').textContent = element.name;
  elements.append(cloneElement);
});


//Кнопка AddNewCard [ + ] в блоке "Profile"
//popupAddNewCard - открывается
function popupAddNewCardOpen() {
  popupAddNewCard.classList.add('popup_opened');
}

//popupAddNewCard - закрывается
function popupAddNewCardClose() {
  popupAddNewCard.classList.remove('popup_opened');
}

//popupAddNewCard - отправка формы
function formSubmitAddNewCard(evt) {
  evt.preventDefault();
  popupAddNewCardClose();
}


//Кнопка "Редактировать профиль" в блоке "Profile"
//Popup открывается
function popupOpen() {
  nameInput.value = profileName.textContent;
  statusInput.value = profileStatus.textContent;
  popup.classList.add('popup_opened');
}


//Popup закрывается по клику на кнопку закрытия
function popupClose() {
  popup.classList.remove('popup_opened');
}


//Popup сохраняет информацию из inputs
//Функция изменения значений элементов name и status на значение из inputs
function formSubmitHandler(evt) {
  evt.preventDefault();

  profileName.textContent = nameInput.value;
  profileStatus.textContent = statusInput.value;
  popupClose();
}


//Popup открывается
editButton.addEventListener('click', popupOpen);

//Popup закрывается по клику на кнопку закрытия
popupButtonClose.addEventListener('click', popupClose);

//Popup сохраняет информацию из inputs
formElement.addEventListener('submit', formSubmitHandler);

//popupAddNewCard - открывается
addNewCardButton.addEventListener('click', popupAddNewCardOpen);

//popupAddNewCard - закрывается
popupAddNewCardButtonClose.addEventListener('click', popupAddNewCardClose);

//popupAddNewCard - отправка формы
popupAddNewCardButtonSave.addEventListener('click', formSubmitAddNewCard);
