export default class UserInfo {
  constructor(
    { nameSelector, descriptionSelector, avatarSelector, avatarEditSelector },
    avatarEditAction
  ) {
    this._name = document.querySelector(nameSelector);
    this._description = document.querySelector(descriptionSelector);
    this._avatar = document.querySelector(avatarSelector);
    this._avatarEditElement = this._avatar.querySelector(avatarEditSelector);
    this._avatarEditAction = avatarEditAction;
  }

  getUserInfo() {
    return {
      name: this._name.textContent,
      description: this._description.textContent,
      id: this._id,
    };
  }

  setUserInfo({ name, description, id }) {
    this._name.textContent = name;
    this._description.textContent = description;
    this._id = id;
  }

  setAvatar(avatarUrl) {
    this._avatar.style.backgroundImage = `url('${avatarUrl}')`;
  }

  setEventListeners() {
    // Задаём обработчик нажатию на аватар
    this._avatarEditElement.addEventListener("click", this._avatarEditAction);
  }
}
