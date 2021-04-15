// ЗАКРЫВАТЕЛЬ ПОПАПА ПО КНОПКЕ 'ESCAPE'
function closePopupAtEsc(evt) {
  if (evt.key == 'Escape' && popupAddNewCard.classList.contains('popup_opened')) { // ЕСЛИ ОТКРЫТ ПОПАП ДОБАВЛЕНИЯ НОВОЙ КАРТОЧКИ
    popupAddNewCard.classList.remove('popup_opened');
    formAddNewCard.reset();
    removeErrorsWhenClosed(popupAddNewCard);

  } else if (evt.key == 'Escape' && popupProfile.classList.contains('popup_opened')) { // ЕСЛИ ОТКРЫТ ПОПАП ПРОФАЙЛА
    popupProfile.classList.remove('popup_opened');
    removeErrorsWhenClosed(profileFormElement);

  } else if (evt.key == 'Escape' && popupZoomOpenCardImage.classList.contains('popup_opened')) { // ЕСЛИ ОТКРЫТ ПОПАП МАСШТАБНОГО ОТКРЫТИЯ КАРТОЧКИ
    popupZoomOpenCardImage.classList.remove('popup_opened');
  }

}


// ЗАКРЫВАТЕЛЬ ПОПАПА ПО КЛИКУ НА КНОПКУ ЗАКРЫТИЯ С ОТПРАВКОЙ
// В ФУНКЦИЮ ПОИСКА ФОРМЫ И ДАЛЬНЕЙШЕГО ЕЁ ОЧИЩЕНИЯ ОТ ОШИБОК
function closePopup(popup) { // ПРИНИМАЕТ В СЕБЯ ПОПАП ОТ СЛУШАТЕЛЕЙ КЛИКА

  if (popup === popupProfile) { // ЕСЛИ ЭТО ПОПАП ПРОФАЙЛА
    popup.classList.remove('popup_opened');
    listenErrorsInputs(popup); //ОТПРАВЛЯЕМ НА ОЧИЩЕНИЕ ФОРМЫ ОТ ОШИБОК

  } else if (popup === popupAddNewCard) { // ЕСЛИ ЭТО ПОПАП ДОБАВЛЕНИЯ НОВОЙ КАРТОЧКИ
    popup.classList.remove('popup_opened');
    formAddNewCard.reset();
    listenErrorsInputs(popup); //ОТПРАВЛЯЕМ НА ОЧИЩЕНИЕ ФОРМЫ ОТ ОШИБОК

  } else if (popup === popupZoomOpenCardImage) { // ЕСДИ ЭТО ПОПАП МАСШТАБНОГО ОТКРЫТИЯ ИЗОБРАЖЕНИЯ
    popup.classList.remove('popup_opened');
  }
}


