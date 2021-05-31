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
    userInfo,
    cardSelector,
    editAvatarBtn,
    popupAvatar,
    popupDeleteImg,
    validatingInputForAvatar,
    avatarInput,
    deleteImgBtn,
} from '../utils/constants.js';
import Section from "../components/Section.js";
import Card  from '../components/Card.js';
import PopupWithForm from "../components/PopupWithForm.js";
import './index.css';
import Api from "../components/Api.js";

let user = null

const api = new Api({
    cohort: 'cohort-24',
    headers: {
        authorization: '0970556a-6f94-4e95-aaf4-193fd780acec',
        'Content-Type': 'application/json'
    }
});

Promise.all([
    api.getUserInfo(),
    api.getInitialCards()])
    .then(([info, cards]) => {
    setInitialUserData(info);
    renderInitialCards(cards);
    user = info.data
});

//помещает инфо профиля
function setInitialUserData(userData) {
    userInfo.setUserInfo(userData);
    userInfo.setUserAvatar(userData);
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
        popupWithUserForm.infoAboutLoading(true, 'Сохранение...');
        api.updateUserInfo({
            name: dataFromPopup.name,
            about: dataFromPopup.about,
        })
            .then((dataFromServer) => {
                setInitialUserData(dataFromServer);
            })
        popupWithUserForm.infoAboutLoading(false);
        popupWithUserForm.close();
    });
popupWithUserForm.setEventListeners();

//добавляет новые карточки
const popupWithAddCardForm  = new PopupWithForm(
    popupCreate, () => {
        api.addNewCard({
            name: cardNameInput.value,
            link: cardImgInput.value,
        })
            .then((cardData)=>{
                cardsList.addItem(cardData);
            })
        popupWithAddCardForm.close();
        location.reload();
    })
popupWithAddCardForm.setEventListeners();

//попап изменения аватара
const popupWithAvatar = new PopupWithForm(
    popupAvatar, (avatar) => {
        api.addNewAvatar({
            avatar: avatar.avatar
        })
            .then(() =>{
                userInfo.setUserAvatar({avatar: avatarInput.value});
            })
        popupWithAvatar.close();
    })
popupWithAvatar.setEventListeners();

//функция создание карточки
function createCard(cardData){
    validatingInputsForCards.disableSubmitButton();
    const cardElement = new Card({...cardData, cardData}, cardSelector,
        () => { popupWithImg.open(cardData)},
        () => {
            api.deleteCard(cardElement.getId())
                .then(()=> cardElement.remove())
                .catch(() => console.log('ошибка при удалении'))
                .finally(()=> console.log('ok'))
        });
    return cardElement.generateCard();
}
popupWithImg.setEventListeners();

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

});

