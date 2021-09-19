import {
  openClass,
  popupEdit,
  inputName,
  inputDescription,
  profileName,
  profileDescription
} from './constants.js'

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

function closePopup(popup) {
  // Удаляем класс видимости поп-апа
  popup.classList.remove(openClass);

  // Удаляем обработчик события, закрывающий поп-ап
  document.removeEventListener("keydown", popupEscapeListener);
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

export { openPopup, closePopup, openEditPopup, saveProfile };
