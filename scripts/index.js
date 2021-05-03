import { Card } from './card.js';
import { FormValidator } from './formValidator.js';
import { validationConfig } from './validationConfig.js';
import { initialCards } from './initial-сards.js';

//ПОПАПЫ
const popupProfile = document.querySelector('.popup_type_edit-profile');
const popupCreate = document.querySelector('.popup_type_add-card');
export const popupImg = document.querySelector('.popup_type_show-image');

//КНОПКИ ЗАКРТЫИЯ ФОРМ
const popupProfileClose = document.querySelector('.form__close-icon_for_profile');
const popupEditClose = document.querySelector('.form__close-icon_for_edit');

//ФОРМА РЕДАКТИРОВАНИЯ ПРОФИЛЯ
const openPopupProfileBtn = document.querySelector('.profile__edit-button');
const formElement = document.querySelector('.input_type_edit-profile');
const nameInput = formElement.querySelector('.popup__input_text_name');
const jobInput = formElement.querySelector('.popup__input_text_job');
const profName = document.querySelector('.profile__name');
const profJob = document.querySelector('.profile__job');

//СОЗДАНИЕ НОВЫХ КАРТОЧЕК
const elementContainer = document.querySelector('.elements');
const createCardBtn = document.querySelector('.profile__add-button');
const addCardBtn = document.querySelector('.popup__submit-button_create');

//Слой
const popupOverlay = document.querySelectorAll('.overlay');

//Инпуты
const cardNameInput = document.querySelector('.popup__input_place_name');
const cardImgInput = document.querySelector('.popup__input_place_link');
const inputCreateForm = document.querySelector('.input_type_add-card');

//Функция закрытия по ESC
function closeEsc(e) {
    if (e.key === 'Escape') {
        closePopup(popupProfile);
        closePopup(popupCreate);
        closePopup(popupImg);
    }
}

//Закрытие при нажатии вне формы. Слой
popupOverlay.forEach(function (close) {
    close.addEventListener('click', function (e) {
        e.preventDefault();
        closePopup(popupProfile);
        closePopup(popupCreate);
        closePopup(popupImg);
    });
});

//Открытие попапа
export function openPopup(popup) {
    popup.classList.add('popup_visible');
    document.addEventListener('keydown', closeEsc);
}

//Закрытие попапа
export function closePopup(popup) {
    popup.classList.remove('popup_visible');
    document.removeEventListener('keydown', closeEsc);
}

//Редактирование профиля
function formSubmitHandlerProfile (evt) {
    evt.preventDefault();
    profName.textContent = nameInput.value;
    profJob.textContent = jobInput.value;
    closePopup(popupProfile);
}

//Создание новых карточек
function createCardSubmit(){
    const card = new Card({name: cardNameInput.value, link: cardImgInput.value});
    elementContainer.prepend(card.render());
    inputCreateForm.reset();
    addCardBtn.disabled = true;
    closePopup(popupCreate);
}

//Помещение карточек
initialCards.forEach(cardData => {
    const card = new Card(cardData);
    elementContainer.append(card.render())
});

//Подключение валидации
const validating = new FormValidator(validationConfig);
validating.enableValidation(validationConfig);

createCardBtn.addEventListener('click', function (){
    openPopup(popupCreate);
    addCardBtn.classList.add(validationConfig.inactiveButtonClass);
});

addCardBtn.addEventListener('click', createCardSubmit);

openPopupProfileBtn.addEventListener('click', function (){openPopup(popupProfile);});
formElement.addEventListener('submit', formSubmitHandlerProfile);

popupProfileClose.addEventListener('click', function (){closePopup(popupProfile);});
popupEditClose.addEventListener('click', function (){closePopup(popupCreate);});