export default class Api {
  constructor(options) {
    // тело конструктора
    this._baseUrl = options.baseUrl;
    this._headers = options.headers;
    this._config = options;
    console.log("i am api. my config is", this._config);
  }

  static checkResponse(res) {
    if (res.ok) {
      return res.json();
    }

    // если ошибка, отклоняем промис
    return Promise.reject(`Ошибка: ${res.status}`);
  }

  getUserInfo() {
    // Получает данные пользователя от API
    return fetch(this._baseUrl + "users/me", this._config).then((res) => {
      if (res.ok) {
        return res.json();
      }

      // если ошибка, отклоняем промис
      return Promise.reject(`Ошибка: ${res.status}`);
    });
  }

  //Создаём метод для добавление карточек с сервера
  getInitialCards() {
    // Получает данные карточек от API
    return fetch(this._baseUrl + "cards", this._config).then((res) => {
      if (res.ok) {
        return res.json();
      }

      // если ошибка, отклоняем промис
      return Promise.reject(`Ошибка: ${res.status}`);
    });
  }

  // Обновляет данные пользователя на сервере
  setUserInfo({ name, about }) {
    // Отправляем PATCH-запрос с новыми данными
    return fetch(
      //Обращаемя к базовому URL и прибавляем адрес
      this._baseUrl + "users/me/",
      Object.assign(this._config, {
        method: "PATCH",
        // Из JS-объекта делаем json-строку
        body: JSON.stringify({
          name: name,
          about: about,
        }),
      })
      // И если запрос успешно выполнился возвращаем json promise
    ).then((res) => {
      console.log("response is", res);
      if (res.ok) {
        return res.json();
      }

      // если ошибка, отклоняем промис
      return Promise.reject(`Ошибка: ${res.status}`);
    });
  }

  addCard({ name, link }) {
    // Добавляем на сервер новую карточку
    return fetch(
      this._baseUrl + "cards",
      Object.assign(this._config, {
        method: "POST",
        // Из JS-объекта делаем json-строку
        body: JSON.stringify({
          name: name,
          link: link,
        }),
      })
    )
      .then((res) => {
        console.log("response is", res);
        if (res.ok) {
          return res.json();
        }

        // если ошибка, отклоняем промис
        return Promise.reject(`Ошибка: ${res.status}`);
      })
      .catch((res) => console.log(res));
  }

  deleteCard(id) {
    // Отправляем DELETE-запрос
    return fetch(
      //Обращаемя к базовому URL и прибавляем адрес и id удаляемой карточки
      this._baseUrl + "cards/" + id,
      Object.assign(this._config, {
        method: "DELETE",
      })
      // И если запрос успешно выполнился возвращаем json promise
    ).then(Api.checkResponse);
  }

  likeCard(id, like = true) {
    return fetch(
      //Обращаемя к базовому URL и прибавляем адрес и id удаляемой карточки
      this._baseUrl + "cards/likes/" + id,
      Object.assign(this._config, {
        method: like ? "PUT" : "DELETE",
      })
    ).then(Api.checkResponse);
  }
}

// другие методы работы с API
