import Popup from "./Popup.js";

export default class PopupWithImage extends Popup {
  constructor(selector) {
    super(selector); // Подгружаем поп-ап по селектору по родительскому принципу
    this._image = this._popup.querySelector(".popup__image");
  }
  open(src, text) {
    this._image.src = src;
    this._image.alt = text;
    this._popup.querySelector(".popup__view-title").textContent = text;
    
    super.open();
  }
}