import { validatingInputsForEditProfile, validatingInputsForCards, initialCards, popupProfile, popupCreate, popupImg, popupProfileClose, popupEditClose, openPopupProfileBtn, formElement, nameInput, jobInput, profJob, profName, popupImgClose, elementContainer, createCardBtn, addCardBtn, popupOverlayList, cardImgInput, cardNameInput, inputCreateForm} from './constants.js';
import { Card } from './card.js';

//Функция закрытия по ESC
function closeEsc(e) {
    if (e.key === 'Escape') {
        const openedPopup = document.querySelector('.popup_visible');
        closePopup(openedPopup);
    }
}

//Закрытие при нажатии вне формы. Слой
popupOverlayList.forEach(popupOverlay => {
    popupOverlay.addEventListener('click', (e) => {
        e.preventDefault();
        const openedPopup = popupOverlay.closest('.popup_visible');
        closePopup(openedPopup);
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
    elementContainer.prepend(createCard({name: cardNameInput.value, link: cardImgInput.value}));
    inputCreateForm.reset();
    closePopup(popupCreate);
    validatingInputsForCards.disableSubmitButton();
}

//Функция создание карточки
function createCard(cardData){
    const cardElement = new Card(cardData);
    return cardElement.render();
}

//Помещение карточек
initialCards.forEach((cardData)=> {
    elementContainer.prepend(createCard(cardData));
});

//Подключение валидации
//К инпутам профиля
validatingInputsForEditProfile.enableValidation();

//К инпутам карточек
validatingInputsForCards.enableValidation();


createCardBtn.addEventListener('click', () => {openPopup(popupCreate);});
addCardBtn.addEventListener('click', createCardSubmit);
popupImgClose.addEventListener('click', () => {closePopup(popupImg);});
openPopupProfileBtn.addEventListener('click', () => {openPopup(popupProfile);});
formElement.addEventListener('submit', formSubmitHandlerProfile);
popupProfileClose.addEventListener('click', () => {closePopup(popupProfile);});
popupEditClose.addEventListener('click', () => {closePopup(popupCreate);});