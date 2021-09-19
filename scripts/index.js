import { initialCards } from "./initial-cards.js";
import { FormValidator } from "./formvalidator.js";
import Card from "./card.js";
import { openPopup, closePopup, openEditPopup, saveProfile } from "./popup.js";
import {
  editButton,
  profileEditForm,
  allPopups,
  cardTemplateId,
  cards,
  addButton,
  cardAddForm,
  formConfig,
  popupAdd,
  addCardNameField,
  addCardLinkField
} from "./constants.js";

// Что будет, когда мы нажимаем кнопки
editButton.addEventListener("click", openEditPopup);
// Задаём действие кнопке сохранения
profileEditForm.addEventListener("submit", saveProfile);

// Всем кнопкам закрытия задаём действие закрытия
document.querySelectorAll(".popup__close-button").forEach(button => {
  const popup = button.closest(".popup");
  button.addEventListener("click", () => closePopup(popup));
});

// Вешаем обработчик на все поп-апы
allPopups.forEach(popup => {
  popup.addEventListener("click", evt => {
    // Если мы кликаем на сам поп-ап, а не на вложенные в него элементы, он закроется
    if (evt.target === evt.currentTarget) closePopup(evt.currentTarget);
  });
});

// Создаём первичное наполнение
initialCards.forEach(cardData => {
  // Конструируем карточку
  const card = new Card(cardData, cardTemplateId);
  // Добавляем на страницу
  cards.append(card.createCard());
});

// Блок поп-апа добавления картинки
// --------------------
addButton.addEventListener("click", () => openPopup(popupAdd));

function addCardFromPopup(evt) {
  evt.preventDefault();
  // Присваиваем профилю значения из формы
  const cardData = {
    name: addCardNameField.value,
    link: addCardLinkField.value
  };

  // Добавляем карточку в начало списка
  const card = new Card(cardData, cardTemplateId);
  cards.prepend(card.createCard());

  console.log("card added");

  closePopup(popupAdd);

  // Сбрасываем форму
  evt.target.reset();
  popupAdd.querySelector(formConfig.submitButtonSelector).classList.add(formConfig.inactiveButtonClass);
  popupAdd.querySelector(formConfig.submitButtonSelector).disabled = true;
}

cardAddForm.addEventListener("submit", addCardFromPopup);

// Добавляем валидацию ко всем формам согласно конфигурации
const cardValidator = new FormValidator(formConfig, cardAddForm);
cardValidator.enableValidation();

const profileValidator = new FormValidator(formConfig, profileEditForm);
profileValidator.enableValidation(); 
