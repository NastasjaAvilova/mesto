const formConfig = {
  formElement: ".form",
  inputElement: ".form__text-field",
  submitButtonSelector: ".form__save-button",
  inactiveButtonClass: "form__save-button_disabled",
  inputErrorClass: "form__text-field_error",
  errorClass: "form__input-error_visible"
};

const showInputError = (formElement, inputElement, errorMessage) => {
  // Находим элемент ошибки
  const errorElement = formElement.querySelector(`.${inputElement.name}-error`);
  // Стилизуем поле ввода как ошибочное
  inputElement.classList.add(formConfig.inputErrorClass);
  // Задаём текст ошибки
  errorElement.textContent = errorMessage;
  // Делаем ошибку видимой
  errorElement.classList.add(formConfig.errorClass);
};

const hideInputError = (formElement, inputElement) => {
  // Находим элемент ошибки
  const errorElement = formElement.querySelector(`.${inputElement.name}-error`);
  // Удаляем ошибочный стиль поля ввода
  inputElement.classList.remove(formConfig.inputErrorClass);
  // Скрываем ошибку
  errorElement.classList.remove(formConfig.errorClass);
  // Удаляем текст ошибки
  errorElement.textContent = "";
};

const checkInputValidity = (formElement, inputElement) => {
  // Если поле невалидно
  if (!inputElement.validity.valid) {
    // Показываем ошибку валидации
    showInputError(formElement, inputElement, inputElement.validationMessage);
  } else {
    // Или не показываем
    hideInputError(formElement, inputElement);
  }
};

function hasInvalidInput(inputList) {
  // Возвращаем true, если в одном из полей есть ошибка при валидации
  return inputList.some(inputElement => !inputElement.validity.valid);
}

function toggleButtonState(inputList, buttonElement) {
  // Если есть хотя бы один невалидный инпут
  if (hasInvalidInput(inputList)) {
    // сделай кнопку неактивной
    buttonElement.classList.add(formConfig.inactiveButtonClass);
  } else {
    // иначе сделай кнопку активной
    buttonElement.classList.remove(formConfig.inactiveButtonClass);
  }
}

function setEventListeners(formElement) {
  // Находим все поля в форме
  const inputList = Array.from(
    formElement.querySelectorAll(formConfig.inputElement)
  );
  // Находим кнопку отправки формы
  const buttonElement = formElement.querySelector(
    formConfig.submitButtonSelector
  );
  // Задаём первичное состояние кнопки
  toggleButtonState(inputList, buttonElement);

  // Для каждого поля формы
  inputList.forEach(inputElement => {
    // Добавляем обработчик ввода текста
    inputElement.addEventListener("input", () => {
      // Проверяем валидность поля
      checkInputValidity(formElement, inputElement);
      // Делаем кнопку активной/неактивной
      toggleButtonState(inputList, buttonElement);
    });
  });
}

function enableValidation(config) {
  // Находим все формы
  const formList = document.querySelectorAll(config.formElement);
  console.log(formList);
  // Для каждой формы
  formList.forEach(function(formElement) {
    // Отключаем базовую отправку формы
    formElement.addEventListener("submit", evt => evt.preventDefault());

    // Добавляем обработчики событий на текстовые поля
    setEventListeners(formElement, formConfig.inputElement);
  });
}

// Добавляем валидацию ко всем формам согласно конфигурации
enableValidation(formConfig);
