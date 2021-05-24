// КЛАСС СОЗДАЮЩИЙ КАРТОЧКУ С ТЕКСТОМ И ССЫЛКОЙ НА ИЗОБРАЖЕНИЕ
export default class Card {

  constructor(template, cardData, { handleCardClick }) {
    this._template = template; // СЕЛЕКТОР ШАБЛОНА
    this._title = cardData.title; // НАЗВАНИЕ КАРТИНКИ
    this._link = cardData.link; // ССЫЛКА НА КАРТИНКУ
    this._handleCardClick = handleCardClick; // ОБРАБОТЧИК КЛИКА НА КАРТИНКУ КАРТОЧКИ
  }


  // МЕТОД ГЕНЕРАЦИИ ШАБЛОНА
  _createTemplateCard() {
    this._cardTemplate = this._template.content.querySelector(".element").cloneNode(true); // ИЩЕМ ШАБЛОН В РАЗМЕТКЕ И КЛОНИРУЕМ С СОДЕРЖИМЫМ
    return this._cardTemplate; // ВОЗВРАЩАЕМ СКЛОНИРОВАННЫЙ ШАБЛОН КАРТОЧКИ
  }



  // МЕТОД ГЕНЕРАЦИИ ЗАПОЛНЕННОЙ КАРТОЧКИ
  generateCard() {
    this._element = this._createTemplateCard(); // СКЛОНИРОВАННЫЙ ШАБЛОН КАРТОЧКИ
    this._cardImage = this._element.querySelector('.element__image'); // МЕCТО ДЛЯ КАРТИНКИ
    this._cardTitle = this._element.querySelector('.element__title'); // МЕСТО ДЛЯ НАЗВАНИЯ КАРТИНКИ
    this._cardButtonLike = this._element.querySelector('.element__button-like'); // КНОПКА ЛАЙКА

    this._cardImage.src = this._link; // ПРИНЯТАЯ КАРТИНКА
    this._cardImage.alt = this._title; // ПРИНЯТОЕ НАЗВАНИЕ КАРТИНКИ
    this._cardTitle.textContent = this._title; // ПРИНЯТОЕ НАЗВАНИЕ КАРТИНКИ

    this._setEventListeners(); // УСТАНОВКА СЛУШАТЕЛЕЙ
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

      this._handleCardClick(this._title, this._link)

    });
  }

}
