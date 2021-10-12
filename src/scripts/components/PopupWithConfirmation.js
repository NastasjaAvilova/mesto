import Popup from "./Popup.js";

export default class PopupWithConfirmation extends Popup {
  constructor(selector) {
    super(selector);
    this._button = this._popup.querySelector(".popup__confirmation-button");
  }

  // Открывает диалоговое окно для подтверждения выполнения коллбэка
  open(action) {
    // Запоминаем коллбэк в объекте
    this._callback = (() => {
      action();
      this.close();
    }).bind(this);
    // Даём задание листенеру выполнить коллбэк при нажатии на кнопку и закрыть окно
    this._button.addEventListener("click", this._callback);

    // Открываем окно
    super.open();
  }

  close() {
    // Наследуем функцию клоуз
    super.close();
    // Снимаем обработчик с кнопки
    this._button.removeEventListener("click", this._callback);
    // Удаляем коллбэк из объекта
    delete this._callback;
  }
}
