import "./index.css";
import initialCards from "./scripts/initial-cards.js";
import FormValidator from "./scripts/components/FormValidator.js";
import Card from "./scripts/components/card.js";
import Section from "./scripts/components/Section.js";
import PopupWithImage from "./scripts/components/PopupWithImage.js";
import PopupWithForm from "./scripts/components/PopupWithForm.js";
import UserInfo from "./scripts/components/UserInfo.js";
import {
  editButton,
  profileEditForm,
  cardTemplateId,
  addButton,
  cardAddForm,
  formConfig,
  profileSelectors,
  popupSelectors,
} from "./scripts/constants.js";

// Объект, управляющий данными профиля на странице
const userInfo = new UserInfo(
  profileSelectors.name,
  profileSelectors.description
);

// Блок поп-апов
// -------------
// Функция добавления картинки из поп-апа
function addPopupCallback() {
  // Запомним данные формы в переменную
  const data = this._getInputValues();
  console.log(data);
  // Создаём объект карточки из данных формы
  const card = new Card(
    {
      name: data.place_name.value,
      link: data.place_link.value,
    },
    cardTemplateId,
    expandImage
  );

  // Добавляем карточку в секцию с карточками
  elementsSection.add(card.createCard());
  this.close();
}

// Функция сохранения данных из профиля
function editPopupCallback() {
  // Сохраняем информацию из формы
  const formData = this._getInputValues();

  // Задаём значения из формы с помощью метода setUserInfo
  userInfo.setUserInfo({
    name: formData.input_name.value,
    description: formData.input_description.value,
  });
  console.log("profile saved");
  this.close();
}

// Объявляем поп-апы
// Поп-ап сформой редактирования профиля
const editPopup = new PopupWithForm(
  popupSelectors.popupEdit,
  editPopupCallback
);
// Поп-ап с формой добавления карточек
const addPopup = new PopupWithForm(popupSelectors.popupAdd, addPopupCallback);
// Поп-ап с большой картинкой
const viewPopup = new PopupWithImage(popupSelectors.popupView);

// Коллбэк увеличения картинки для клика по карточкам
function expandImage() {
  // Открываем поп-ап с картинкой, передаём в него данные картинки
  viewPopup.open(this._image.src, this._image.alt);
  console.log("card expanded");
}

// Блок валидации форм
// -------------------
// Добавляем валидацию ко всем формам согласно конфигурации
const cardValidator = new FormValidator(formConfig, cardAddForm);
cardValidator.enableValidation();

const profileValidator = new FormValidator(formConfig, profileEditForm);
profileValidator.enableValidation();

// Блок секций
// -----------
// Рендерер для секции с карточками
function cardRenderer(data) {
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
addButton.addEventListener("click", addPopup.open.bind(addPopup));
// Что будет, когда мы нажимаем кнопки
editButton.addEventListener("click", () => {
  // Получаем информацию профиля из userInfo
  const { name, description } = userInfo.getUserInfo();

  // Задаём значения полям ввода в поп-апе
  editPopup._getInputValues().input_name.value = name;
  editPopup._getInputValues().input_description.value = description;

  // Открываем поп-ап
  editPopup.open();
});