// ЗАКРЫВАТЕЛЬ ПОПАПА ПО КЛИКУ НА ОВЕРЛЕЙ
function closeOverlay() {
  const allPopupsOverlay = document.querySelectorAll('.popup'); // ИЩЕМ ВСЕ ОВЕРЛЕИ ПОПАПОВ
  allPopupsOverlay.forEach((item) => { // ДЕЛАЕМ ПЕРЕСЧЕТ ОВЕРЛЕЕВ

    // MOUSEDOWN В СВЯЗИ С ТЕМ, ЧТО ЕСЛИ БУДЕТ 'CLICK', ТО ПРИ ВЫДЕЛЕНИИ ТЕКСТА В ПОЛЕ ФОРМЫ
    // МЫШКОЙ С ПОМОЩЬЮ ЛЕВОЙ КЛАВИШИ, И ЕСЛИ ЭТУ КЛАВИШУ ОТПУСТИТЬ НА ОВЕРЛЕЕ, ТО ПОПАП ЗАКРОЕТСЯ
    item.addEventListener('mousedown', (evt) => { // ВЕШАЕМ СЛУШАТЕЛЬ КЛИКА НА ОВЕРЛЕЙ
      evt.target.classList.remove('popup_opened'); // ЗАКРЫВАЕМ НУЖНЫЙ ОВЕРЛЕЙ

      if (evt.target.id === 'popup-open-profile') { // ЕСЛИ ЭТО ОВЕРЛЕЙ ПРОФАЙЛА
        const profileFormElement = popupProfile.querySelector('.popup__form'); // ИЩЕМ ФОРМУ ПРОФАЙЛА
        removeErrorsWhenClosed(profileFormElement); // ОТПРАВИЛИ ФОРМУ ПРОФАЙЛА В ФУНКЦИЮ-ОЧИЩАТЕЛЬ ФОРМ

      } else if (evt.target.id === 'popup-add-new-card') { // ЕСЛИ ЭТО ОВЕРЛЕЙ ДОБАВЛЕНИЯ НОВОЙ КАРТОЧКИ
        const addNewCardFormElement = popupAddNewCard.querySelector('.popup__form'); // ИЩЕМ ФОРМУ ДОБАВЛЕНИЯ НОВОЙ КАРТОЧКИ
        addNewCardFormElement.reset(); // СБРАСЫВАЕМ ФОРМУ
        removeErrorsWhenClosed(addNewCardFormElement); // ОТПРАВИЛИ ФОРМУ ПРОФАЙЛА В ФУНКЦИЮ-ОЧИЩАТЕЛЬ ФОРМ
      }
    });
  });
}

closeOverlay();


// ФУНКЦИЯ-СЛУШАТЕЛЬ ПУСТЫХ ПОЛЕЙ У ФОРМ ПРИ НАЖАТИИ НА КНОПКУ ЗАКРЫТИЯ
function listenErrorsInputs(closedPopup) {

  closedPopup.addEventListener('click', (evt) => {

    if (evt.target.classList.contains('popup__button-close')) {
      const idPopupButton = evt.target.id; // ID КНОПКИ ЗАКРЫТИЯ ПОПАПА
      const buttonClosePopup = document.querySelector(`#${idPopupButton}`); // ИЩЕМ КНОПКУ ЗАКРЫТИЯ ПОПАПА
      const parrentButtonClose = buttonClosePopup.closest('.popup__window'); // ИЩЕМ РОДИТЕЛЯ КНОПКИ
      const formParrentButtonClose = parrentButtonClose.querySelector('.popup__form'); // ИЩЕМ ФОРМУ В НАЙДЕННОМ РОДИТЕЛЕ КНОПКИ
      removeErrorsWhenClosed(formParrentButtonClose); // ОТПРАВЛЯЕМ НА ОЧИЩЕНИЕ ОТ ОШИБОК
    }
  });
}


// ОЧИСТИТЕЛЬ ОШИБОК ПОЛЕЙ ПРИ ЗАКРЫТИИ ПОПАПОВ РАЗНЫМИ СПОСОБАМИ
function removeErrorsWhenClosed(needFormElement) { // ПРИНИМАЕМ НА ВХОД НУЖНУЮ ФОРМУ
  const allInputsForm = needFormElement.querySelectorAll(enableValidationConfig.inputSelector); // ИЩЕМ ВСЕ ПОЛЯ В ЭТОЙ ФОРМЕ

  allInputsForm.forEach((eachInput) => { // ПЕРЕСЧЁТ ПОЛЕЙ ФОРМЫ
    const allSpansInputs = needFormElement.querySelector(`.${eachInput.id}-error`); // ИЩЕМ ВСЕ СПАНЫ ОШИБОК У ЭТИХ ПОЛЕЙ
    eachInput.classList.remove(enableValidationConfig.inputErrorClass); // УБИРАЕМ ОФОРМЛЕНИЕ ОШИБКИ ПОЛЯ
    allSpansInputs.classList.remove(enableValidationConfig.spanErrorActive); // УБИРАЕМ ОШИБКИ
  });
}
