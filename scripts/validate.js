
// ОБЪЕКТ НЕОБХОДИМЫХ ДАННЫХ ДЛЯ ВАЛИДАЦИИ
const enableValidationConfig = ({
  formSelector: ".popup__form", // ФОРМА
  inputSelector: ".popup__input", // ПОЛЕ
  submitButtonSelector: ".popup__button-save", // КНОПКА "ОТПРАВКИ ДАННЫХ"
  inactiveButtonClass: "popup__button-save_disabled", // КНОПКА "ОТПРАВКА ДАННЫХ" НЕАКТИВНА
  inputErrorClass: "popup__input_error_visible", // СТИЛЬ ПОЛЯ ВО ВРЕМЯ НЕВАЛИДНОСТИ
  errorClass: "popup__input_visible", // СПАН С ОШИБКОЙ В ПОЛЕ АКТИВЕН
  spanErrorActive: "popup__input-error_active" // СПАН С ОШИБКОЙ АКТИВЕН
});


// ФУНКЦИЯ - ПОИСКА ВСЕХ ФОРМ И ИХ ПЕРЕСЧЁТА =>
function enableValidation(formSelector, inputSelector) {

  const allFormsElements = Array.from(document.querySelectorAll(enableValidationConfig.formSelector)); // ДЕЛАЕМ МАССИВ ФОРМ
  allFormsElements.forEach((eachFormElement) => { // ПЕРЕСЧЁТ ВСЕХ ФОРМ
    setEventListeners(eachFormElement, inputSelector); // ДАЛЕЕ, ОТПРАВЛЯЕМ В ФУНКЦИЮ УСТАНОВКИ СЛУШАТЕЛЕЙ
  });
}

// ЗАПУСК ВАЛИДАЦИИ
enableValidation(enableValidationConfig.formSelector, enableValidationConfig.inputSelector); // ОТПРАВЛЯЕМ КЛАСС ФОРМЫ И ПОЛЯ ФОРМЫ


// СТАВИМ СЛУШАТЕЛЕЙ НА ФОРМЫ И ПОЛЯ
function setEventListeners(eachFormElement, inputSelector) {

  eachFormElement.addEventListener('submit', (evt) => { // НА КАЖДУЮ ФОРМУ СТАВИМ 'SUBMIT'
    evt.preventDefault();
  });

  const inputsFormElements = Array.from(eachFormElement.querySelectorAll(inputSelector)); // ДЕЛАЕМ МАССИВ ПОЛЕЙ ИЗ ОТДЕЛЬНОЙ ФОРМЫ
  const buttonFormSubmitElement = eachFormElement.querySelector(enableValidationConfig.submitButtonSelector); // НАХОДИМ КНОПКУ "ОТПРАВКИ ДАННЫХ" В ОТДЕЛЬНОЙ ФОРМЕ
  toggleButtonDesign(inputsFormElements, buttonFormSubmitElement); // ОТПРАВЛЯЕМ СРАЗУ НА ВАЛИДАЦИЮ СРАЗУ ВСЕХ ПОЛЕЙ

  inputsFormElements.forEach((eachInputElement) => { // ПЕРЕСЧИТЫВАЕМ ВСЕ ПОЛЯ В ФОРМЕ
    eachInputElement.addEventListener('input', () => { // КАЖДОМУ ПОЛЮ ВЕШАЕМ 'INPUT'
      checkAtValid(eachFormElement, eachInputElement); // ПРИ ЛЮБОМ ВВОДЕ/УДАЛЕНИИ СИМВОЛОВ - ОТПРАВЛЯЕМ НА ВАЛИДАЦИЮ ФОРМУ И ПОЛЕ
      toggleButtonDesign(inputsFormElements, buttonFormSubmitElement); // ОТПРАВЛЯЕМ НА ВАЛИДАЦИЮ СРАЗУ ВСЕХ ПОЛЕЙ И КНОПКУ "ОТПРАВКИ ДАННЫХ"
    });
  });
}


