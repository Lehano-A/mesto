// КЛАСС ОТВЕЧАЮЩИЙ ЗА ОТКРЫТИЕ И ЗАКРЫТИЕ ПОПАПА
export default class Popup {
  constructor(popupSelector) {
    this._popupElement = document.querySelector(popupSelector); // ИЩЕМ DOM-ЭЛЕМЕНТ ПОПАПА
  }

  // ПРОВЕРКА НАЖАТИЯ НА 'ESCAPE'
  _handleEscClose(event) {
    if (event.key == 'Escape') {
      this.close();
    }
  }


  // ОТКРЫВАЕМ ПОПАП
  open() {
    this.bindHandleEscClose = this._handleEscClose.bind(this);

    document.addEventListener('keydown', this.bindHandleEscClose)  // УСТАНАВЛИВАЕМ СЛУШАТЕЛЬ НАЖАТИЯ 'ESCAPE' ПРИ ОТКРЫТИИ ПОПАПА
    this._popupElement.classList.add('popup_opened'); // ОТКРЫВАЕМ ПОПАП
  }


  // ЗАКРЫВАЕМ ПОПАП
  close () {

    if (document.querySelector('.popup_opened')) {
      this._popupElement.classList.remove('popup_opened'); // ЗАКРЫВАЕМ ПОПАП
      document.removeEventListener('keydown', this.bindHandleEscClose)
    }
  }


  // СЛУШАТЕЛЬ КЛИКА ЗАКРЫТИЯ ПО КРЕСТИКУ ИЛИ ПО ОВЕРЛЕЮ
  setEventListeners() {

    this._popupElement.addEventListener('click', (evt) => {

      if (evt.target.classList.contains('popup_opened') || evt.target.classList.contains('popup__button-close')) {
        this.close()
      }
    })
  }
}

