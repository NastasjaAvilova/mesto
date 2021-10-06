// Кнопки
// ------
// Кнопка редактирования
export const editButton = document.querySelector(".profile__edit-button");
// Кнопка добавления картинки
export const addButton = document.querySelector(".profile__add-button");

// Формы
// -----
// Форма редактирования профиля
export const profileEditForm = document.querySelector(
  '[name="profile-edit-form"]'
);
// Форма добавления
export const cardAddForm = document.querySelector('[name="card-add-form"]');

// Селекторы данных профиля
export const profileSelectors = {
  name: ".profile__name",
  description: ".profile__description"
};

// Поп-апы
// -------
// Селекторы поп-апов
export const popupSelectors = {
  popupAdd: "#popup_add",
  popupEdit: "#popup_edit",
  popupView: "#popup_view"
};
// Класс открытого поп-апа
export const openClass = "popup_opened";

// Шаблон карточки
export const cardTemplateId = "#card";

// Селекторы для валидации
export const formConfig = {
  formElement: ".form",
  inputElement: ".form__text-field",
  submitButtonSelector: ".form__save-button",
  inactiveButtonClass: "form__save-button_disabled",
  inputErrorClass: "form__text-field_error",
  errorClass: "form__input-error_visible"
};