// ПРОВЕРКА ВАЛИДНОСТИ ПОЛЯ, В КОТОРОМ ВВОДЯТСЯ ДАННЫЕ +
// ОТПРАВКА КОМАНДЫ НА ВКЛЮЧЕНИЕ/ОТКЛЮЧЕНИЕ ОШИБКИ ВВОДА ДАННЫХ
 function checkAtValid(eachFormElement, eachInputElement) {

   if (!eachInputElement.validity.valid) {
    showInputError(eachFormElement, eachInputElement); // FALSE - ПОКАЗЫВАЕМ ОШИБКУ

   } else {
    hideInputError(eachFormElement, eachInputElement); // TRUE - СКРЫВАЕМ ОШИБКУ
   }
 }


// FALSE - ПОКАЗЫВАЕМ ОШИБКУ ВВОДА ДАННЫХ В ПОЛЕ
function showInputError(eachFormElement, eachInputElement) {

  const spanInputError = eachFormElement.querySelector(`.${eachInputElement.id}-error`);
  eachInputElement.classList.add(enableValidationConfig.inputErrorClass);
  spanInputError.classList.add(enableValidationConfig.spanErrorActive);
  spanInputError.textContent = eachInputElement.validationMessage;
}


// TRUE - ПРЯЧЕМ ОШИБКУ ВВОДА ДАННЫХ В ПОЛЕ
function hideInputError(eachFormElement, eachInputElement) {

  const spanInputError = eachFormElement.querySelector(`.${eachInputElement.id}-error`);
  eachInputElement.classList.remove(enableValidationConfig.inputErrorClass);
  spanInputError.classList.remove(enableValidationConfig.spanErrorActive);
  spanInputError.textContent = '';
}


// ИЗМЕНЕНИЕ ДИЗАЙНА КНОПКИ "ОТПРАВКИ ДАННЫХ"
// (ЕСЛИ ХОТЯ БЫ ОДНО ПОЛЕ НЕВАЛИДНО - КНОПКА НЕАКТИВНА)
// (ЕСЛИ ВСЁ ВАЛИДНО - КНОПКА АКТИВНА)
function toggleButtonDesign(inputsFormElements, buttonFormSubmitElement) {

  const aaa = hasInvalidInput(inputsFormElements);

  if (aaa) { // ЕСЛИ ХОТЯ БЫ ОДНО ПОЛЕ НЕВАЛИДНО
    buttonFormSubmitElement.setAttribute('disabled', true); // ДЕАКТИВИРУЕМ КНОПКУ "ОТПРАВКИ ДАННЫХ"
    buttonFormSubmitElement.classList.add(enableValidationConfig.inactiveButtonClass); // МЕНЯЕМ ДИЗАЙН КНОПКИ "ОТПРАВКИ ДАННЫХ"
  } else { // ЕСЛИ ВСЕ ПОЛЯ ВАЛИДНЫ
    buttonFormSubmitElement.removeAttribute('disabled'); // АКТИВИРУЕМ КНОПКУ "ОТПРАВКИ ДАННЫХ"
    buttonFormSubmitElement.classList.remove(enableValidationConfig.inactiveButtonClass); // "МЕНЯЕМ ДИЗАЙН КНОПКИ "ОТПРАВКИ ДАННЫХ"
  }
}

// ПРОВЕРКА ВАЛИДНОСТИ СРАЗУ ВСЕХ ПОЛЕЙ ОТДЕЛЬНОЙ ФОРМЫ
function hasInvalidInput(inputsFormElements) {

  return inputsFormElements.some((eachInputElement) => { // ВОЗВРАЩАЕТ ПРОВЕРКУ ВАЛИДНОСТИ КАЖДОГО ПОЛЯ ИЗ МАССИВА ПОЛЕЙ
  return !eachInputElement.validity.valid; // ВОЗВРАЩАЕТ НЕВАЛИДНОСТЬ
});
}
