import {
  openClass,
  inputName,
  inputDescription,
  profileName,
  profileDescription
} from '../constants.js'

export default class Popup {
  constructor(selector) { this._popup = document.querySelector(selector); }

  open() {
    // Откроем поп-ап, добавив к нему модификатор
    this._popup.classList.add(openClass);

    // Создаём обработчик нажатия Escape для закрытия текущего поп-апа
    document.addEventListener("keydown", this._handleEscClose.bind(this));

    this.setEventListeners();
    console.log("popup opened");
  }

  close() {
    // Удаляем класс видимости поп-апа
    this._popup.classList.remove(openClass);

    // Удаляем обработчик события, закрывающий поп-ап
    document.removeEventListener("keydown", this._handleEscClose.bind(this));
  }

  _handleEscClose(evt) {
    if (evt.key === "Escape") this.close();
  }

  setEventListeners() {
    // Закрытие по кнопке закрытия
    this._popup.querySelector(".popup__close-button").addEventListener("click", this.close.bind(this));

    // Закрытие по клику вне поп-апа
    this._popup.addEventListener("click", evt => {
      // Если мы кликаем на сам поп-ап, а не на вложенные в него элементы, он закроется
      if (evt.target === evt.currentTarget) this.close();
    });
  }
}

// Общий блок поведения поп-апов
// --------------------
// Слушатель Escape для закрытия открытого поп-апа
function popupEscapeListener(evt) {
  if (evt.key === "Escape") closePopup(document.querySelector(`.${openClass}`));
}

// Делаем заданный поп-ап видимым
function openPopup(popup) {
  
}

function closePopup(popup) {
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

  // closePopup(popupEdit);
}

export { openPopup, closePopup, openEditPopup, saveProfile };
