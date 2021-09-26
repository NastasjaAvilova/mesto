// export const sectionElements = document.querySelector(".elements");

export default class Section {
  constructor({ items, renderer }, selector) {
    this._section = document.querySelector(selector);
    this._renderer = renderer;
    this._items = items;

    this.renderElements();
  }

  renderElements() {
    this._items.forEach(data => {
    // создаём DOM-элемент из объекта с данными
    const element = this._renderer(data);
    // Делаем append элемента
    this.add(element, true);
    });
  }

  add(element, append) {
    // Добавление в конец
    if (append) this._section.append(element);
    // Добавление в начало
    else this._section.prepend(element);
    // console.log(append ? `appended` : 'prepended', element);
  }
}

