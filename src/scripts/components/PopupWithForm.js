import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor(selector, submitCallback) {
    super(selector);
    this._form = this._popup.querySelector(".form");
    this._submitCallback = submitCallback.bind(this);
    this._inputList = Array.from(this._form.querySelectorAll("input")); // Находим поля для ввода текста по тегу

    // Единоразово вешаем обработчик отправки формы
    this._form.addEventListener("submit", () => {
      this._submitCallback(this._getInputValues());
    });
  }

  close() {
    super.close();
  }

  resetForm() {
    this._form.reset();
  }

  _getInputValues() {
    const formValues = {};
    // Для каждого поля ввода записываем в объект значение поля с ключом-именем поля
    this._inputList.forEach((element) => {
      formValues[element.name] = element.value;
    });
    return formValues;
  }
}
