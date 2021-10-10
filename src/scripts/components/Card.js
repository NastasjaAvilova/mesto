// Создайте класс Card, который создаёт карточку с текстом и ссылкой на изображение:
export default class Card {
  // принимает в конструктор её данные и селектор её template-элемента;
  constructor(
    data,
    templateIdSelector,
    handleCardClick,
    handleDelete,
    likeCallback
  ) {
    this._id = data._id;
    // Находим в DOM шаблон с заданным селектором и клонируем его в объект
    this._card = document
      .querySelector(templateIdSelector)
      .content.querySelector(".elements__card")
      .cloneNode(true);
    // Делаем ссылку на картинку для удобства
    this._image = this._card.querySelector(".elements__image");
    // Кнопка лайка
    this._likeButton = this._card.querySelector(".elements__like");
    // Счётчик лайков
    this._likeCounter = this._card.querySelector(".elements__like-counter");
    // Запоминаем коллбэк для клика по карточке
    this._cardClickHandler = handleCardClick;
    // Коллбэк удаления
    this._deleteHandler = handleDelete;
    // Коллбэк лайка
    this._likeCallback = likeCallback;

    // Вызываем приватные методы
    this._fillCard(data);
    this._setEventListeners();
  }

  _fillCard({ name, link, likes }) {
    // Задаём первичное наполнение
    this._card.querySelector(".elements__title").textContent = name;
    this._image.setAttribute("src", link); // img src
    this._image.setAttribute("alt", name);
    this._likeCounter.textContent = likes ? likes.length : 0;
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
      .addEventListener("click", () => {
        this._deleteHandler(this._getCardInfo());
      });
    // Лайк
    this._likeButton.addEventListener("click", () => {
      this._likeCallback(this._getCardInfo());
    });
  }

  setLikeState(liked = true) {
    // Найти лайк в нашей карточке и переключить класс elements__like_active
    liked
      ? this._likeButton.classList.add("elements__like_active")
      : this._likeButton.classList.remove("elements__like_active");
  }

  createCard() {
    return this._card;
  }

  _getCardInfo() {
    return { id: this._id, cardElement: this._card };
  }
}
