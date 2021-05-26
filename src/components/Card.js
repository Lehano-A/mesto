// КЛАСС СОЗДАЮЩИЙ КАРТОЧКУ С ТЕКСТОМ И ССЫЛКОЙ НА ИЗОБРАЖЕНИЕ
export default class Card {

  constructor(template, cardData, dataApi, { handleCardClick }, { deleteCardFromServer }) {
    this._template = template; // СЕЛЕКТОР ШАБЛОНА
    this._title = cardData.name; // НАЗВАНИЕ КАРТИНКИ
    this._link = cardData.link; // ССЫЛКА НА КАРТИНКУ
    this._idCard = cardData._id; // ID КАРТОЧЕК ПОЛУЧЕННЫХ С СЕРВЕРА
    this._owner = cardData.owner._id; // ID СОЗДАТЕЛЯ КАРТОЧКИ
    this._cardBaseUrl = dataApi.cards.baseUrl;
    this._authorizationToken = dataApi.authorizationToken;
    this._handleCardClick = handleCardClick; // ОБРАБОТЧИК КЛИКА НА КАРТИНКУ КАРТОЧКИ
    this._deleteCardFromServer = deleteCardFromServer;
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
    this._cardButtonDelete = this._element.querySelector('.element__button-delete');

    if (this._owner === '71c6bcf75b7f5095f6b3ea1f') { // ПРОВЕРКА НА ВЛАДЕЛЬЦА КАРТОЧКИ
      this._cardButtonDelete.style.display = 'flex'
    } else {
      this._cardButtonDelete.style.display = 'none'
    }

    this._cardImage.src = this._link; // ПРИНЯТАЯ КАРТИНКА
    this._cardImage.alt = this._title; // ПРИНЯТОЕ НАЗВАНИЕ КАРТИНКИ
    this._cardTitle.textContent = this._title; // ПРИНЯТОЕ НАЗВАНИЕ КАРТИНКИ
    this._setEventListeners(); // УСТАНОВКА СЛУШАТЕЛЕЙ
    return this._element;
  }



  // ОБРАБОТЧИК УДАЛЕНИЯ КАРТОЧКИ
  _handleDeleteCards() {
    this._deleteCardFromServer(this._cardTemplate, this._idCard) // УДАЛЕНИЕ РАЗМЕТКИ КАРТОЧКИ */
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
