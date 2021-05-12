import Popup from '/components/Popup.js'

// КЛАСС ОТВЕЧАЮЩИЙ ЗА ПОПАПЫ С ФОРМАМИ
export default class PopupWithForm extends Popup {

  constructor(popupSelector, { handlerSubmitForm }) {
    super(popupSelector)
    this.handlerSubmitForm = handlerSubmitForm; // КОЛБЭК САБМИТА ФОРМЫ
  }

  // ЗАКРЫВАЕМ ПОПАП С ФОРМОЙ
  close() {

    this._formPopup = this._popupSelector.querySelector('.popup__form'); // ИЩЕМ ФОРМУ
    this._formPopup.reset(); // СБРОС ФОРМЫ
    super.close(); // ЗАКРЫТИЕ ФОРМЫ
  }


  // МЕТОД СОБИРАЕТ ДАННЫЕ ВСЕХ ПОЛЕЙ В ОБЪЕКТ
  _getInputValues() {

    this._inputsForm = this._popupSelector.querySelectorAll('.popup__input'); // ИЩЕМ ВСЕ ПОЛЯ
    this._inputsValues = {}; // СОЗДАЁМ ПУСТОЙ ОБЪЕКТ
    // ПЕРЕСЧИТЫВАЕМ ПОЛЯ И ДОБАВЛЯЕМ ПО АТРИБУТУ ЗНАЧЕНИЮ АТРИБУТА NAME В СОЗДАННЫЙ ОБЪЕКТ
    this._inputsForm.forEach((item) => { this._inputsValues[item.name] = item.value })
    return this._inputsValues;
  }


  // СЛУШАТЕЛЬ САБМИТА
  setEventListeners() {

    this._popupSelector.addEventListener('submit', () => {

      this.handlerSubmitForm(this._getInputValues()); // ОТПРАВЛЯЕМ В КОЛБЭК ОБЪЕКТ С ДАННЫМИ ИЗ ПОЛЕЙ ФОРМЫ
      this.close(); // ЗАКРЫВАЕМ ФОРМУ
    })
  }
}
