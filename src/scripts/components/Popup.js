import { openClass } from "./../../utils/constants.js";

export default class Popup {
  constructor(selector) {
    this._popup = document.querySelector(selector);
    // Коллбэк закрытия по Escape
    this._escapeHandler = this._handleEscClose.bind(this);
  }

  open() {
    // Откроем поп-ап, добавив к нему модификатор
    this._popup.classList.add(openClass);

    // Создаём обработчик нажатия Escape для закрытия текущего поп-апа
    document.addEventListener("keydown", this._escapeHandler);

    console.log("popup opened");
  }

  close() {
    // Удаляем класс видимости поп-апа
    this._popup.classList.remove(openClass);

    // Удаляем обработчик события, закрывающий поп-ап

    document.removeEventListener("keydown", this._escapeHandler);

    console.log("popup closed");
  }

  _handleEscClose(evt) {
    if (evt.key === "Escape") this.close();
  }

  setEventListeners() {
    // Закрытие по кнопке закрытия
    this._popup
      .querySelector(".popup__close-button")
      .addEventListener("click", this.close.bind(this));

    // Закрытие по клику вне поп-апа
    this._popup.addEventListener("click", (evt) => {
      // Если мы кликаем на сам поп-ап, а не на вложенные в него элементы, он закроется
      if (evt.target === evt.currentTarget) this.close();
    });
  }
}
