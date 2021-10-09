export default class Section {
  constructor({ items, renderer }, selector) {
    this._section = document.querySelector(selector);
    this._renderer = renderer;

    // Если нет исходных элементов, то их у нас пустой массив
    items ? (this._items = items) : (this._items = []);

    this.renderElements();
  }

  renderElements() {
    this._items.forEach((data) => {
      // Делаем append элемента
      this.add(data, true);
    });
  }

  add(data, append) {
    // создаём DOM-элемент из объекта с данными
    const element = this._renderer(data);
    // Добавление в конец
    if (append) this._section.append(element);
    // Добавление в начало
    else this._section.prepend(element);
  }
}
