import { FormValidator } from '../components/formValidator.js';
import Popup from "../components/popup.js";

//КАРТОЧКИ
export const initialCards = [
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

export const validationConfig = {
    formSelector: '.input',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__submit-button',
    inactiveButtonClass: 'popup__submit-button_disabled',
    inputErrorClass: 'popup__input-error',
    errorClass: 'popup__input-error_visible',
};

//ПОПАПЫ
export const popupProfile = document.querySelector('.popup_type_edit-profile');
export const popupCreate = document.querySelector('.popup_type_add-card');
export const popupImg = document.querySelector('.popup_type_show-image');

//ФОРМА РЕДАКТИРОВАНИЯ ПРОФИЛЯ
export const openPopupProfileBtn = document.querySelector('.profile__edit-button');
export const formElement = document.querySelector('.input_type_edit-profile');
export const nameInput = formElement.querySelector('.popup__input_text_name');
export const jobInput = formElement.querySelector('.popup__input_text_job');


//СОЗДАНИЕ НОВЫХ КАРТОЧЕК
export const elementContainer = document.querySelector('.elements');
export const createCardBtn = document.querySelector('.profile__add-button');

//Инпуты
export const cardNameInput = document.querySelector('.popup__input_place_name');
export const cardImgInput = document.querySelector('.popup__input_place_link');
export const inputCreateForm = document.querySelector('.input_type_add-card');

export const validatingInputsForEditProfile = new FormValidator(validationConfig, formElement);
export const validatingInputsForCards = new FormValidator(validationConfig, inputCreateForm);

export const popupCreateClass = new Popup(popupCreate);
export const popupProfileClass = new Popup(popupProfile);
