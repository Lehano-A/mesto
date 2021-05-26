// КЛАСС ДЛЯ ВЗАИМОДЕЙСТВИЕМ С СЕРВЕРОМ
export default class Api {
  constructor(data) {
    this._profileBaseUrl = data.profile.baseUrl; // URL ДАННЫХ ПРОФАЙЛА
    this._cardsBaseUrl = data.cards.baseUrl; // URL МАССИВА ОБЪЕКТОВ КАРТОЧЕК
    this._authorization = data.authorizationToken; // ТОКЕН ДЛЯ АВТОРИЗАЦИИ
  }

  // ПОЛУЧЕНИЕ ДАННЫХ ПРОФАЙЛА С СЕРВЕРА
  getUserInfo() {
    return fetch(this._profileBaseUrl, {
      headers: {
        authorization: this._authorization
      }
    })
      .then(res => res.json())
      .catch(err => Promise.reject(console.log(`Ошибка при получении данных профайла с сервера: ${err}`)))
  }


  // ПОЛУЧЕНИЕ ДАННЫХ МАССИВА КАРТОЧЕК
  getDataInitialCards() {
    return fetch(this._cardsBaseUrl, {
      headers: {
        authorization: this._authorization
      }
    })
      .then(res => res.json())
      .catch(err => Promise.reject(console.log(`Ошибка при получении массива карточек с сервера: ${err}`)))
  }

  // ИЗМЕНЕНИЕ ДАННЫХ ПРОФАЙЛА
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
          return Promise.reject(`Ошибка во время изменения данных профайла: ${result.status}`)
        }
      })

  }


}