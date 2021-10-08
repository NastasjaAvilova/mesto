import "./index.css";

import initialCards from "../utils/initial-cards.js";
import FormValidator from "../scripts/components/FormValidator.js";
import Card from "../scripts/components/Card.js";
import Section from "../scripts/components/Section.js";
import PopupWithImage from "../scripts/components/PopupWithImage.js";
import PopupWithForm from "../scripts/components/PopupWithForm.js";
import UserInfo from "../scripts/components/UserInfo.js";
import {
  editButton,
  cardTemplateId,
  addButton,
  formElements,
  formConfig,
  profileSelectors,
  popupSelectors,
} from "../utils/constants.js";

// Объект, управляющий данными профиля на странице
const userInfo = new UserInfo(
  profileSelectors.name,
  profileSelectors.description
);

// Блок поп-апов
// -------------
// Функция добавления картинки из поп-апа
function addPopupCallback({ place_name, place_link }) {
  // Добавляем карточку в секцию с карточками (внутри секции отрабатывает рендерер)
  elementsSection.add({
    name: place_name,
    link: place_link,
  });
  this.close();
}

// Функция сохранения данных из профиля
function editPopupCallback(formData) {
  // Задаём значения из формы с помощью метода setUserInfo
  userInfo.setUserInfo({
    name: formData.input_name,
    description: formData.input_description,
  });
  console.log("profile saved");
  this.close();
}

// Объявляем поп-апы
// Поп-ап с формой редактирования профиля
const editPopup = new PopupWithForm(
  popupSelectors.popupEdit,
  editPopupCallback
);
editPopup.setEventListeners();
// Поп-ап с формой добавления карточек
const addPopup = new PopupWithForm(popupSelectors.popupAdd, addPopupCallback);
addPopup.setEventListeners();
// Поп-ап с большой картинкой
const viewPopup = new PopupWithImage(popupSelectors.popupView);
viewPopup.setEventListeners();

// Коллбэк увеличения картинки для клика по карточкам
function expandImage({ link, name }) {
  // Открываем поп-ап с картинкой, передаём в него данные картинки
  viewPopup.open(link, name);
  console.log("card expanded");
}

// Блок валидации форм
// -------------------
// Добавляем валидацию ко всем формам согласно конфигурации
const cardValidator = new FormValidator(formConfig, formElements.cardAddForm);
cardValidator.enableValidation();

const profileValidator = new FormValidator(
  formConfig,
  formElements.profileEditForm
);
profileValidator.enableValidation();

// Блок секций
// -----------
// Рендерер для секции с карточками
function cardRenderer(data) {
  // data = {name, link}
  const card = new Card(data, cardTemplateId, expandImage);
  return card.createCard();
}

// Секция с карточками
const elementsSection = new Section(
  {
    items: initialCards,
    renderer: cardRenderer,
  },
  ".elements"
);

// Блок поведения кнопок
// ---------------------
addButton.addEventListener("click", () => {
  // cardValidator._toggleButtonState();
  cardValidator.resetValidation();
  addPopup.open();
});
// Что будет, когда мы нажимаем кнопки
editButton.addEventListener("click", () => {
  // Получаем информацию профиля из userInfo
  const { name, description } = userInfo.getUserInfo();

  // Задаём значения полям ввода в поп-апе
  formElements.profileEditForm.elements.input_name.value = name;
  formElements.profileEditForm.elements.input_description.value = description;

  // Активируем кнопку сохранения и очищаем ошибки
  profileValidator.resetValidation();
  // Открываем поп-ап
  editPopup.open();
});
