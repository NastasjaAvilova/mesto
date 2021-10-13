import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor(selector, submitCallback) {
    super(selector);
    this._form = this._popup.querySelector(".form");
    this._saveButton = this._popup.querySelector(".form__save-button");
    // Запоминаем дефолтное значение кнопки
    this._defaultButtonValue = this._saveButton.textContent;
    this._submitCallback = submitCallback.bind(this);
    this._inputList = Array.from(this._form.querySelectorAll("input")); // Находим поля для ввода текста по тегу
  }

  close() {
    // Закрываем поп-ап
    super.close();
    // Очищаем форму
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

  setEventListeners() {
    super.setEventListeners();
    // Вешаем обработчик отправки формы
    this._form.addEventListener("submit", () => {
      this._submitCallback(this._getInputValues());
    });
  }

  renderLoading(isLoading) {
    if (isLoading) {
      this._saveButton.textContent = "Сохранение...";
    } else {
      this._saveButton.textContent = this._defaultButtonValue;
    }
    console.log(this._saveButton.textContent);
  }

  setButtonText(value) {
    this._saveButton.textContent = value;
  }
}
