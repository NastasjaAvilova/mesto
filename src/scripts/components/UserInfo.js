export default class UserInfo {
  constructor({ nameSelector, descriptionSelector, avatarSelector }) {
    this._name = document.querySelector(nameSelector);
    this._description = document.querySelector(descriptionSelector);
    this._avatar = document.querySelector(avatarSelector);
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
    console.log(this._avatar.style.backgroundImage);
  }
}
