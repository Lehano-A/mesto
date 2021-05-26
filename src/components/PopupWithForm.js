import Popup from '/src/components/Popup.js'

// КЛАСС ОТВЕЧАЮЩИЙ ЗА ПОПАПЫ С ФОРМАМИ
export default class PopupWithForm extends Popup {

  constructor(popupElement, { handlerSubmitForm }) {
    super(popupElement);
    this.handlerSubmitForm = handlerSubmitForm; // КОЛБЭК САБМИТА ФОРМЫ
    this._formPopup = this._popupElement.querySelector('.popup__form'); // ИЩЕМ ФОРМУ
    this._inputsForm = this._popupElement.querySelectorAll('.popup__input'); // ИЩЕМ ВСЕ ПОЛЯ ФОРМЫ
    this._buttonSubmit = this._formPopup.querySelector('.popup__button-save')
  }

  // ЗАКРЫВАЕМ ПОПАП С ФОРМОЙ
  close() {

    this._formPopup.reset(); // СБРОС ФОРМЫ
    super.close(); // ЗАКРЫТИЕ ФОРМЫ
  }

  open() {
    if (this._buttonSubmit.textContent != 'Сохранить') {
      this._buttonSubmit.textContent = 'Сохранить';
    }
    super.open();
  }

  // МЕТОД СОБИРАЕТ ДАННЫЕ ВСЕХ ПОЛЕЙ В ОБЪЕКТ
  _getInputValues() {

    this._inputsValues = {}; // СОЗДАЁМ ПУСТОЙ ОБЪЕКТ
    // ПЕРЕСЧИТЫВАЕМ ПОЛЯ И ДОБАВЛЯЕМ ПО АТРИБУТУ ЗНАЧЕНИЮ АТРИБУТА NAME В СОЗДАННЫЙ ОБЪЕКТ
    this._inputsForm.forEach((item) => {this._inputsValues[item.name] = item.value }); // {title: "...", link: "..."}

    return this._inputsValues;
  }


  // СЛУШАТЕЛЬ САБМИТА
  setEventListeners() {
    super.setEventListeners();
    this._popupElement.addEventListener('submit', (evt) => {
      evt.preventDefault();
      this._buttonSubmit.textContent = 'Сохранение...'
      this.handlerSubmitForm(this._getInputValues()); // ОТПРАВЛЯЕМ В КОЛБЭК ОБЪЕКТ С ДАННЫМИ ИЗ ПОЛЕЙ ФОРМЫ
    })
  }
}
