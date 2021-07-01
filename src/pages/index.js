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



const api = new Api({
    cohort: 'cohort-24',
    headers: {
        authorization: '0970556a-6f94-4e95-aaf4-193fd780acec',
        'Content-Type': 'application/json'
    }
});

let userId;

Promise.all([
    api.getUserInfo(),
    api.getInitialCards(),
]).then(([info, cards]) => {
    userId = info._id;
    setInitialUserData(info);
    renderInitialCards(cards);
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
    popupProfile,(data) => {
        popupWithUserForm.infoAboutLoading(true, 'Сохранение...');
        api.updateUserInfo({
            name: data.name,
            about: data.about,
        })
            .then((data) => {
                setInitialUserData(data);
            })
        popupWithUserForm.infoAboutLoading(false);
        popupWithUserForm.close();
    });
popupWithUserForm.setEventListeners();

//добавляет новые карточки
const popupWithAddCardForm  = new PopupWithForm(
    popupCreate, (cardData) => {
        api.addNewCard({
            name: cardData.name,
            link: cardData.link,
        })
            .then((cardData)=>{
                cardsList.addItem(cardData);
                popupWithAddCardForm.close();
            })
    })
popupWithAddCardForm.setEventListeners();

//попап изменения аватара
const popupWithAvatar = new PopupWithForm(
    popupAvatar, (avatar) => {
        api.addNewAvatar({
            avatar: avatar.avatar
        })
            .then((avatar) =>{
                userInfo.setUserAvatar(avatar);
            })
        popupWithAvatar.close();
    })
popupWithAvatar.setEventListeners();


function likeCard(card){
    api.setLike(card.getId(),card.getIsLiked())
        .then(res => {
            card.updateLikesInfo(res.likes)
        })
}

//функция создание карточки
function createCard(cardData){
    validatingInputsForCards.disableSubmitButton();
    const cardElement = new Card(cardData, cardSelector, userId,
        () => {
        popupWithImg.open(cardData)
        },
        () => {
        api.deleteCard(cardElement.getId())
            .then(() => cardElement.deleteCard())
            .catch((e) => console.log(`ошибка при удалении данных: ${e}`))
            .finally(()=> console.log('ok'))
        },
        likeCard);
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
    popupWithFormDelete.close();
});
