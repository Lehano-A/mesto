//Кнопка "Редактировать профиль"

//Popup открывается
let editButton = document.querySelector('.profile__edit-button');
let popup = document.querySelector('.popup');

//Popup закрывается по клику на кнопку закрытия
let popupButtonClose = document.querySelector('.popup__button-close');

//Popup сохраняет информацию из inputs
let buttonSave = document.querySelector('.popup__button-save');
let formElement = document.querySelector('.popup__form');
let nameInput = formElement.querySelector('.popup__input[id="popup_name"]')
let statusInput = formElement.querySelector('.popup__input[id="popup_status"]')
let profileName = document.querySelector('.profile__name'); //Жак-Ив Кусто
let profileStatus = document.querySelector('.profile__status'); //Исследователь океана


//Popup открывается
function popupOpen() {
  nameInput.textContent = profileName.value;
  statusInput.textContent = profileStatus.value;
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


