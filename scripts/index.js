// Блок объявления переменных
// --------------------
// Поля формы
let inputName = document.querySelector('[name="input_name"]')
let inputDescription = document.querySelector('[name="input_description"]')
let placeName = document.querySelector('[name="place_name"]')
let placeLink = document.querySelector('[name="place_link"]')

// Кнопка редактирования
let editButton = document.querySelector('.profile__edit-button')

// Кнопка закрытия поп-апа
let closeButtons = document.querySelectorAll('.popup__close-button')

// Кнопка добавления картинки
let addButton = document.querySelector('.profile__add-button')

// Форма редактирования профиля
let profileEditForm = document.querySelector('[name="profile-edit-form"]')
// 
const cardAddForm = document.querySelector('[name="card-add-form"]')

// Получаем данные пользователя из профиля
let profileName = document.querySelector('.profile__name')
let profileDescription = document.querySelector('.profile__description')

// Задаём переменную для поп-апа редактировния
let popupEdit = document.querySelector('#popup_edit')
// Задаём переменную для поп-апа добавления
let popupAdd = document.querySelector('#popup_add')

// даём имя попапу для просмотра картинок
const popupView = document.querySelector('#popup_view')

// Зададим класс для всех поп-апов, чтобы обращаться ко всем сразу
const allPopups = document.querySelectorAll('.popup')

// И для правила когда он открыт
let openClass = 'popup_opened'

// Общий блок поведения поп-апов
// --------------------
  // Переключает видимость заданного поп-апа
function openPopup(popup) {
  // Откроем поп-ап, добавив к нему модификатор
  popup.classList.add(openClass)
  console.log('popup opened')
}

// Блок поп-апа профиля
// --------------------
// Открывает поп-ап редактирования профиля
function openEditPopup() {
// Открываем попап
openPopup(popupEdit)

// Подтягиваем данные профиля в форму
inputName.value = profileName.textContent
inputDescription.value = profileDescription.textContent
}
// Сохраняем профиль
function saveProfile(evt) {
  // Останавливаем стандартный submit
  evt.preventDefault()

  // Присваиваем профилю значения из формы
  profileName.textContent = inputName.value
  profileDescription.textContent = inputDescription.value

  console.log('profile saved')

  closeParentPopup(evt)
}

// Что будет, когда мы нажимаем кнопки
editButton.addEventListener('click', openEditPopup)
// Задаём действие кнопке сохранения
profileEditForm.addEventListener('submit', saveProfile)


function closeParentPopup(evt) {
  // Берём нажатую кнопку и закрываем её родительский поп-ап
  evt.target.closest('.popup').classList.remove('popup_opened')
}

// Всем кнопкам закрытия задаём действие закрытия
document.querySelectorAll('.popup__close-button').forEach(button => {
  button.addEventListener('click', closeParentPopup)})


const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];

cards = document.querySelector('.elements')

function deleteCard(evt) {
  card = evt.target.closest('.elements__card') // parent
  cards.removeChild(card)
  console.log('card removed')
}

//функция для клика по картинке

function makeImageBig(evt) {

  // возьмём картинку в попапе
const popupImage = popupView.querySelector('.popup__image') 
  // зададим ей те же атрибуты, что и у картинки, по которой мы кликнули
popupImage.setAttribute('src', evt.target.getAttribute('src')) 
popupImage.setAttribute('alt', evt.target.getAttribute('alt')) 
popupView.querySelector('.popup__view-title').textContent = evt.target.getAttribute('alt')

  // зададим текст такой же, как в карточке

  // откроем попап с картинкой
  openPopup(popupView)
}

function createCard(data) {
  // Находим шаблон
  const card_template = document.querySelector('#card').content;
  // Клонируем его
  const card = card_template.querySelector('.elements__card').cloneNode(true)
  
  // Задаём новое наполнение
  card.querySelector('.elements__title').textContent = data.name
  card.querySelector('.elements__image').setAttribute('src', data.link) // img src
  card.querySelector('.elements__image').setAttribute('alt', data.name)

  card.querySelector('.elements__image').addEventListener('click', makeImageBig)

  // buttons
  card.querySelector('.elements__trash').addEventListener('click', deleteCard)
  card.querySelector('.elements__like').addEventListener('click', evt => {
    evt.target.classList.toggle('elements__like_active')
  })
  cards.prepend(card)
  console.log('card added')
}

initialCards.forEach(cardData => createCard(cardData))



addCardNameField = popupAdd.querySelector('[name="place_name"]')
addCardLinkField = popupAdd.querySelector('[name="place_link"]')
// Блок поп-апа добавления картинки
// --------------------
function openAddPopup() {
  openPopup(popupAdd)
}

addButton.onclick = openAddPopup

function addCardFromPopup(evt) {
  evt.preventDefault()

  // Присваиваем профилю значения из формы
  cardData = {name: addCardNameField.value, link: addCardLinkField.value}

  createCard(cardData)

  console.log('card added')

  closeParentPopup(evt)
}

cardAddForm.addEventListener('submit', addCardFromPopup)
