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
    popupImg,
    profileName,
    profileJob
} from '../utils/constants.js';
import Section from "../components/Section.js";
import Card  from '../components/Card.js';
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from "../components/PopupWithForm.js";
import UserInfo from "../components/UserInfo.js";
import './index.css';

//функция создание карточки
function createCard(cardData){
    const cardElement = new Card(cardData, '.element',() => {
        const popupWithImg = new PopupWithImage(popupImg);
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
cardsList.renderItems();

//добавляет новые карточки
const addCardWithForm  = new PopupWithForm(popupCreate,() => {
        const card= createCard({name: cardNameInput.value, link: cardImgInput.value});
        cardsList.addItem(card);
        addCardWithForm.close();
});

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


//кнопка редактирования профиля 
openPopupProfileBtn.addEventListener('click', ()=> {
    validatingInputsForEditProfile.removeErrors();
    handlePopupEditProfile();
    validatingInputsForEditProfile.enableValidation();
});

//кнопка создания карточки 
createCardBtn.addEventListener('click', () => {
    validatingInputsForCards.removeErrors();
    addCardWithForm.open();
    validatingInputsForCards.enableValidation();
});


