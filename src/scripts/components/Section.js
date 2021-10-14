export default class Section {
  constructor(renderer, selector) {
    this._section = document.querySelector(selector);
    this._renderer = renderer;
  }

  // Отрисовывает переданный массив элементов с помощью рендерера
  renderElements(items) {
    items.forEach((data) => {
      // Делаем append элемента
      this.add(data);
    });
  }

  add(data, prepend = false) {
    // создаём DOM-элемент из объекта с данными
    const element = this._renderer(data);
    // Добавление в начало
    if (prepend) this._section.prepend(element);
    // Добавление в конец
    else this._section.append(element);
  }
}
