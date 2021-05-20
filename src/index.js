import {popupCreateClass, popupProfileClass, validatingInputsForEditProfile, validatingInputsForCards, initialCards, popupProfile, popupCreate, openPopupProfileBtn, nameInput, jobInput, createCardBtn, elementContainer, cardImgInput, cardNameInput, popupImg} from './utils/constants.js';
import Section from "./components/section.js";
import Card  from './components/card.js';
import PopupWithImage from "./components/popupWithImage.js";
import PopupWithForm from "./components/popupWithForm.js";
import UserInfo from "./components/userInfo.js";
import './pages/index.css';
//функция создание карточки
function createCard(cardData){
    const cardElement = new Card(cardData, () => {
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
cardsList.renderItems()

//добавляет новые карточки
const addCardWithForm  = new PopupWithForm(popupCreate,() => {
        const cardElement = createCard({name: cardNameInput.value, link: cardImgInput.value});
        cardsList.addItem(cardElement);
        addCardWithForm.close();
})
addCardWithForm.setEventListeners()

const userInfo = new UserInfo('.profile__name', '.profile__job');

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
    popupProfileClass.close();
});
popupUserForm.setEventListeners();

//кнопка редактирования профиля 
openPopupProfileBtn.addEventListener('click', ()=> {
    handlePopupEditProfile();
    validatingInputsForEditProfile.enableValidation();
});

//кнопка создания карточки 
createCardBtn.addEventListener('click', () => {
    popupCreateClass.open();
    validatingInputsForCards.enableValidation();
});


