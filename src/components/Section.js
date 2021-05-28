// КЛАСС ОТВЕЧАЮЩИЙ ЗА ДОБАВЛЕНИЕ КАРТОЧКИ НА СТРАНИЦУ
export default class Section {

  constructor({ renderer }, containerSelector) {
    this._renderer = renderer; // КОЛБЭК
    this._containerSelector = document.querySelector(containerSelector); // СЕЛЕКТОР РАЗМЕТКИ, КУДА НУЖНО ВСТАВЛЯТЬ КАРТОЧКИ
  }


  // ОТВЕЧАЕТ ЗА ОТРИСОВКУ ВСЕХ ЭЛЕМЕНТОВ
  renderer(arrCards) {
    arrCards.forEach((item) => { // ДЕЛАЕМ ПЕРЕСЧЁТ МАССИВА ОБЪЕКТОВ
      this._renderer(item) // ОТПРАВЛЯЕМ КАЖДЫЙ ЭЛЕМЕНТ МАССИВА НАРУЖУ В КОЛБЭК
    });
  }


  // ПРИНИМАЕТ DOM-ЭЛЕМЕНТ И ВСТАВЛЯЕТ ЕГО В КОНТЕЙНЕР
  addItem(element, where) { // WHERE - APPEND ИЛИ PREPEND

    where === 'append' ? // ЕСЛИ APPEND
      this._containerSelector.append(element) // ТО, СЮДА
      : this._containerSelector.prepend(element) // ИНАЧЕ, СЮДА
  }
}

