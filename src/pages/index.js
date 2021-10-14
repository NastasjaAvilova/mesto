import "./index.css";

import FormValidator from "../scripts/components/FormValidator.js";
import Card from "../scripts/components/Card.js";
import Section from "../scripts/components/Section.js";
import PopupWithImage from "../scripts/components/PopupWithImage.js";
import PopupWithForm from "../scripts/components/PopupWithForm.js";
import PopupWithConfirmation from "../scripts/components/PopupWithConfirmation.js";
import UserInfo from "../scripts/components/UserInfo.js";
import Api from "../scripts/components/Api.js";
import {
  editButton,
  cardTemplateId,
  addButton,
  formElements,
  formConfig,
  profileSelectors,
  popupSelectors,
  apiConfig,
} from "../utils/constants.js";

// Создаём объект API из конфигурации
const api = new Api(apiConfig);

const avatarPopup = new PopupWithForm(
  popupSelectors.popupAvatar,
  editAvatarCallback
);
avatarPopup.setEventListeners();

// Объект, управляющий данными профиля на странице
const userInfo = new UserInfo(
  profileSelectors
  // При нажатии на аватар открывается поп-ап
);

// При клике по кнопке редактирования аватара открывается окно редактирования аватара
document
  .querySelector(profileSelectors.avatarEditSelector)
  .addEventListener("click", avatarPopup.open.bind(avatarPopup));

// Обновляет данные пользователя на странице из промиса getUserInfo
function setUserInfo({ name, about, _id, avatar }) {
  userInfo.setUserInfo({
    name: name,
    description: about,
    id: _id,
  });
  userInfo.setAvatar(avatar);
}

// Секция с карточками
const elementsSection = new Section(cardRenderer, ".elements");

// Дожидаемся ответов от сервера с данными профиля и карточками
Promise.all([api.getUserInfo(), api.getInitialCards()])
  // После чего
  .then(([userData, cards]) => {
    // Задаём данные профиля из ответа по профилю
    setUserInfo(userData);
    // Отрисовываем карточки из ответа с карточками
    elementsSection.renderElements(cards);
  })
  .catch(logError);

// Коллбэк для сабмита. В него передаётся объект со значениями полей формы
function editAvatarCallback({ avatar_link }) {
  avatarPopup.renderLoading(true);
  api
    .setAvatar(avatar_link)
    .then((res) => {
      userInfo.setAvatar(res.avatar);
      avatarPopup.close();
    })
    .catch(logError)
    .finally(() => avatarPopup.renderLoading(false));
}

// Блок поп-апов
// -------------
// Функция добавления картинки из поп-апа
function addPopupCallback({ place_name, place_link }) {
  // Добавляет карточку из промиса в секцию
  function addCardFromResponse(cardData) {
    elementsSection.add(cardData, true);
  }
  addPopup.renderLoading(true);
  // Отправляем запрос на добавление карточки и добавляем её в DOM после ответа сервера
  api
    .addCard({ name: place_name, link: place_link })
    .then(addCardFromResponse) // Рендерим карточку и добавляем в DOM
    .then(() => {
      addPopup.renderLoading(false);
      addPopup.close();
    })
    .catch((res) => alert(res + ". Попробуйте загрузить другую картинку."));
}

// Выводит ошибку в консоль, используется в блоке catch
function logError(rej) {
  console.log(rej);
}

// Функция сохранения данных из профиля
function editPopupCallback({ input_name, input_description }) {
  // console.log(editPopup._getInputValues());
  // Изменяем данные профиля в API
  editPopup.renderLoading(true);
  api
    .setUserInfo({ name: input_name, about: input_description }) // Отправляем запрос на изменения профиля
    .then((res) => {
      setUserInfo(res);
      editPopup.close();
    })
    .catch(logError)
    .finally(() => editPopup.renderLoading(false)); // Обновляем данные пользователя на странице из ответа PATCH-запроса
  console.log("profile saved");
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

const confirmationPopup = new PopupWithConfirmation(
  popupSelectors.popupConfirmation
);
confirmationPopup.setEventListeners();

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

const avatarValidator = new FormValidator(
  formConfig,
  formElements.avatarEditForm
);
avatarValidator.enableValidation();

// Блок секций
// -----------
// Рендерер для секции с карточками
function cardRenderer(data) {
  const ourCard = new Card(
    data,
    cardTemplateId,
    expandImage,
    deleteCardWithConfirmation,
    cardLikeCallback
  );
  // Если среди лайкнувших есть наш айди, то карточку помечаем как лайкнутую
  if (isLikedByUser(ourCard)) ourCard.setLikeState(true);
  // Если id создавшего карточку совпадает с id пользователя то у помойки display: block
  if (ourCard.isOwnedBy(userInfo.getUserInfo().id)) {
    ourCard.enableDeletion();
  }
  return ourCard.createCard();
}

function isLikedByUser(card) {
  return card.getLikers().includes(userInfo.getUserInfo().id);
}

// Коллбэк постановки лайка
function cardLikeCallback({ id, cardObject }) {
  // Лайкать или нет, зависит от того, лайкнул ли наш юзер
  const toLike = !isLikedByUser(cardObject);
  // Поставим лайк карточке с заданным id, если она не лайкнута пользователем
  api
    .likeCard(id, toLike)
    .then((res) => {
      // Задаём стиль "лайкнутой кнопки"
      cardObject.setLikeState(toLike);
      // Задаём новый массив лайков и обновляем счётчик на карточке
      cardObject.setLikers(res.likes);
    })
    .catch(logError);
}

// Функция удаления карточки. Используется как deleteHandler для класса Card.
function deleteCardWithConfirmation({ id, cardElement }) {
  function deleteCard() {
    api
      .deleteCard(id)
      .then(() => {
        cardElement.remove();
        confirmationPopup.close();
      })
      .catch(logError);
  }
  // Открываем диалоговое окно для подтверждения удаления
  confirmationPopup.open(deleteCard);
}

// Блок поведения кнопок
// ---------------------
addButton.addEventListener("click", () => {
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

addButton.addEventListener("click", () => {
  // cardValidator._toggleButtonState();
  cardValidator.resetValidation();
  addPopup.open();
});
