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
    profileJob,
    editAvatarBtn,
    popupAvatar,
    popupDeleteImg,
    validatingInputForAvatar,
    profileAvatar,
    avatarInput,
    deleteImgBtn
} from '../utils/constants.js';
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
popupWithImg.setEventListeners();

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
const popupWithAddCardForm  = new PopupWithForm(popupCreate,() => {
        const cardElement = createCard({name: cardNameInput.value, link: cardImgInput.value});
        cardsList.addItem(cardElement);
        popupWithAddCardForm.close();
})
popupWithAddCardForm.setEventListeners();

const userInfo = new UserInfo(profileName, profileJob, profileAvatar);

//помещение информации в попап профиля
function handlePopupEditProfile(){
    const userData = userInfo.getUserInfo();
    nameInput.value = userData.name;
    jobInput.value = userData.job;
    popupWithUserForm.open();
}

//помещает информацию в попап аватара
function handlePopupEditAvatar(){
    const userAvatar = userInfo.getUserAvatar();
    avatarInput.value = userAvatar.avatar;
    popupWithAvatar.open();
}

//попап изменения информации на странице
const popupWithUserForm = new PopupWithForm(popupProfile,() => {
    userInfo.setUserInfo({name: nameInput.value,job: jobInput.value});
    popupWithUserForm.close();
});
popupWithUserForm.setEventListeners();

//попап изменения аватара
const popupWithAvatar = new PopupWithForm(popupAvatar, () => {
    userInfo.setUserAvatar({avatar: avatarInput.value})
    popupWithAvatar.close();
})
popupWithAvatar.setEventListeners();

//попап удаления карточки
export const popupWithFormDelete = new PopupWithForm(popupDeleteImg, ()=>{
    popupWithFormDelete.open();
});
popupWithFormDelete.setEventListeners();

//валидации инпутов
validatingInputsForEditProfile.enableValidation();
validatingInputsForCards.enableValidation();
validatingInputForAvatar.enableValidation();

//кнопка редактирования профиля
openPopupProfileBtn.addEventListener('click', ()=> {
    validatingInputsForEditProfile.removeErrors();
    handlePopupEditProfile();
});

//кнопка создания карточки
createCardBtn.addEventListener('click', () => {
    validatingInputsForCards.removeErrors();
    popupWithAddCardForm.open();
});

//кнопка редактирования аватара
editAvatarBtn.addEventListener('click', () => {
    validatingInputForAvatar.removeErrors();
    handlePopupEditAvatar();
});

//кнопка удаления карточки
deleteImgBtn.addEventListener('click', () => {
    popupWithFormDelete.close();
});


