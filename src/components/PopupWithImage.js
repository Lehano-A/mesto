import Popup from '/src/components/Popup.js';

// КЛАСС ОТВЕЧАЮЩИЙ ЗА ПОПАП С КАРТИНКОЙ В МАСШТАБЕ
export default class PopupWithImage extends Popup {

  constructor(popupElement) {
    super(popupElement)
    this._popupZoom = this._popupElement.querySelector('#popup-image'); // ИЩЕМ МЕСТО ДЛЯ КАРТИНКИ
    this._titleZoom = this._popupElement.querySelector('#popup-title-card-image'); // ИЩЕМ МЕСТО ДЛЯ ТИТУЛЬНИКА КАРТИНКИ
  }


  open(name, link) { // name - НАЗВАНИЕ КАРТИНКИ, link - ССЫЛКА НА КАРТИНКУ
    this._popupZoom.src = link; // ВСТАВЛЯЕМ КАРТИНКУ НА МЕСТО
    this._popupZoom.setAttribute('alt', name); // ВСТАВЛЯЕМ АЛЬТ НА МЕСТО
    this._titleZoom.textContent = name; // ВСТАВЛЯЕМ ТИТУЛЬНИК НА МЕСТО
    super.open(); // ОТКРЫВАЕМ КАРТИНКУ В МАСШТАБЕ
  }

  setEventListeners() {
    super.setEventListeners(); // ПОДКЛЮЧАЕМ СЛУШАТЕЛЯ
  }
}



