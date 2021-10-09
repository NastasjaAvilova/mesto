import Popup from "./Popup.js";

export default class PopupWithConfirmation extends Popup {
  constructor(selector, submitCallback) {
    super(selector);
    this._form = this._popup.querySelector(".form");
    this._submitCallback = submitCallback.bind(this);
  }

  setEventListeners() {
    super.setEventListeners();
    // Вешаем обработчик отправки формы
    this._form.addEventListener("submit", () => {
      this._submitCallback(this._getInputValues());
    });
  }
}
