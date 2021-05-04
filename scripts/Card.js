import openPopup from './open-popup.js';
import { popupZoomOpenCardImage, cardImageZoom, titleCardZoom } from './constants.js';


// КЛАСС СОЗДАЮЩИЙ КАРТОЧКУ С ТЕКСТОМ И ССЫЛКОЙ НА ИЗОБРАЖЕНИЕ
export default class Card {

  constructor(template, cardData) { // ПРИНИМАЕТ ДАННЫЕ ИЗ index.js
    this._template = template; // СЕЛЕКТОР ШАБЛОНА
    this._name = cardData.name; // НАЗВАНИЕ КАРТИНКИ
    this._link = cardData.link; // ССЫЛКА НА КАРТИНКУ
  }


  // МЕТОД ГЕНЕРАЦИИ ШАБЛОНА
  _createTemplateCard() {
    this._cardTemplate = this._template.content.querySelector(".element").cloneNode(true); // ИЩЕМ ШАБЛОН В РАЗМЕТКЕ И КЛОНИРУЕМ С СОДЕРЖИМЫМ
    return this._cardTemplate; // ВОЗВРАЩАЕМ СКЛОНИРОВАННЫЙ ШАБЛОН КАРТОЧКИ
  }


  // МЕТОД ГЕНЕРАЦИИ ЗАПОЛНЕННОЙ КАРТОЧКИ
  generateCard() {
    this._element = this._createTemplateCard();
    this._cardImage = this._element.querySelector('.element__image');
    this._cardTitle = this._element.querySelector('.element__title');
    this._cardButtonLike = this._element.querySelector('.element__button-like');

    this._cardImage.src = this._link;
    this._cardImage.alt = this._name;
    this._cardTitle.textContent = this._name;

    this._setEventListeners();
    return this._element;
  }


  // ОБРАБОТЧИК УДАЛЕНИЯ КАРТОЧКИ
  _handleDeleteCards() {
    this._cardTemplate.remove(); // УДАЛЕНИЕ РАЗМЕТКИ КАРТОЧКИ
  }

  // ОБРАБОТЧИК ЛАЙКА
  _handleLike() {
    this._cardButtonLike.classList.toggle("element__button-like_active");
  }

  // ОБРАБОТЧИК МАСШТАБИРОВАНИЯ КАРТИНКИ
  _handleZoomCardImage() {

    cardImageZoom.src = this._link; // ИЗ КОНСТРУКТОРА
    cardImageZoom.alt = this._name; // ИЗ КОНСТРУКТОРА
    titleCardZoom.textContent = this._name; // ИЗ generateCard() - шаблон с наполненной картинкой

    openPopup(popupZoomOpenCardImage);
  }


  // МЕТОД УСТАНОВКИ СЛУШАТЕЛЕЙ
  _setEventListeners() {

    // КЛИК НА КНОПКУ УДАЛЕНИЯ КАРТОЧКИ
    this._element.querySelector('.element__button-delete').addEventListener("click", () => {
      this._handleDeleteCards();
    });

    // КЛИК НА КНОПКУ ЛАЙКА
    this._cardButtonLike.addEventListener("click", () => {
      this._handleLike();
    });

    // КЛИК НА ИЗОБРАЖЕНИЕ
    this._cardImage.addEventListener("click", () => {
      this._handleZoomCardImage();
    });
  }

}
