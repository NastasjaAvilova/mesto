// Блок объявления переменных
// --------------------
// Поля формы
let inputName = document.querySelector('[name="input_name"]')
let inputDescription = document.querySelector('[name="input_description"]')

// Кнопка редактирования
let editButton = document.querySelector('.profile__edit-button')

// Кнопка закрытия поп-апа
let closeButton = document.querySelector('.popup__close-button')

// Форма редактирования профиля
let form = document.querySelector('.form')

// Получаем данные пользователя из профиля
let profileName = document.querySelector('.profile__name')
let profileDescription = document.querySelector('.profile__description')

// Задаём переменную для поп-апа
let popup = document.querySelector('.popup')

// И для правила когда он открыт
let target_class = 'popup_opened'

// Блок запуска поп-апа
// --------------------
  // Переключает видимость поп-апа с редактированием профиля
function togglePopup() {
  
  // Если в поп-апе уже есть нужный класс,
  if (popup.classList.contains(target_class)) {
    // Мы его отключаем
    popup.classList.remove(target_class)
    console.log('popup closed')
  } else {
    // Иначе откроем поп-ап, добавив к нему модификатор
    popup.classList.add(target_class)
    console.log('popup opened')

    // Подтягиваем данные профиля в форму
    inputName.value = profileName.textContent
    inputDescription.value = profileDescription.textContent
  }

}

// Задаём одинаковое действие при клике на кнопки редактирования и закрытия поп-апа
editButton.onclick = togglePopup
closeButton.onclick = togglePopup

// Блок сохранения профиля
// --------------------
function saveProfile(evt) {
  // Останавливаем стандартный submit
  evt.preventDefault()

  // Присваиваем профилю значения из формы
  profileName.textContent = inputName.value
  profileDescription.textContent = inputDescription.value

  console.log('profile saved')

  // Закрываем поп-ап
  togglePopup()
}

// Задаём действие кнопке сохранения
form.addEventListener('submit', saveProfile)
