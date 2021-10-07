import Popup from "./Popup.js";

export default class PopupWithImage extends Popup {
  constructor(selector) {
    super(selector); // Подгружаем поп-ап по селектору по родительскому принципу
    this._image = this._popup.querySelector(".popup__image");
    this._title = this._popup.querySelector(".popup__view-title");
  }
  open(src, text) {
    // Открывает поп-ап, задаёт значения полей
    this._image.src = src;
    this._image.alt = text;
    this._title.textContent = text;

    super.open();
  }
}
