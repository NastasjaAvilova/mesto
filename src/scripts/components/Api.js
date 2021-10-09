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

  getInitialCards() {
    return fetch(this._baseUrl + "cards", this._config).then((res) => {
      if (res.ok) {
        return res.json();
      }

      // если ошибка, отклоняем промис
      return Promise.reject(`Ошибка: ${res.status}`);
    });
  }
}

// другие методы работы с API
