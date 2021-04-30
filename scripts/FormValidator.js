// КЛАСС ПРОИЗВОДЯЩИЙ ВАЛИДАЦИЮ ПОЛЕЙ ФОРМ
export default class FormValidator {

  constructor(enableValidationConfig, formElement) {
    this._formSelector = enableValidationConfig.formSelector; // ФОРМА
    this._inputSelector = enableValidationConfig.inputSelector; // ПОЛЕ
    this._submitButtonSelector = enableValidationConfig.submitButtonSelector; // КНОПКА "ОТПРАВКИ ДАННЫХ"
    this._inactiveButtonClass = enableValidationConfig.inactiveButtonClass; // КНОПКА "ОТПРАВКА ДАННЫХ" НЕАКТИВНА
    this._inputErrorClass = enableValidationConfig.inputErrorClass; // СТИЛЬ ПОЛЯ ВО ВРЕМЯ НЕВАЛИДНОСТИ
    this._errorClass = enableValidationConfig.errorClass; // СПАН С ОШИБКОЙ В ПОЛЕ АКТИВЕН
    this._spanErrorActive = enableValidationConfig.spanErrorActive; // СПАН С ОШИБКОЙ АКТИВЕН
    this._formElement = formElement; // ССЫЛКА ВХОДЯЩЕЙ ФОРМЫ
  }


  // ПЕРЕСЧЁТ ВСЕХ ФОРМ
  _recalculatePrimaryValidityAllForms() {
    this._allFormsElements = Array.form(document.querySelectorAll(this._formSelector)); // МАССИВ ИЗ ФОРМ
    this._allFormsElements.forEach((form) => {
      this._setEventListeners(form); // ОТПРАВЛЯЕМ КАЖДУЮ НАЙДЕННУЮ ФОРМУ НА УСТАНОВКУ СЛУШАТЕЛЕЙ
    })
  }


  // ПОЛУЧЕНИЕ ФОРМЫ ИЗ index.js
  _receiveFormElement() {
    this._setEventListeners(this._formElement); // ОТПРАВЛЯЕМ СТАВИТЬ СЛУШАТЕЛЬ НА ФОРМУ
    this._hasActiveSpanError(this._formElement); // ОТПРАВЛЯЕМ НА ПРОВЕРКУ НАЛИЧИЯ АКТИВНЫХ ОШИБОК ПОЛЕЙ
  }


  // ВКЛЮЧЕНИЕ ВАЛИДАЦИИ ФОРМ
  enableValidation() {
    this._receiveFormElement();
  }


  // МЕТОД ПРОВЕРКИ НАЛИЧИЯ АКТИВНЫХ ОШИБОК ПОЛЕЙ ВО ВРЕМЯ ЗАКРЫТИЯ ФОРМЫ
  _hasActiveSpanError(formElement) {

    if (formElement.querySelector(`.${this._spanErrorActive}`)) {

      this._arrayFormElement = Array.from(formElement);
      this._arrayFormElement.forEach((item) => {

        if (item.classList.contains(this._inputErrorClass)) {
          this._hideInputError(formElement, item)
        }
      })
    }
  }


  // ОБРАБОТЧИК СЛУШАТЕЛЯ SUBMIT
  _handlePreventDefault(evt) {
    evt.preventDefault();
  }


  // ОБРАБОТЧИК СЛУШАТЕЛЯ INPUT
  _handleInputListener(formElement, eachInputElement) {
    this._checkAtValid(formElement, eachInputElement); // ПРИ ЛЮБОМ ВВОДЕ/УДАЛЕНИИ СИМВОЛОВ - ОТПРАВЛЯЕМ НА ВАЛИДАЦИЮ ФОРМУ И ПОЛЕ
    this._toggleButtonDesign(this._inputsFormElements, this._buttonFormSubmitElement); // ОТПРАВЛЯЕМ НА ВАЛИДАЦИЮ СРАЗУ ВСЕ ПОЛЯ И КНОПКУ "ОТПРАВКИ ДАННЫХ"
  }


  // СТАВИМ СЛУШАТЕЛЕЙ НА ФОРМЫ И ПОЛЯ
  _setEventListeners(formElement) {

    // СЛУШАТЕЛЬ SUBMIT
    formElement.addEventListener('submit', (evt) => { // НА КАЖДУЮ ФОРМУ СТАВИМ 'SUBMIT'
      this._eventFormElement = evt;
      this._handlePreventDefault(this._eventFormElement);
    });

    // ПОЛУЧЕННУЮ ФОРМУ ОТПРАВЛЯЕМ НА СОЗДАНИЕ МАССИВА ПОЛЕЙ С ДАЛЬНЕЙШЕЙ ОТПРАВКОЙ НА ПЕРВИЧНУЮ ВАЛИДАЦИЮ
    this._createArrayInputsElements(formElement);

    // СЛУШАТЕЛЬ INPUT
    this._inputsFormElements.forEach((eachInputElement) => { // ПЕРЕСЧИТЫВАЕМ ВСЕ ПОЛЯ В ФОРМЕ
      eachInputElement.addEventListener('input', () => { // КАЖДОМУ ПОЛЮ ВЕШАЕМ 'INPUT'
        this._handleInputListener(formElement, eachInputElement);
      });
    });
  }


