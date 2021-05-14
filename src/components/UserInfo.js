// КЛАСС ОТВЕЧАЮЩИЙ ЗА УПРАВЛЕНИЕ ОТОБРАЖЕНИЕМ ИНФОРМАЦИИ О ПОЛЬЗОВАТЕЛЕ НА СТРАНИЦЕ И В ФОРМЕ ПРОФАЙЛА
export default class UserInfo {

  constructor(selectorsProfileElements) {
    this._profileName = document.querySelector(`${selectorsProfileElements.name}`) // DOM-ЭЛЕМЕНТ ПОЛЯ NAME
    this._profileStatus = document.querySelector(`${selectorsProfileElements.status}`) // DOM-ЭЛЕМЕНТ ПОЛЯ STATUS
  }


  // ВОЗВРАЩАЕТ ОБЪЕКТ С ДАННЫМИ ПОЛЬЗОВАТЕЛЯ
  getUserInfo() {

    this._dataProfileElements = {
      name: this._profileName.textContent, // ЗАПИСАЛИ КАКОЙ СЕЙЧАС NAME
      status: this._profileStatus.textContent // ЗАПИСАЛИ КАКОЙ СЕЙЧАС STATUS
    }
    return this._dataProfileElements;
  }


  // ПРИНИМАЕТ НОВЫЕ ДАННЫЕ ПОЛЬЗОВАТЕЛЯ И ДОБАВЛЯЕТ ИХ НА СТРАНИЦУ
  setUserInfo(dataInputsProfileForm) {

    this._profileName.textContent = dataInputsProfileForm.name; // ИЗМЕНЯЕМ ЗНАЧЕНИЕ NAME НА СТРАНИЦЕ
    this._profileStatus.textContent = dataInputsProfileForm.status; // ИЗМЕНЯЕМ ЗНАЧЕНИЕ STATUS НА СТРАНИЦЕ
  }
}

