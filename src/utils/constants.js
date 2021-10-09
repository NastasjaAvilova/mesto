// Кнопки
// ------
// Кнопка редактирования
export const editButton = document.querySelector(".profile__edit-button");
// Кнопка добавления картинки
export const addButton = document.querySelector(".profile__add-button");

// Формы
// -----
export const formElements = {
  profileEditForm: document.querySelector('[name="profile-edit-form"]'),
  cardAddForm: document.querySelector('[name="card-add-form"]'),
};

// Селекторы данных профиля
export const profileSelectors = {
  name: ".profile__name",
  description: ".profile__description",
};

// Поп-апы
// -------
// Селекторы поп-апов
export const popupSelectors = {
  popupAdd: "#popup_add",
  popupEdit: "#popup_edit",
  popupView: "#popup_view",
  popupAvatar: "#popup_avatar",
  popupConfirmation: "#popup_confirmation",
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
  errorClass: "form__input-error_visible",
};

// Базовые параметры Api
export const apiConfig = {
  baseUrl: "https://mesto.nomoreparties.co/v1/cohort-28/",
  headers: {
    authorization: "62dd7ad4-aa06-4a8e-9e43-b5c530cafbb4",
    "Content-Type": "application/json",
  },
};
