// Блок объявления переменных
// --------------------
// Поля формы
export const inputName = document.querySelector('[name="input_name"]');
export const inputDescription = document.querySelector('[name="input_description"]');
export const placeName = document.querySelector('[name="place_name"]');
export const placeLink = document.querySelector('[name="place_link"]');

// Кнопка редактирования
export const editButton = document.querySelector(".profile__edit-button");

// Кнопка добавления картинки
export const addButton = document.querySelector(".profile__add-button");

// Форма редактирования профиля
export const profileEditForm = document.querySelector('[name="profile-edit-form"]');
// Форма добавления
export const cardAddForm = document.querySelector('[name="card-add-form"]');

// Получаем данные пользователя из профиля
export const profileName = document.querySelector(".profile__name");
export const profileDescription = document.querySelector(".profile__description");

// Задаём переменную для поп-апа редактировния
export const popupEdit = document.querySelector("#popup_edit");
// Задаём переменную для поп-апа добавления
export const popupAdd = document.querySelector("#popup_add");
export const addCardNameField = popupAdd.querySelector('[name="place_name"]');
export const addCardLinkField = popupAdd.querySelector('[name="place_link"]');

// даём имя попапу для просмотра картинок
export const popupView = document.querySelector("#popup_view");
export const popupImage = popupView.querySelector(".popup__image");

// Зададим класс для всех поп-апов, чтобы обращаться ко всем сразу
export const allPopups = document.querySelectorAll(".popup");

// И для правила когда он открыт
export const openClass = "popup_opened";

// Для блока с карточками
export const cards = document.querySelector(".elements");

export const cardTemplateId = "#card";

// Для валидации
export const formConfig = {
  formElement: ".form",
  inputElement: ".form__text-field",
  submitButtonSelector: ".form__save-button",
  inactiveButtonClass: "form__save-button_disabled",
  inputErrorClass: "form__text-field_error",
  errorClass: "form__input-error_visible"
};
