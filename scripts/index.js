//Кнопка "Редактировать профиль"


//Popup открывается
let editButton = document.querySelector('.profile__edit-button');
let popup = document.querySelector('.popup');

function popupOpen() {
    popup.classList.remove('popup_close');
}

editButton.addEventListener('click', popupOpen);



//Popup закрывается по клику на кнопку закрытия
let popupButtonClose = document.querySelector('.popup__button-close');

function popupClose() {
    popup.classList.add('popup_close');
}

popupButtonClose.addEventListener('click', popupClose);



//Popup закрывается по клику на overlay
let popupOverlay = document.querySelector('.popup__overlay');

popupOverlay.addEventListener('click', popupClose);



///////////////////////////////////////////////////



//Кнопка "like"

//Сердце меняет цвет
let buttonsLike = document.querySelectorAll('.element__button-like');


for (i = 0; i < buttonsLike.length; i++) {
    let actualInactive = buttonsLike[i];

        function removeClass() {
            actualInactive.classList.toggle('element__button-like_inactive');
          }
        actualInactive.addEventListener('click', removeClass);
        
}


