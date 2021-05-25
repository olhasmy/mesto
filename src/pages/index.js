import {
    validatingInputsForEditProfile,
    validatingInputsForCards,
    initialCards,
    popupProfile,
    popupCreate,
    openPopupProfileBtn,
    nameInput,
    jobInput,
    createCardBtn,
    elementContainer,
    cardImgInput,
    cardNameInput,
    popupWithImg,
    profileName,
    cardSelector,
    profileJob} from '../utils/constants.js';
import Section from "../components/Section.js";
import Card  from '../components/Card.js';
import PopupWithForm from "../components/PopupWithForm.js";
import UserInfo from "../components/UserInfo.js";
import './index.css';

//функция создание карточки
function createCard(cardData){
    validatingInputsForCards.disableSubmitButton();
    const cardElement = new Card(cardData, cardSelector,() => {
        popupWithImg.open(cardData);
    });
    return cardElement.generateCard();
}

//помещает карточки из списка
const cardsList = new Section({
    data: initialCards,
    renderer: (cardData) => {
        const cardElement = createCard(cardData);
        cardsList.addItem(cardElement);
    }
}, elementContainer)
cardsList.renderItems()

//добавляет новые карточки
const addCardWithForm  = new PopupWithForm(popupCreate,() => {
        const cardElement = createCard({name: cardNameInput.value, link: cardImgInput.value});
        cardsList.addItem(cardElement);
        addCardWithForm.close();
})
addCardWithForm.setEventListeners();

const userInfo = new UserInfo(profileName, profileJob);

//помещение информации в попап 
function handlePopupEditProfile(){
    const userData = userInfo.getUserInfo();
    nameInput.value = userData.name;
    jobInput.value = userData.job;
    popupUserForm.open();
}

//изменение информации на странице 
const popupUserForm = new PopupWithForm(popupProfile,() => {
    userInfo.setUserInfo({name: nameInput.value,job: jobInput.value});
    popupUserForm.close();
});
popupUserForm.setEventListeners();

validatingInputsForEditProfile.enableValidation();
validatingInputsForCards.enableValidation();

//кнопка редактирования профиля
openPopupProfileBtn.addEventListener('click', ()=> {
    validatingInputsForEditProfile.removeErrors();
    handlePopupEditProfile();
});

//кнопка создания карточки
createCardBtn.addEventListener('click', () => {
    validatingInputsForCards.removeErrors();
    addCardWithForm.open();
});
