

// класс, который создаёт карточку с ТЕКСТОМ и ССЫЛКОЙ на изображение
class Card {


  constructor(templateSelector, cardData) { // принимает данный из index.js

    this._templateSelector = templateSelector; // селектор шаблона
    this._name = cardData.name; // название картинки
    this._link = cardData.link; // ссылка на картинку
  }


  // МЕТОД ГЕНЕРАЦИИ ШАБЛОНА
  _createTemplateCard() {
    this._cardTemplate = this._templateSelector.content.querySelector(".element").cloneNode(true); // ищем шаблон в разметке и клонируем с содержимым
    return this._cardTemplate; // возвращаем склонированный шаблон карточки
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

    // клик на кнопку удаления карточки
    this._element.querySelector('.element__button-delete').addEventListener("click", () => {
      this._handleDeleteCards();
    });

    // клик на кнопку лайка
    this._element.querySelector('.element__button-like').addEventListener("click", () => {
      this._handleLike();
    });

    // клик на изображение
    this._element.querySelector(".element__image").addEventListener("click", (event) => {
      this._handleZoomImage(event);
    })
  }



}



//console.log(cardData)
//const aaa = new Card(document.querySelector(".template-element"),'https://avatars.mds.yandex.net/get-zen_doc/1577695/pub_5cd8279f7a7fdb034966ffff_5cd827bd849658051f7690c9/scale_1200', 'dscdscds')
//console.log(aaa)
//console.log(addNewCardButton)


//console.log(templateElement)
//console.log(Card.selector.templateSelectorCard)