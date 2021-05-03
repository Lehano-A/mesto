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

export { closePopupByEsc, closePopup };
