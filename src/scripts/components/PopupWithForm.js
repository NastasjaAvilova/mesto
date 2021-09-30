import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor(selector, submitCallback) {
    super(selector);
    this._form = this._popup.querySelector(".form");
    this._submitCallback = submitCallback.bind(this);
  }

  close() {
    super.close();
    this._form.reset();
  }

  _getInputValues() {
    return this._form.elements;
  }

  setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener("submit", this._submitCallback);
  }
}
