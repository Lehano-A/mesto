//Кнопка "Редактировать профиль"

//Popup открывается
let editButton = document.querySelector('.profile__edit-button');
let popup = document.querySelector('.popup');

function popupOpen() {
    let popupRemoveClass = popup.classList.remove('popup_close');
}

editButton.addEventListener('click', popupOpen);


//Popup закрывается по клику на кнопку закрытия
let popupButtonClose = document.querySelector('.popup__button-close')

function popupClose() {
    let popupAddClass = popup.classList.add('popup_close')
}

popupButtonClose.addEventListener('click', popupClose);


//Popup закрывается по клику на overlay
let popupOverlay = document.querySelector('.popup__overlay')

popupOverlay.addEventListener('click', popupClose);

