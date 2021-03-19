//Кнопка "Редактировать профиль"

//Popup открывается
let editButton = document.querySelector('.profile__edit-button');
let popup = document.querySelector('.popup');

function popupOpen() {
    popup.classList.add('popup_opened');
}

editButton.addEventListener('click', popupOpen);



//Popup закрывается по клику на кнопку закрытия
let popupButtonClose = document.querySelector('.popup__button-close');

function popupClose() {
    popup.classList.remove('popup_opened');
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
        actualInactive.classList.toggle('element__button-like_active');
    }
    actualInactive.addEventListener('click', removeClass);
}



///////////////////////////////////////////////////

//Popup сохраняет информацию из inputs
let buttonSave = document.querySelector('.popup__button-save');
let formElement = document.querySelector('.popup__form');
let nameInput = formElement.querySelector('.popup__input[name="name"]')
let statusInput = formElement.querySelector('.popup__input[name="status"]')
let profileName = document.querySelector('.profile__name'); //Жак-Ив Кусто
let profileStatus = document.querySelector('.profile__status'); //Исследователь океана


//Функция изменения значений элементов name и status на значение из inputs
function formSubmitHandler(evt) {
    evt.preventDefault();

    profileName.textContent = nameInput.value;
    profileStatus.textContent = statusInput.value;

    console.log(profileName);
    console.log(profileStatus);
}

formElement.addEventListener('submit', formSubmitHandler);


