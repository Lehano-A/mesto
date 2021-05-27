// КЛАСС ДЛЯ ВЗАИМОДЕЙСТВИЕМ С СЕРВЕРОМ
export default class Api {

  constructor(dataApi) {
    this._profileBaseUrl = dataApi.profile.baseUrl; // URL ДАННЫХ ПРОФАЙЛА
    this._cardsBaseUrl = dataApi.cards.baseUrl; // URL МАССИВА ОБЪЕКТОВ КАРТОЧЕК
    this._likesBaseUrl = dataApi.likes.baseUrl; // URL МАССИВА ОБЪЕКТОВ ЛАЙКОВ КАРТОЧКИ
    this._authorization = dataApi.authorizationToken; // ТОКЕН ДЛЯ АВТОРИЗАЦИИ
  }


  // ПОЛУЧЕНИЕ ДАННЫХ ПРОФАЙЛА С СЕРВЕРА
  getUserInfo() {
    return fetch(this._profileBaseUrl, {
      headers: {
        authorization: this._authorization
      }
    })
      .then(res => res.json())
      .catch(err => Promise.reject(console.log(`Ошибка при получении данных профайла с сервера: ${err}, ${err.statusText}`)))
  }


  // ПОЛУЧЕНИЕ МАССИВА ПЕРВОНАЧАЛЬНЫХ ДАННЫХ КАРТОЧЕК С СЕРВЕРА
  getDataInitialCards() {
    return fetch(this._cardsBaseUrl, {
      headers: {
        authorization: this._authorization
      }
    })
      .then(res => res.json())
      .catch(err => Promise.reject(console.log(`Ошибка при получении массива карточек с сервера: ${err.status}, ${err.statusText}`)))
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

        if (result.ok) { return result.json() }
        else {
          return Promise.reject(`Ошибка во время передачи данных профайла на сервер: ${result.status}, ${result.statusText}`)
        }
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
      .then(result => {
        if (result.ok) { return result.json() }
        else {
          return Promise.reject(`Ошибка при передачи данных новой карточки на сервер: ${result.status}, ${result.statusText}`)
        }
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
        if (result.ok) { return result.json() }
        else {
          return Promise.reject(`Ошибка при передачи на сервер ID карточки для её удаления: ${result.status}, ${result.statusText}`)
        }
      })

  }



  // ЗАПРОС НА УВЕЛИЧЕНИЕ ЧИСЛА ЛАЙКОВ У КАРТОЧКИ
  changeNumberLikes(idCard) {

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
        if (result.ok) { return result.json() }
        else {
          return Promise.reject(`Ошибка при передачи запроса на увеличение числа лайков: ${result.status}, ${result.statusText}`)
        }
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
        if (result.ok) { return result.json() }
        else {
          return Promise.reject(`Ошибка при передачи запроса на удаление лайка: ${result.status}, ${result.statusText}`)
        }
      })
  }





}