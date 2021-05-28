

// КЛАСС СОЗДАЮЩИЙ КАРТОЧКУ С ТЕКСТОМ И ССЫЛКОЙ НА ИЗОБРАЖЕНИЕ
export default class Card {

  constructor(template, cardData, dataApi, { handleCardClick }, { deleteCardFromServer }, { changeNumberLike }) {
    this._template = template; // СЕЛЕКТОР ШАБЛОНА
    this._totalLikes = cardData.likes; // МАССИВ С ЛАЙКАМИ КАРТОЧКИ
    this._title = cardData.name; // НАЗВАНИЕ КАРТИНКИ
    this._link = cardData.link; // ССЫЛКА НА КАРТИНКУ
    this._idCard = cardData._id; // ID КАРТОЧЕК ПОЛУЧЕННЫХ С СЕРВЕРА
    this._owner = cardData.owner._id; // ID СОЗДАТЕЛЯ КАРТОЧКИ
    this._cardBaseUrl = dataApi.cards.baseUrl; // URL РАСПОЛОЖЕНИЯ КАРТОЧЕК НА СЕРВЕРЕ
    this._authorizationToken = dataApi.authorizationToken; // МОЙ АВТОРИЗАЦИОННЫЙ ТОКЕН
    this._handleCardClick = handleCardClick; // ОБРАБОТЧИК КЛИКА НА КАРТИНКУ КАРТОЧКИ
    this._deleteCardFromServer = deleteCardFromServer; // КОЛБЭК УДАЛЕНИЯ КАРТОЧКИ С СЕРВЕРА
    this._changeNumberLike = changeNumberLike; // КОЛБЭК ИЗМЕНЕНИЯ ЧИСЛА ЛАЙКОВ НА СЕРВЕРЕ
    this._myIdProfile = dataApi.myIdProfile; // МОЙ ID ПРОФАЙЛА НА СЕРВЕРЕ
  }


  // МЕТОД ГЕНЕРАЦИИ ШАБЛОНА
  _createTemplateCard() {
    this._cardTemplate = this._template.content.querySelector(".element").cloneNode(true); // ИЩЕМ ШАБЛОН В РАЗМЕТКЕ И КЛОНИРУЕМ С СОДЕРЖИМЫМ
    return this._cardTemplate; // ВОЗВРАЩАЕМ СКЛОНИРОВАННЫЙ ШАБЛОН КАРТОЧКИ
  }


  // ЕСТЬ ЛИ НА КАРТОЧКЕ МОЙ ЛАЙК?
  _isMyLike() {
    this._totalLikes.forEach((item) => {
      if (item._id === this._myIdProfile) {
        this._handleLike();
      }
    })
  }


  // ЯВЛЯЮСЬ ЛИ Я ВЛАДЕЛЬЦЕМ КАРТОЧКИ?
  _amIOwner() {
    if (this._owner === this._myIdProfile) {
      this._cardButtonDelete.style.display = 'flex'
    } else {
      this._cardButtonDelete.style.display = 'none'
    }
  }


  // МЕТОД ГЕНЕРАЦИИ ЗАПОЛНЕННОЙ КАРТОЧКИ
  generateCard() {

    this._element = this._createTemplateCard(); // СКЛОНИРОВАННЫЙ ШАБЛОН КАРТОЧКИ
    this._cardImage = this._element.querySelector('.element__image'); // МЕCТО ДЛЯ КАРТИНКИ
    this._cardTitle = this._element.querySelector('.element__title'); // МЕСТО ДЛЯ НАЗВАНИЯ КАРТИНКИ
    this._cardButtonLike = this._element.querySelector('.element__button-like'); // КНОПКА ЛАЙКА
    this._cardButtonDelete = this._element.querySelector('.element__button-delete');
    this._numberLikes = this._element.querySelector('.element__total-likes');

    this._isMyLike(); // ЕСТЬ ЛИ НА КАРТОЧКЕ МОЙ ЛАЙК?
    this._amIOwner(); // ЯВЛЯЮСЬ ЛИ Я ВЛАДЕЛЬЦЕМ КАРТОЧКИ?

    this._cardImage.src = this._link; // ПРИНЯТАЯ КАРТИНКА
    this._cardImage.alt = this._title; // ПРИНЯТОЕ НАЗВАНИЕ КАРТИНКИ
    this._cardTitle.textContent = this._title; // ПРИНЯТОЕ НАЗВАНИЕ КАРТИНКИ
    this._numberLikes.textContent = this._totalLikes.length;
    this._setEventListeners(); // УСТАНОВКА СЛУШАТЕЛЕЙ
    return this._element;
  }



  // ОБРАБОТЧИК УДАЛЕНИЯ КАРТОЧКИ
  handleDeleteCards() {

    this._deleteCardFromServer(this._cardTemplate, this._idCard) // КОЛБЭК, УДАЛЕНИЕ РАЗМЕТКИ КАРТОЧКИ
  }

  // ОБРАБОТЧИК ЛАЙКА
  _handleLike() {
    this._cardButtonLike.classList.toggle("element__button-like_active");
  }


  // МЕТОД УСТАНОВКИ СЛУШАТЕЛЕЙ
  _setEventListeners() {

    // КЛИК НА КНОПКУ УДАЛЕНИЯ КАРТОЧКИ
    this._element.querySelector('.element__button-delete').addEventListener("click", () => {
      this.handleDeleteCards();
    });


    // КЛИК НА КНОПКУ ЛАЙКА
    this._cardButtonLike.addEventListener("click", () => {
      this._handleLike()
      this._changeNumberLike(this._cardButtonLike, this._idCard, this._numberLikes); // КОЛБЭК, ИЗМЕНЕНИЕ ЧИСЛА ЛАЙКОВ
    });


    // КЛИК НА ИЗОБРАЖЕНИЕ
    this._cardImage.addEventListener("click", () => {

      this._handleCardClick(this._title, this._link) // КОЛБЭК

    });
  }

}
