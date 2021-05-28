// КЛАСС ДЛЯ ВЗАИМОДЕЙСТВИЯ С СЕРВЕРОМ
export default class Api {

  constructor(dataApi) {
    this._profileBaseUrl = dataApi.profile.baseUrl; // URL ДАННЫХ ПРОФАЙЛА
    this._cardsBaseUrl = dataApi.cards.baseUrl; // URL МАССИВА ОБЪЕКТОВ КАРТОЧЕК
    this._likesBaseUrl = dataApi.likes.baseUrl; // URL МАССИВА ОБЪЕКТОВ ЛАЙКОВ КАРТОЧКИ
    this._avatarBaseUrl = dataApi.avatarProfile.baseUrl; // URL АВАТАРА ПРОФАЙЛА
    this._authorization = dataApi.authorizationToken; // ТОКЕН ДЛЯ АВТОРИЗАЦИИ
  }


  // ПОЛУЧЕНИЕ ДАННЫХ ПРОФАЙЛА С СЕРВЕРА
  getUserInfo() {
    return fetch(this._profileBaseUrl, {
      headers: {
        authorization: this._authorization
      }
    })
      .then((result) => { return this._getResponse(result); })
  }


  // ПОЛУЧЕНИЕ МАССИВА ПЕРВОНАЧАЛЬНЫХ ДАННЫХ КАРТОЧЕК С СЕРВЕРА
  getDataInitialCards() {
    return fetch(this._cardsBaseUrl, {
      headers: {
        authorization: this._authorization
      }
    })
      .then((result) => { return this._getResponse(result); })
  }


  // ПЕРЕДАЧА ИЗМЕНЁННЫХ ДАННЫХ ПРОФАЙЛА НА СЕРВЕР
  formEditDataProfile(data) {

    return fetch(this._profileBaseUrl, {
      method: 'PATCH',
      headers: {
        authorization: this._authorization,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: data.name,
        about: data.status
      })
    })
      .then((result) => {
        return this._getResponse(result);
      })
  }


  // ПЕРЕДАЧА ДАННЫХ НОВОЙ КАРТОЧКИ НА СЕРВЕР
  sendDataNewCardAtServer(inputsValues) {

    return fetch(this._cardsBaseUrl, {
      method: 'POST',
      headers: {
        authorization: this._authorization,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: inputsValues.name,
        link: inputsValues.link
      })
    })
      .then((result) => {
        return this._getResponse(result);
      })
  }


  // ЗАПРОС НА УДАЛЕНИЕ КАРТОЧКИ С СЕРВЕРА
  deleteCardFromServer(idCard) {

    return fetch(`${this._cardsBaseUrl}/${idCard}`, {
      method: 'DELETE',
      headers: {
        authorization: this._authorization,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        _id: idCard
      })
    })
      .then((result) => {
        return this._getResponse(result);
      })
  }



  // ЗАПРОС НА УВЕЛИЧЕНИЕ ЧИСЛА ЛАЙКОВ У КАРТОЧКИ
  plusNumberLikes(idCard) {

    return fetch(`${this._likesBaseUrl}/${idCard}`, {
      method: 'PUT',
      headers: {
        authorization: this._authorization,
        'Content-Type': "application/json"
      },
      body: JSON.stringify({
        likes: +1
      })
    })
      .then((result) => {
        return this._getResponse(result);
      })
  }



  // ЗАПРОС НА УМЕНЬШЕНИЕ ЧИСЛА ЛАЙКОВ У КАРТОЧКИ
  deleteLikes(idCard) {

    return fetch(`${this._likesBaseUrl}/${idCard}`, {
      method: 'DELETE',
      headers: {
        authorization: this._authorization,
        'Content-Type': "application/json"
      },
      body: JSON.stringify({
        likes: -1
      })
    })
      .then((result) => {
        return this._getResponse(result);
      })
  }


  // ЗАПРОС НА ИЗМЕНЕНИЕ АВАТАРА
  changeAvatarProfile(url) {

    return fetch(this._avatarBaseUrl, {
      method: 'PATCH',
      headers: {
        authorization: this._authorization,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        avatar: url.link,
      })
    })
      .then((result) => {
        return this._getResponse(result);
      })
  }


  // МЕТОД ПОЛУЧЕНИЯ ОТВЕТА ОТ СЕРВЕРА
  _getResponse(result) {

    if (!result.ok) {
      return Promise.reject(`Ошибка: ${result.status}`);
    } else {
      return result.json();
    }
  }



}