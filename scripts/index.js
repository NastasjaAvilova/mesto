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

// Общий блок поведения поп-апов
// --------------------
// Переключает видимость заданного поп-апа
function openPopup(popup) {
  // Откроем поп-ап, добавив к нему модификатор
  popup.classList.add(openClass);
  console.log("popup opened");
}

// Блок поп-апа профиля
// --------------------
// Открывает поп-ап редактирования профиля
function openEditPopup() {
  // Открываем попап
  openPopup(popupEdit);

  // Подтягиваем данные профиля в форму
  inputName.value = profileName.textContent;
  inputDescription.value = profileDescription.textContent;
}
// Сохраняем профиль
function saveProfile(evt) {
  // Останавливаем стандартный submit
  evt.preventDefault();

  // Присваиваем профилю значения из формы
  profileName.textContent = inputName.value;
  profileDescription.textContent = inputDescription.value;

  console.log("profile saved");

  closePopup(popupEdit);
}

// Что будет, когда мы нажимаем кнопки
editButton.addEventListener("click", openEditPopup);
// Задаём действие кнопке сохранения
profileEditForm.addEventListener("submit", saveProfile);

function closePopup(popup) {
  popup.classList.remove("popup_opened");
}

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

// Для всех поп-апов задаём возможность закрытия по ESC
document.addEventListener("keydown", function(evt) {
  if (evt.key === "Escape") {
    allPopups.forEach(function(popup) {
      closePopup(popup);
    });
  }
});

//Блок с карточками
const cards = document.querySelector(".elements");

function deleteCard(evt) {
  const card = evt.target.closest(".elements__card"); // parent
  card.remove();
  console.log("card removed");
}

//функция для клика по картинке

function makeImageBig(evt) {
  // возьмём картинку в попапе
  const popupImage = popupView.querySelector(".popup__image");
  // зададим ей те же атрибуты, что и у картинки, по которой мы кликнули
  popupImage.src = evt.target.src;
  popupImage.alt = evt.target.alt;
  popupView.querySelector(".popup__view-title").textContent = evt.target.alt;

  // зададим текст такой же, как в карточке

  // откроем попап с картинкой
  openPopup(popupView);
}

function createCard(data) {
  // Находим шаблон
  const cardTemplate = document.querySelector("#card").content;
  // Клонируем его
  const card = cardTemplate.querySelector(".elements__card").cloneNode(true);

  // Задаём новое наполнение
  card.querySelector(".elements__title").textContent = data.name;

  const elementsImage = card.querySelector(".elements__image");
  elementsImage.setAttribute("src", data.link); // img src
  elementsImage.setAttribute("alt", data.name);

  elementsImage.addEventListener("click", makeImageBig);

  // buttons
  card.querySelector(".elements__trash").addEventListener("click", deleteCard);
  card.querySelector(".elements__like").addEventListener("click", evt => {
    evt.target.classList.toggle("elements__like_active");
  });
  console.log("card created");
  return card;
}

// Создаём первичное наполнение
initialCards.forEach(cardData => cards.append(createCard(cardData)));

const addCardNameField = popupAdd.querySelector('[name="place_name"]');
const addCardLinkField = popupAdd.querySelector('[name="place_link"]');

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
  cards.prepend(createCard(cardData));

  console.log("card added");

  closePopup(popupAdd);

  // Сбрасываем форму
  evt.target.reset();
}

cardAddForm.addEventListener("submit", addCardFromPopup);
