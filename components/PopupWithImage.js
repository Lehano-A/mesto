import Popup from '/components/Popup.js'

// КЛАСС ОТВЕЧАЮЩИЙ ЗА ПОПАП С КАРТИНКОЙ В МАСШТАБЕ
export default class PopupWithImage extends Popup {

  constructor(popupSelector, name, link) {
    super(popupSelector);
    this._imageZoom = this._popupSelector.querySelector('#popup-image'); // ИЩЕМ МЕСТО ДЛЯ КАРТИНКИ
    this._titleZoom = this._popupSelector.querySelector('#popup-title-card-image'); // ИЩЕМ МЕСТО ДЛЯ ТИТУЛЬНИКА КАРТИНКИ
    this._name = name; // НАЗВАНИЕ КАРТИНКИ
    this._link = link; // ССЫЛКА НА КАРТИНКУ
  }


  open() {

    this._imageZoom.src = this._link; // ВСТАВЛЯЕМ КАРТИНКУ НА МЕСТО
    this._imageZoom.alt = this._name; // ВСТАВЛЯЕМ АЛЬТ НА МЕСТО
    this._titleZoom.textContent = this._name; // ВСТАВЛЯЕМ ТИТУЛЬНИК НА МЕСТО
    super.setEventListeners(); // ПОДКЛЮЧАЕМ СЛУШАТЕЛЯ
    super.open() // ОТКРЫВАЕМ КАРТИНКУ В МАСШТАБЕ
  }
}



