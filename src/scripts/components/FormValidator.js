export default class FormValidator {
  constructor(formConfig, formElement) {
    // Закрепили форму за валидатором
    this._form = formElement;
    // Сохранили настройки
    this._config = formConfig;
    // Выделили поля для ввода
    this._inputList = Array.from(
      this._form.querySelectorAll(this._config.inputElement)
    );
    // Сохранили ссылку на кнопку
    this._button = this._form.querySelector(this._config.submitButtonSelector);
  }

  enableValidation() {
    // Отключаем дефолтное поведение сабмита
    this._form.addEventListener("submit", evt => evt.preventDefault());

    // Задаём слушатели событий для текстовых полей
    this._setEventListeners();
  }

  _setEventListeners() {
    // Задаём первичное состояние кнопки
    this._toggleButtonState();

    // Для каждого поля формы
    this._inputList.forEach(inputElement => {
      // Добавляем обработчик ввода текста
      inputElement.addEventListener("input", () => {
        // Проверяем валидность поля
        this._checkInputValidity(inputElement);
        // Делаем кнопку активной/неактивной
        this._toggleButtonState();
      });
    });
  }

  _showInputError(inputElement) {
    // Находим элемент ошибки
    const errorElement = this._form.querySelector(
      `#${inputElement.name}-error`
    );
    // Стилизуем поле ввода как ошибочное с помощью модификатора из конфига
    inputElement.classList.add(this._config.inputErrorClass);
    // Задаём текст ошибки из браузера
    errorElement.textContent = inputElement.validationMessage;
    // Делаем ошибку видимой
    errorElement.classList.add(this._config.errorClass);
  }

  _hideInputError(inputElement) {
    // Находим элемент ошибки
    const errorElement = this._form.querySelector(
      `#${inputElement.name}-error`
    );
    // Удаляем ошибочный стиль поля ввода
    inputElement.classList.remove(this._config.inputErrorClass);
    // Скрываем ошибку
    errorElement.classList.remove(this._config.errorClass);
    // Удаляем текст ошибки
    errorElement.textContent = "";
  }

  _checkInputValidity(inputElement) {
    // Если поле невалидно
    if (!inputElement.validity.valid) {
      // Показываем ошибку валидации
      this._showInputError(inputElement);
    } else {
      // Или не показываем
      this._hideInputError(inputElement);
    }
  }

  _hasInvalidInput() {
    // Возвращаем true, если в одном из полей есть ошибка при валидации
    return this._inputList.some(inputElement => !inputElement.validity.valid);
  }

  _toggleButtonState() {
    // Если есть хотя бы один невалидный инпут
    if (this._hasInvalidInput()) {
      // сделай кнопку неактивной
      this._button.classList.add(this._config.inactiveButtonClass);
      this._button.disabled = true;
    } else {
      // иначе сделай кнопку активной
      this._button.classList.remove(this._config.inactiveButtonClass);
      this._button.disabled = false;
    }
  }
}
