// ЗАКРЫВАТЕЛЬ ПОПАПА ПО КНОПКЕ 'ESCAPE'
function closePopupByEsc(evt) {
  if (evt.key == 'Escape') {
    const openPopup = document.querySelector('.popup_opened');
    closePopup(openPopup);
  }
}


// ЗАКРЫВАТЕЛЬ ПОПАПА
function closePopup(popup) { // ПРИНИМАЕТ В СЕБЯ НАЙДЕННЫЙ ОТКРЫТЫЙ ПОПАП
  document.removeEventListener('keydown', closePopupByEsc);
  popup.classList.remove('popup_opened');

}


// ЗАКРЫВАТЕЛЬ ПОПАПА ПО КЛИКУ НА ОВЕРЛЕЙ
function closeOverlay() {
  const allPopupsOverlay = document.querySelectorAll('.popup'); // ИЩЕМ ВСЕ ОВЕРЛЕИ ПОПАПОВ
  allPopupsOverlay.forEach((item) => { // ДЕЛАЕМ ПЕРЕСЧЕТ ОВЕРЛЕЕВ

    // MOUSEDOWN В СВЯЗИ С ТЕМ, ЧТО ЕСЛИ БУДЕТ 'CLICK', ТО ПРИ ВЫДЕЛЕНИИ ТЕКСТА В ПОЛЕ ФОРМЫ
    // МЫШКОЙ С ПОМОЩЬЮ ЛЕВОЙ КЛАВИШИ, И ЕСЛИ ЭТУ КЛАВИШУ ОТПУСТИТЬ НА ОВЕРЛЕЕ, ТО ПОПАП ЗАКРОЕТСЯ
    item.addEventListener('mousedown', (evt) => { // ВЕШАЕМ СЛУШАТЕЛЬ КЛИКА НА ОВЕРЛЕЙ
      if (evt.target.classList.contains('popup_opened')) { // ЕСЛИ ЭТО ОВЕРЛЕЙ ПРОФАЙЛА
        closePopup(item); // ОТПРАВИЛИ ФОРМУ ПРОФАЙЛА В ФУНКЦИЮ-ОЧИЩАТЕЛЬ ФОРМ
      }
    });
  });
}

closeOverlay();

export { closePopupByEsc, closePopup };
