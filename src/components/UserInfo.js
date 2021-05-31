// КЛАСС ОТВЕЧАЮЩИЙ ЗА УПРАВЛЕНИЕ ОТОБРАЖЕНИЕМ ИНФОРМАЦИИ О ПОЛЬЗОВАТЕЛЕ НА СТРАНИЦЕ И В ФОРМЕ ПРОФАЙЛА
export default class UserInfo {

  constructor(selectorsProfileElements, nameInputProfile, statusInputProfile) {
    this._profileName = document.querySelector(`${selectorsProfileElements.name}`); // DOM-ЭЛЕМЕНТ ПОЛЯ NAME
    this._profileStatus = document.querySelector(`${selectorsProfileElements.status}`); // DOM-ЭЛЕМЕНТ ПОЛЯ STATUS
    this._profileAvatar = document.querySelector(`${selectorsProfileElements.avatar}`); // DOM-ЭЛЕМЕНТ АВАТАРА
  }

  // МЕТОД ПОЛУЧЕНИЯ ДАННЫХ ЭЛЕМЕНТОВ ПРОФАЙЛА
  getUserInfo() {
    return this._dataInfo = {
      name: this._profileName.textContent,
      status: this._profileStatus.textContent,
    };
  }

  // ПРИНИМАЕТ ДАННЫЕ ПРОФАЙЛА И УСТАНАВЛИВАЕТ АВАТАРКУ
  setNewAvatar(resultFromServer) {
    this._profileAvatar.src = resultFromServer.avatar; // ИЗМЕНЯЕМ АВАТАР
  }


  // ПРИНИМАЕТ ДАННЫЕ ПРОФАЙЛА И ДОБАВЛЯЕТ ИХ НА СТРАНИЦУ
  setUserInfo(resultFromServer) {

    this._profileName.textContent = resultFromServer.name;  // ИЗМЕНЯЕМ ЗНАЧЕНИЕ NAME НА СТРАНИЦЕ
    this._profileStatus.textContent = resultFromServer.about; // ИЗМЕНЯЕМ ЗНАЧЕНИЕ STATUS НА СТРАНИЦЕ
  }
}