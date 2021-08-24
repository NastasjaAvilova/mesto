// Общий блок поведения поп-апов
// --------------------
// Слушатель Escape для закрытия открытого поп-апа
function popupEscapeListener(evt) {
  if (evt.key === "Escape") closePopup(document.querySelector(`.${openClass}`));
}

// Делаем заданный поп-ап видимым
function openPopup(popup) {
  // Откроем поп-ап, добавив к нему модификатор
  popup.classList.add(openClass);

  // Создаём обработчик нажатия Escape для закрытия текущего поп-апа
  document.addEventListener("keydown", popupEscapeListener);

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
  // Удаляем класс видимости поп-апа
  popup.classList.remove(openClass);

  // Удаляем обработчик события, закрывающий поп-ап
  document.removeEventListener("keydown", popupEscapeListener)
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


//Блок с карточками
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
