
// КЛАСС ОТВЕЧАЮЩИЙ ЗА ДОБАВЛЕНИЕ КАРТОЧКИ НА СТРАНИЦУ
export default class Section {

  constructor({ items, renderer }, containerSelector) {
    this._dataCards = items; // МАССИВ ДАННЫХ КАРТОЧКИ
    this._renderer = renderer; // КОЛБЭК
    this._containerSelector = document.querySelector(containerSelector); // СЕЛЕКТОР РАЗМЕТКИ, КУДА НУЖНО ВСТАВЛЯТЬ КАРТОЧКИ
  }


  // ОТВЕЧАЕТ ЗА ОТРИСОВКУ ВСЕХ ЭЛЕМЕНТОВ
  renderer() {

    this._dataCards.forEach((item) => { // ДЕЛАЕМ ПЕРЕСЧЁТ МАССИВА
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

