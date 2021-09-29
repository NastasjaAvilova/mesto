import { openPopup } from "./Popup.js";

// Создайте класс Card, который создаёт карточку с текстом и ссылкой на изображение:
export default class Card {
  // принимает в конструктор её данные и селектор её template-элемента;
  constructor(data, templateIdSelector, handleCardClick) {
    // Находим в DOM шаблон с заданным селектором и клонируем его в объект
    this._card = document
      .querySelector(templateIdSelector)
      .content.querySelector(".elements__card")
      .cloneNode(true);
    // Делаем ссылку на картинку для удобства
    this._image = this._card.querySelector(".elements__image");
    // Запоминаем коллбэк для клика по карточке
    this._cardClickHandler = handleCardClick;

    // Вызываем приватные методы
    this._fillCard(data);
    this._setEventListeners();
  }

  _fillCard({ name, link }) {
    // Задаём новое наполнение
    this._card.querySelector(".elements__title").textContent = name;
    this._image.setAttribute("src", link); // img src
    this._image.setAttribute("alt", name);
  }

  _setEventListeners() {
    // Навешиваем обработчики событий
    // Действие при клике
    this._image.addEventListener("click", () => this._cardClickHandler());
    // Удаление
    this._card
      .querySelector(".elements__trash")
      .addEventListener("click", () => this._removeElement());
    // Лайк
    this._card
      .querySelector(".elements__like")
      .addEventListener("click", () => this._toggleLike());
  }

  _toggleLike() {
    // Найти лайк в нашей карточке и переключить класс elements__like_active
    this._card
      .querySelector(".elements__like")
      .classList.toggle("elements__like_active");
  }

  _removeElement() {
    // Удаляет карточку
    this._card.remove();
    console.log("card removed");
  }

  // _makeImageBig() {
  //   // возьмём картинку в попапе
  //   // зададим ей те же атрибуты, что и у нашей картинки
  //   popupImage.src = this._image.src;
  //   popupImage.alt = this._image.alt;

  //   // зададим текст такой же, как в карточке
  //   popupView.querySelector(".popup__view-title").textContent = this._image.alt;

  //   // откроем попап с картинкой
  //   openPopup(popupView);
  // }

  createCard() {
    return this._card;
  }
}