  // СОЗДАНИЕ МАССИВА ПОЛЕЙ ИЗ ПРИНЯТОЙ ФОРМЫ С ОТПРАВКОЙ НА ПЕРВИЧНУЮ ВАЛИДАЦИЮ
  _createArrayInputsElements(form) {
    this._inputsFormElements = Array.from(form.querySelectorAll(this._inputSelector)); // ДЕЛАЕМ МАССИВ ПОЛЕЙ ИЗ ОТДЕЛЬНОЙ ФОРМЫ
    this._buttonFormSubmitElement = form.querySelector(this._submitButtonSelector); // НАХОДИМ КНОПКУ "ОТПРАВКИ ДАННЫХ" В ОТДЕЛЬНОЙ ФОРМЕ
    this._toggleButtonDesign(this._inputsFormElements, this._buttonFormSubmitElement); // ОТПРАВЛЯЕМ СРАЗУ НА ПЕРВИЧНУЮ ВАЛИДАЦИЮ ВСЕ ПОЛЯ
  }


  // ПРОВЕРКА ВАЛИДНОСТИ ПОЛЯ, В КОТОРОМ ВВОДЯТСЯ ДАННЫЕ +
  // ОТПРАВКА КОМАНДЫ НА ВКЛЮЧЕНИЕ/ОТКЛЮЧЕНИЕ ОШИБКИ ВВОДА ДАННЫХ
  _checkAtValid(form, eachInputElement) {
    if (!eachInputElement.validity.valid) {
      this._showInputError(form, eachInputElement); // FALSE - ПОКАЗЫВАЕМ ОШИБКУ

    } else {

      this._hideInputError(form, eachInputElement); // TRUE - СКРЫВАЕМ ОШИБКУ

    }
  }


  // FALSE - ПОКАЗЫВАЕМ ОШИБКУ ВВОДА ДАННЫХ В ПОЛЕ
  _showInputError(form, eachInputElement) {

    this._spanInputError = form.querySelector(`.${eachInputElement.id}-error`);
    eachInputElement.classList.add(this._inputErrorClass);
    this._spanInputError.classList.add(this._spanErrorActive);
    this._spanInputError.textContent = eachInputElement.validationMessage;
  }


  // TRUE - ПРЯЧЕМ ОШИБКУ ВВОДА ДАННЫХ В ПОЛЕ
  _hideInputError(form, eachInputElement) {
    this._spanInputError = form.querySelector(`.${eachInputElement.id}-error`);
    eachInputElement.classList.remove(this._inputErrorClass);
    this._spanInputError.classList.remove(this._spanErrorActive);
    this._spanInputError.textContent = '';
  }


  // ИЗМЕНЕНИЕ ДИЗАЙНА КНОПКИ "ОТПРАВКИ ДАННЫХ"
  // (ЕСЛИ ХОТЯ БЫ ОДНО ПОЛЕ НЕВАЛИДНО - КНОПКА НЕАКТИВНА)
  // (ЕСЛИ ВСЁ ВАЛИДНО - КНОПКА АКТИВНА)
  _toggleButtonDesign(inputsFormElements, buttonFormSubmitElement) {

    this._checkInvalidInput = this._hasInvalidInput(inputsFormElements); // ОТПРАВИЛИ НА ПРОВЕРКУ ВАЛИДНОСТИ

    if (this._checkInvalidInput) { // ЕСЛИ ХОТЯ БЫ ОДНО ПОЛЕ НЕВАЛИДНО
      buttonFormSubmitElement.setAttribute('disabled', true); // ДЕАКТИВИРУЕМ КНОПКУ "ОТПРАВКИ ДАННЫХ"
      buttonFormSubmitElement.classList.add(this._inactiveButtonClass); // МЕНЯЕМ ДИЗАЙН КНОПКИ "ОТПРАВКИ ДАННЫХ"
    } else { // ЕСЛИ ВСЕ ПОЛЯ ВАЛИДНЫ
      buttonFormSubmitElement.removeAttribute('disabled'); // АКТИВИРУЕМ КНОПКУ "ОТПРАВКИ ДАННЫХ"
      buttonFormSubmitElement.classList.remove(this._inactiveButtonClass); // "МЕНЯЕМ ДИЗАЙН КНОПКИ "ОТПРАВКИ ДАННЫХ"
    }
  }


  // ПРОВЕРКА ВАЛИДНОСТИ СРАЗУ ВСЕХ ПОЛЕЙ ОТДЕЛЬНОЙ ФОРМЫ
  _hasInvalidInput(inputsFormElements) { // ПРИНИМАЕТ МАССИВ ПОЛЕЙ ФОРМЫ
    return inputsFormElements.some((eachInputElement) => { // ОСУЩЕСТВЛЯЕТ ПРОВЕРКУ ВАЛИДНОСТИ КАЖДОГО ПОЛЯ ИЗ МАССИВА ПОЛЕЙ
      return !eachInputElement.validity.valid; // ВОЗВРАЩАЕТ НЕВАЛИДНОСТЬ
    });
  }

}





