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
    // Кнопка лайка
    this._likeButton = this._card.querySelector(".elements__like");
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
    this._image.addEventListener("click", () =>
      this._cardClickHandler({
        link: this._image.src,
        name: this._image.alt,
      })
    );
    // Удаление
    this._card
      .querySelector(".elements__trash")
      .addEventListener("click", () => this._removeElement());
    // Лайк
    this._likeButton.addEventListener("click", () => this._toggleLike());
  }

  _toggleLike() {
    // Найти лайк в нашей карточке и переключить класс elements__like_active
    this._likeButton.classList.toggle("elements__like_active");
  }

  _removeElement() {
    // Удаляет карточку
    this._card.remove();
    console.log("card removed");
  }

  createCard() {
    return this._card;
  }
}
