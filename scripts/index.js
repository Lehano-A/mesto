/////////////////////////////////////////////////
//БЛОК ПЕРЕМЕННЫХ
/////////////////////////////////////////////////


// Поиск шаблона
const elements = document.querySelector('.elements');
const templateElement = document.querySelector('.template-element').content;


// Popup открывается
const editButton = document.querySelector('.profile__edit-button');
const popup = document.querySelector('.popup');


// Popup закрывается по клику на кнопку закрытия
const popupButtonClose = document.querySelector('.popup__button-close');


// Popup сохраняет информацию из inputs
const formElement = document.querySelector('.popup__form');
const nameInput = formElement.querySelector('#popup_name');
const statusInput = formElement.querySelector('#popup_status');
const profileName = document.querySelector('.profile__name'); // Жак-Ив Кусто
const profileStatus = document.querySelector('.profile__status'); // Исследователь океана


// Popup масштабного открытия карточки
const popupOpenCardImage = document.querySelector('#popup-open-card-image');
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


/////////////////////////////////////////////////
// БЛОК ФУНКЦИЙ
/////////////////////////////////////////////////


// Функция первоначальной загрузки всех элементов массива на страницу
const addCard = initialCards.forEach(function (element) {
  const cloneElement = templateElement.querySelector('.element').cloneNode(true);
  const buttonsDeleteCards = cloneElement.querySelector('.element__button-delete');
  const buttonsLike = cloneElement.querySelector('.element__button-like');
  const cloneElementImage = cloneElement.querySelector('.element__image');

  cloneElement.querySelector('.element__image').src = element.link;
  cloneElement.querySelector('.element__image').alt = element.name;
  cloneElement.querySelector('.element__title').textContent = element.name;

  buttonsDeleteCards.addEventListener('click', () => { cloneElement.remove(); });
  buttonsLike.addEventListener('click', () => { buttonsLike.classList.toggle('element__button-like_active'); });

  cloneElementImage.addEventListener('click', () => {
    popupOpenCardImage.querySelector('#popup-image').src = element.link;
    popupOpenCardImage.classList.add('popup_opened');
    popupOpenCardImage.querySelector('#popup-title-card-image').textContent = element.name;
  });

  elements.append(cloneElement);
});



// Кнопка AddNewCard [ + ] в блоке "Profile"
// Popup добавления новой карточки => ОТКРЫВАЕТСЯ
function popupAddNewCardOpen() {
  popupAddNewCard.classList.add('popup_opened');
}


// Функция добавления новой карточки [ + ]
function submitAddNewCard(evt) {
  evt.preventDefault();
  const cloneElement = templateElement.querySelector('.element').cloneNode(true);
  const buttonsDeleteCards = cloneElement.querySelector('.element__button-delete');
  const buttonsLike = cloneElement.querySelector('.element__button-like');
  const cloneElementImage = cloneElement.querySelector('.element__image');
  const popupOpenCardImage = document.querySelector('#popup-open-card-image');

  cloneElement.querySelector('.element__image').src = addNewCardLink.value;
  cloneElement.querySelector('.element__image').alt = addNewCardTitle.value;
  cloneElement.querySelector('.element__title').textContent = addNewCardTitle.value;

  buttonsDeleteCards.addEventListener('click', () => { cloneElement.remove(); });
  buttonsLike.addEventListener('click', () => { buttonsLike.classList.toggle('element__button-like_active'); });

  cloneElementImage.addEventListener('click', () => {
    popupOpenCardImage.querySelector('#popup-title-card-image').textContent = cloneElement.querySelector('.element__title').textContent;
    popupOpenCardImage.querySelector('#popup-image').src = cloneElement.querySelector('.element__image').src;
    popupOpenCardImage.querySelector('#popup-image').alt =  cloneElement.querySelector('.element__image').alt;
    popupOpenCardImage.classList.add('popup_opened');
  });


  elements.prepend(cloneElement);

  popupClose();

  addNewCardLink.value = '';
  addNewCardTitle.value = '';
}



// Кнопка "Редактировать профиль" в блоке "Profile"
// Popup открывается
function popupOpen() {
  nameInput.value = profileName.textContent;
  statusInput.value = profileStatus.textContent;
  popup.classList.add('popup_opened');
}


// Popup закрывается по клику на кнопку закрытия
function popupClose() {
  popup.classList.remove('popup_opened');
  popupAddNewCard.classList.remove('popup_opened');
  popupOpenCardImage.classList.remove('popup_opened');
}


// Popup сохраняет информацию из inputs
// Функция изменения значений элементов name и status на значение из inputs
function formSubmitHandler(evt) {
  evt.preventDefault();
  profileName.textContent = nameInput.value;
  profileStatus.textContent = statusInput.value;
  popupClose();
}


/////////////////////////////////////////////////
// БЛОК СЛУШАТЕЛЕЙ
/////////////////////////////////////////////////


// Popup профайла => ОТКРЫВАЕТСЯ
editButton.addEventListener('click', popupOpen);


// Popup добавления новой карточки => ОТКРЫВАЕТСЯ
addNewCardButton.addEventListener('click', popupAddNewCardOpen);


// Форма отправки добавления новой карточки [ + ]
formAddNewCard.addEventListener('submit', submitAddNewCard);


// Popup сохраняет информацию из inputs
formElement.addEventListener('submit', formSubmitHandler);


// Popup профайла => ЗАКРЫВАЕТСЯ
popupButtonClose.addEventListener('click', popupClose);


// Popup добавления новой карточки => ЗАКРЫВАЕТСЯ
popupAddNewCardButtonClose.addEventListener('click', popupClose);


// Popup масштабного открытия карточки => ЗАКРЫВАЕТСЯ
buttonCloseCardImage.addEventListener('click', popupClose);



