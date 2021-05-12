// КЛАСС ОТВЕЧАЮЩИЙ ЗА ОТКРЫТИЕ И ЗАКРЫТИЕ ПОПАПА
export default class Popup {
  constructor(popupSelector) {
    this._popupSelector = document.querySelector(popupSelector); // ИЩЕМ DOM-ЭЛЕМЕНТ ПОПАПА
  }

  // ПРОВЕРКА НАЖАТИЯ НА 'ESCAPE'
  _handleEscClose(evt) {

    if (evt.key == 'Escape') { // ЕСЛИ НАЖАЛИ 'ESCAPE'
      this.close(); // ТО ЗАКРЫВАЕМ ПОПАП
    }
  }


  // ОТКРЫВАЕМ ПОПАП
  open() {

    document.addEventListener('keydown', (evt) => { // УСТАНАВЛИВАЕМ СЛУШАТЕЛЬ НАЖАТИЯ 'ESCAPE' ПРИ ОТКРЫТИИ ПОПАПА
      this._handleEscClose(evt); // ПРОВЕРКА НАЖАТИЯ НА 'ESCAPE'
    });
    this._popupSelector.classList.add('popup_opened'); // ОТКРЫВАЕМ ПОПАП
  }


  // ЗАКРЫВАЕМ ПОПАП
  close() {

    if (document.querySelector('.popup_opened')) {
      this._popupSelector.classList.remove('popup_opened'); // ЗАКРЫВАЕМ ПОПАП
      this._popupSelector.removeEventListener('keydown', (evt) => { // СНИМАЕМ СЛУШАТЕЛЬ НАЖАТИЯ 'ESCAPE'
        this._handleEscClose(evt);
      });
    }
  }


  // СЛУШАТЕЛЬ КЛИКА ЗАКРЫТИЯ ПО КРЕСТИКУ ИЛИ ПО ОВЕРЛЕЮ
  setEventListeners() {

    this._popupSelector.addEventListener('click', (evt) => {

      if (evt.target.classList.contains('popup_opened') || evt.target.classList.contains('popup__button-close')) {
        this.close()
      }
    })
  }
}

