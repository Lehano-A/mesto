// Поиск шаблона и его элементов
const elements = document.querySelector('.elements');
const templateElement = document.querySelector('.template-element').content;
const cloneElement = templateElement.querySelector('.element').cloneNode(true);
const titleBoxElement = cloneElement.querySelector('.element__title-icon-box');

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




//Кнопка "Редактировать профиль" в блоке "Profile"

//Popup открывается
let editButton = document.querySelector('.profile__edit-button');
let popup = document.querySelector('.popup');

//Popup закрывается по клику на кнопку закрытия
let popupButtonClose = document.querySelector('.popup__button-close');

//Popup сохраняет информацию из inputs
let buttonSave = document.querySelector('.popup__button-save');
let formElement = document.querySelector('.popup__form');
let nameInput = formElement.querySelector('#popup_name')
let statusInput = formElement.querySelector('#popup_status')
let profileName = document.querySelector('.profile__name'); //Жак-Ив Кусто
let profileStatus = document.querySelector('.profile__status'); //Исследователь океана


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


