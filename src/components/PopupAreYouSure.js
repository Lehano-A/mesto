import Popup from '/src/components/Popup.js';

// КЛАСС ОТВЕЧАЮЩИЙ ЗА ПОПАП ПОДТВЕРЖДЕНИЯ
export default class PopupAreYouSure extends Popup {

  constructor(popupElement, { handlerDeleteCardFromServer }) {
    super(popupElement);
    this._formAccept = this._popupElement.querySelector('#form-are-you-sure') // КНОПКА СОГЛАСИЯ НА УДАЛЕНИЕ В ПОПАПЕ - ARE YOU SURE
    this._handlerDeleteCardFromServer = handlerDeleteCardFromServer;  // КОЛБЭК ОБРАБОТКИ УДАЛЕНИЯ КАРТОЧКИ С СЕРВЕРА
  }

  open(cardTemplate, idCard) {
    super.open();

    this._cardTemplate = cardTemplate
    this._idCard = idCard
  }

  // КОЛБЭК ОБРАБОТКИ УДАЛЕНИЯ КАРТОЧКИ С СЕРВЕРА
  handlerDeleteCardFromServer() {
    this._handlerDeleteCardFromServer(this._cardTemplate, this._idCard)
  }


  setEventListeners() { // ПРИНИМАЕТ ШАБЛОН КАРТОЧКИ, КОТОРЫЙ НУЖНО УДАЛИТЬ
    super.setEventListeners();
    this._formAccept.addEventListener('submit', (evt) => {
      evt.preventDefault();
      this.handlerDeleteCardFromServer()
    })
  }

}