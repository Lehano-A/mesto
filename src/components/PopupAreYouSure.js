import Popup from '/src/components/Popup.js';

// КЛАСС ОТВЕЧАЮЩИЙ ЗА ПОПАП ПОДТВЕРЖДЕНИЯ
export default class PopupAreYouSure extends Popup {

  constructor(popupElement, { handlerDeleteCardFromServer }) {
    super(popupElement);
    this._buttonAccept = this._popupElement.querySelector('#are-you-sure-button-accept') // КНОПКА СОГЛАСИЯ НА УДАЛЕНИЕ В ПОПАПЕ - ARE YOU SURE
    this._handlerDeleteCardFromServer = handlerDeleteCardFromServer;  // КОЛБЭК ОБРАБОТКИ УДАЛЕНИЯ КАРТОЧКИ С СЕРВЕРА
  }


  _open() {
    super.open();
  }


  _close() {
    super.close()
  }


  // КОЛБЭК ОБРАБОТКИ УДАЛЕНИЯ КАРТОЧКИ С СЕРВЕРА
  handlerDeleteCardFromServer(cardTemplate, idCard) {
    this._handlerDeleteCardFromServer(cardTemplate, idCard)
  }


  setEventListeners(cardTemplate, idCard) { // ПРИНИМАЕТ ШАБЛОН КАРТОЧКИ, КОТОРЫЙ НУЖНО УДАЛИТЬ
    super.setEventListeners();

    this._buttonAccept.addEventListener('click', () => {
      this.handlerDeleteCardFromServer(cardTemplate, idCard)
      this._close()
    })

    this._open();
  }

}