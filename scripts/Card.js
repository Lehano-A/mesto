// КЛАСС СОЗДАЮЩИЙ КАРТОЧКУ С ТЕКСТОМ И ССЫЛКОЙ НА ИЗОБРАЖЕНИЕ
export default class Card {

  constructor(templateSelector, cardData) { // ПРИНИМАЕТ ДАННЫЕ ИЗ index.js

    this._templateSelector = templateSelector; // СЕЛЕКТОР ШАБЛОНА
    this._name = cardData.name; // НАЗВАНИЕ КАРТИНКИ
    this._link = cardData.link; // ССЫЛКА НА КАРТИНКУ
  }


  // МЕТОД ГЕНЕРАЦИИ ШАБЛОНА
  _createTemplateCard() {
    this._cardTemplate = this._templateSelector.content.querySelector(".element").cloneNode(true); // ИЩЕМ ШАБЛОН В РАЗМЕТКЕ И КЛОНИРУЕМ С СОДЕРЖИМЫМ
    return this._cardTemplate; // ВОЗВРАЩАЕМ СКЛОНИРОВАННЫЙ ШАБЛОН КАРТОЧКИ
  }


  // МЕТОД ГЕНЕРАЦИИ ЗАПОЛНЕННОЙ КАРТОЧКИ
  generateCard() {
    this._element = this._createTemplateCard();
    this._element.querySelector(".element__image").src = this._link;
    this._element.querySelector(".element__image").alt = this._link;
    this._element.querySelector('.element__title').textContent = this._name;
    this._setEventListeners();
    return this._element;
  }



  // ОБРАБОТЧИК УДАЛЕНИЯ КАРТОЧКИ
  _handleDeleteCards() {
    this._cardTemplate.remove();
  }

  // ОБРАБОТЧИК ЛАЙКА
  _handleLike() {
    this._element.querySelector('.element__button-like').classList.toggle("element__button-like_active");
  }

  // ОБРАБОТЧИК МАСШТАБИРОВАНИЯ КАРТИНКИ
  _handleZoomImage(event) {
    const target = event.target;
    srcZoomOpenCardImage.src = target.src;
    altZoomOpenCardImage.alt = target.alt;
    titleZoomOpenCardImage.textContent = this._element.querySelector('.element__title').textContent;

    openPopup(popupZoomOpenCardImage);
  }


  // МЕТОД УСТАНОВКИ СЛУШАТЕЛЕЙ

  _setEventListeners() {

    // КЛИК НА КНОПКУ УДАЛЕНИЯ КАРТОЧКИ
    this._element.querySelector('.element__button-delete').addEventListener("click", () => {
      this._handleDeleteCards();
    });

    // КЛИК НА КНОПКУ ЛАЙКА
    this._element.querySelector('.element__button-like').addEventListener("click", () => {
      this._handleLike();
    });

    // КЛИК НА ИЗОБРАЖЕНИЕ
    this._element.querySelector(".element__image").addEventListener("click", (event) => {
      this._handleZoomImage(event);
    })
  }

}
