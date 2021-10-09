export default class Api {
  constructor(options) {
    // тело конструктора
    this._baseUrl = options.baseUrl;
    this._headers = options.headers;
    this._config = options;
    console.log("i am api. my config is", this._config);
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
}

// другие методы работы с API
