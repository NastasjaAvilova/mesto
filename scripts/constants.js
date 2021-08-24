// Блок объявления переменных
// --------------------
// Поля формы
const inputName = document.querySelector('[name="input_name"]');
const inputDescription = document.querySelector('[name="input_description"]');
const placeName = document.querySelector('[name="place_name"]');
const placeLink = document.querySelector('[name="place_link"]');

// Кнопка редактирования
const editButton = document.querySelector(".profile__edit-button");

// Кнопка добавления картинки
const addButton = document.querySelector(".profile__add-button");

// Форма редактирования профиля
const profileEditForm = document.querySelector('[name="profile-edit-form"]');
//
const cardAddForm = document.querySelector('[name="card-add-form"]');

// Получаем данные пользователя из профиля
const profileName = document.querySelector(".profile__name");
const profileDescription = document.querySelector(".profile__description");

// Задаём переменную для поп-апа редактировния
const popupEdit = document.querySelector("#popup_edit");
// Задаём переменную для поп-апа добавления
const popupAdd = document.querySelector("#popup_add");

// даём имя попапу для просмотра картинок
const popupView = document.querySelector("#popup_view");

// Зададим класс для всех поп-апов, чтобы обращаться ко всем сразу
const allPopups = document.querySelectorAll(".popup");

// И для правила когда он открыт
const openClass = "popup_opened";

// Для блока с карточками
const cards = document.querySelector(".elements");

// Для валидации
const formConfig = {
  formElement: ".form",
  inputElement: ".form__text-field",
  submitButtonSelector: ".form__save-button",
  inactiveButtonClass: "form__save-button_disabled",
  inputErrorClass: "form__text-field_error",
  errorClass: "form__input-error_visible"
};