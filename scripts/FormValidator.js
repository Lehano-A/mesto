// КЛАСС ПРОИЗВОДЯЩИЙ ВАЛИДАЦИЮ ПОЛЕЙ ФОРМ
export default class FormValidator {

  constructor(enableValidationConfig, formElement) {
    this._formSelector = enableValidationConfig.formSelector; // СЕЛЕКТОР ФОРМЫ
    this._inputSelector = enableValidationConfig.inputSelector; // СЕЛЕКТОР ПОЛЯ В ФОРМЕ
    this._submitButtonSelector = enableValidationConfig.submitButtonSelector; // СЕЛЕКТОР КНОПКИ "ОТПРАВКИ ДАННЫХ"
    this._inactiveButtonClass = enableValidationConfig.inactiveButtonClass; // СЕЛЕКТОРА КНОПКИ "ОТПРАВКА ДАННЫХ" НЕАКТИВНА
    this._inputErrorClass = enableValidationConfig.inputErrorClass; // СТИЛЬ ПОЛЯ ВО ВРЕМЯ НЕВАЛИДНОСТИ
    this._errorClass = enableValidationConfig.errorClass; // СЕЛЕКТОРА СПАНА С ОШИБКОЙ В ПОЛЕ АКТИВЕН
    this._spanErrorActive = enableValidationConfig.spanErrorActive; // СЕЛЕКТОР СПАНА С ОШИБКОЙ АКТИВЕН
    this._formElement = formElement; // ЭЛЕМЕНТ ПРИНЯТОЙ ФОРМЫ
    this._submitButton = formElement.querySelector(enableValidationConfig.submitButtonSelector); // КНОПКА "ОТПРАВКА ДАННЫХ" ПРИНЯТОЙ ФОРМЫ
    this._inputList = Array.from(formElement.querySelectorAll(enableValidationConfig.inputSelector)); // МАССИВ ПОЛЕЙ ПРИНЯТОЙ ФОРМЫ
  }


  // ПОЛУЧЕНИЕ ФОРМЫ ИЗ index.js
  _receiveFormElement() {
    this._setEventListeners(this._formElement); // ОТПРАВЛЯЕМ СТАВИТЬ СЛУШАТЕЛЬ НА ФОРМУ
  }


  // ВКЛЮЧЕНИЕ ВАЛИДАЦИИ ФОРМ
  enableValidation() {
    this._receiveFormElement();
  }


  // СТАВИМ СЛУШАТЕЛЕЙ НА ФОРМЫ И ПОЛЯ
  _setEventListeners() {

    // СЛУШАТЕЛЬ SUBMIT
    this._formElement.addEventListener('submit', (evt) => { // НА КАЖДУЮ ФОРМУ СТАВИМ 'SUBMIT'
      evt.preventDefault();
    });

    // СЛУШАТЕЛЬ INPUT
    this._inputList.forEach((eachInputElement) => {
      // ПЕРЕСЧИТЫВАЕМ ВСЕ ПОЛЯ В ФОРМЕ
      eachInputElement.addEventListener('input', () => { // КАЖДОМУ ПОЛЮ ВЕШАЕМ 'INPUT'
        this._checkAtValid(eachInputElement);
        this._toggleButtonDesign();
      });
    });
  }


  // ПРОВЕРКА ВАЛИДНОСТИ ПОЛЯ, В КОТОРОМ ВВОДЯТСЯ ДАННЫЕ +
  // ОТПРАВКА КОМАНДЫ НА ВКЛЮЧЕНИЕ/ОТКЛЮЧЕНИЕ ОШИБКИ ВВОДА ДАННЫХ

  _checkAtValid(eachInputElement) {
    if (!eachInputElement.validity.valid) {
      this._showInputError(eachInputElement); // FALSE - ПОКАЗЫВАЕМ ОШИБКУ

    } else {

      this._hideInputError(eachInputElement); // TRUE - СКРЫВАЕМ ОШИБКУ
    }
  }

  _hideInputError(eachInputElement) {

    this._spanInputError = this._formElement.querySelector(`.${eachInputElement.id}-error`);
    eachInputElement.classList.remove(this._inputErrorClass);
    this._spanInputError.classList.remove(this._spanErrorActive);
    this._spanInputError.textContent = '';
  }


  _showInputError(eachInputElement) {

    this._spanInputError = this._formElement.querySelector(`.${eachInputElement.id}-error`);
    eachInputElement.classList.add(this._inputErrorClass);
    this._spanInputError.classList.add(this._spanErrorActive);
    this._spanInputError.textContent = eachInputElement.validationMessage;
  }


  _toggleButtonDesign() {

    this._checkInvalidInput = this._hasInvalidInput(); // ОТПРАВИЛИ НА ПРОВЕРКУ ВАЛИДНОСТИ

    if (this._checkInvalidInput) { // ЕСЛИ ХОТЯ БЫ ОДНО ПОЛЕ НЕВАЛИДНО
      this._submitButton.setAttribute('disabled', true); // ДЕАКТИВИРУЕМ КНОПКУ "ОТПРАВКИ ДАННЫХ"
      this._submitButton.classList.add(this._inactiveButtonClass); // МЕНЯЕМ ДИЗАЙН КНОПКИ "ОТПРАВКИ ДАННЫХ"
    } else { // ЕСЛИ ВСЕ ПОЛЯ ВАЛИДНЫ

      this._submitButton.removeAttribute('disabled'); // АКТИВИРУЕМ КНОПКУ "ОТПРАВКИ ДАННЫХ"
      this._submitButton.classList.remove(this._inactiveButtonClass); // "МЕНЯЕМ ДИЗАЙН КНОПКИ "ОТПРАВКИ ДАННЫХ"
    }
  }


  // ПРОВЕРКА ВАЛИДНОСТИ СРАЗУ ВСЕХ ПОЛЕЙ ОТДЕЛЬНОЙ ФОРМЫ
  _hasInvalidInput() { // ПРИНИМАЕТ МАССИВ ПОЛЕЙ ФОРМЫ

    return this._inputList.some((eachInputElement) => { // ОСУЩЕСТВЛЯЕТ ПРОВЕРКУ ВАЛИДНОСТИ КАЖДОГО ПОЛЯ ИЗ МАССИВА ПОЛЕЙ
      return !eachInputElement.validity.valid; // ВОЗВРАЩАЕТ НЕВАЛИДНОСТЬ
    });
  }

  // МЕТОД СБРАСЫВАНИЯ ОШИБОК ФОРМЫ ПЕРЕД ОТКРЫТИЕМ ПОПАПА
  resetValidation() {
    this._inputList.forEach((inputElement) => {
      this._hideInputError(inputElement)
    });

    this._toggleButtonDesign();
  }
}
