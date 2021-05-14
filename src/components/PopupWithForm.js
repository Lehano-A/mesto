import Popup from '/src/components/Popup.js'

// КЛАСС ОТВЕЧАЮЩИЙ ЗА ПОПАПЫ С ФОРМАМИ
export default class PopupWithForm extends Popup {

  constructor(popupElement, { handlerSubmitForm }) {
    super(popupElement);
    this.handlerSubmitForm = handlerSubmitForm; // КОЛБЭК САБМИТА ФОРМЫ
    this._formPopup = this._popupElement.querySelector('.popup__form'); // ИЩЕМ ФОРМУ
    this._inputsForm = this._popupElement.querySelectorAll('.popup__input'); // ИЩЕМ ВСЕ ПОЛЯ ФОРМЫ
  }

  // ЗАКРЫВАЕМ ПОПАП С ФОРМОЙ
  close() {

    this._formPopup.reset(); // СБРОС ФОРМЫ
    super.close(); // ЗАКРЫТИЕ ФОРМЫ
  }

  open() {
    super.open();
  }

  // МЕТОД СОБИРАЕТ ДАННЫЕ ВСЕХ ПОЛЕЙ В ОБЪЕКТ
  _getInputValues() {

    this._inputsValues = {}; // СОЗДАЁМ ПУСТОЙ ОБЪЕКТ
    // ПЕРЕСЧИТЫВАЕМ ПОЛЯ И ДОБАВЛЯЕМ ПО АТРИБУТУ ЗНАЧЕНИЮ АТРИБУТА NAME В СОЗДАННЫЙ ОБЪЕКТ
    this._inputsForm.forEach((item) => { this._inputsValues[item.name] = item.value });
    return this._inputsValues;
  }


  // СЛУШАТЕЛЬ САБМИТА
  setEventListeners() {
    super.setEventListeners();
    this._popupElement.addEventListener('submit', () => {

      this.handlerSubmitForm(this._getInputValues()); // ОТПРАВЛЯЕМ В КОЛБЭК ОБЪЕКТ С ДАННЫМИ ИЗ ПОЛЕЙ ФОРМЫ
      this.close(); // ЗАКРЫВАЕМ ФОРМУ
    })
  }
}
