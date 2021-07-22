// Блок объявления переменных
// --------------------
// Поля формы
let form = document.querySelectorAll('.edit-form__text-field')

// Кнопка редактирования
let editButton = document.querySelector('.profile__edit-button')

// Кнопка закрытия поп-апа
let closeButton = document.querySelector('.popup__close-button')

// Кнопка сохранения профиля
let saveButton = document.querySelector('.edit-form__save-button')

// Получаем данные пользователя из профиля
let profileName = document.querySelector('.profile__name')
let profileDescription = document.querySelector('.profile__description')

// Блок запуска поп-апа
// --------------------
function togglePopup() {
  // Переключает видимость поп-апа с редактированием профиля
  let popup = document.querySelector('.popup')

  // Класс, которым мы будем манипулировать
  let target_class = 'popup_opened'

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
    form[0].value = profileName.textContent
    form[1].value = profileDescription.textContent
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
  profileName.textContent = form[0].value
  profileDescription.textContent = form[1].value

  console.log('profile saved')

  // Закрываем поп-ап
  togglePopup()
}

// Задаём действие кнопке сохранения
saveButton.addEventListener('click', saveProfile)
