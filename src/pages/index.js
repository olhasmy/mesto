import {
    validatingInputsForEditProfile,
    validatingInputsForCards,
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
    deleteImgBtn,
} from '../utils/constants.js';
import Section from "../components/Section.js";
import Card  from '../components/Card.js';
import PopupWithForm from "../components/PopupWithForm.js";
import UserInfo from "../components/UserInfo.js";
import './index.css';
import Api from "../components/Api.js";


const api = new Api({
    cohort: 'cohort-24',
    headers: {
        authorization: '0970556a-6f94-4e95-aaf4-193fd780acec',
        'Content-Type': 'application/json'
    }
});

Promise.all([
    api.getUserInfo(),
    api.getInitialCards(),
]).then(([info, cards,userAvatar]) => {
    setInitialUserData(info);
    renderInitialCards(cards);
    setInitialUserAvatar(userAvatar);
});

//помещает инфо профиля
function setInitialUserData(userData) {
    userInfo.setUserInfo({
        name: userData.name,
        about: userData.about
    })
}

function setInitialUserAvatar(userAvatar) {
    userInfo.setUserAvatar(
        profileAvatar.setAttribute('src', `${userAvatar.avatar}`)
    )
}

//помещает карточки из списка
const cardsList = new Section({
    renderer: (cardData) => {
        const cardElement = createCard(cardData);
        cardsList.addItem(cardElement);
    }
}, elementContainer)

//помещает карточки
function renderInitialCards(cards) {
    cardsList.renderItems(cards);
}

//попап изменения информации на странице
const popupWithUserForm = new PopupWithForm(
    popupProfile,(dataFromPopup) => {
        popupWithUserForm.infoAboutLoading(true);
        api.updateUserInfo({
            name: dataFromPopup.name,
            about: dataFromPopup.about,
        }).then((dataFromServer) => {
            setInitialUserData(dataFromServer)
        })
        popupWithUserForm.infoAboutLoading(false);
        popupWithUserForm.close();
    });
popupWithUserForm.setEventListeners();

//добавляет новые карточки
const popupWithAddCardForm  = new PopupWithForm(
    popupCreate, () => {
        popupWithUserForm.infoAboutLoading(true);
        api.addNewCard({
            name: cardNameInput.value,
            link: cardImgInput.value
        })
            .then((cardData)=>{
                cardsList.addItem(cardData);
                popupWithUserForm.infoAboutLoading(false);
                popupWithAddCardForm.close();
                location.reload();
            })
    })
popupWithAddCardForm.setEventListeners();

//попап изменения аватара
const popupWithAvatar = new PopupWithForm(
    popupAvatar, () => {
        popupWithUserForm.infoAboutLoading(true);
        api.addNewAvatar({
            avatar: avatarInput.value
        })
            .then((userAvatar) =>{
                userInfo.setUserAvatar(profileAvatar.setAttribute('src', `${userAvatar.avatar}`));
                popupWithUserForm.infoAboutLoading(false);
                popupWithAvatar.close();
            })
    })
popupWithAvatar.setEventListeners();

//функция создание карточки
function createCard(cardData){
    validatingInputsForCards.disableSubmitButton();
    const cardElement = new Card(cardData, cardSelector, () => {
        popupWithImg.open(cardData);
    });
    return cardElement.generateCard();
}
popupWithImg.setEventListeners();


const userInfo = new UserInfo(profileName, profileJob, profileAvatar);

//помещение информации в попап профиля
function handlePopupEditProfile(){
    const userData = userInfo.getUserInfo();
    nameInput.value = userData.name;
    jobInput.value = userData.about;
    popupWithUserForm.open();
}

//помещает информацию в попап аватара
function handlePopupEditAvatar(){
    const userAvatar = userInfo.getUserAvatar();
    avatarInput.value = userAvatar.avatar;
    popupWithAvatar.open();
}

/*
//попап удаления карточки
export const popupWithFormDelete = new PopupWithForm(popupDeleteImg, ()=>{
    popupWithFormDelete.open();
});
popupWithFormDelete.setEventListeners();
*/
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

