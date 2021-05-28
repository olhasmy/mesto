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
} from '../utils/constants.js';
import Section from "../components/Section.js";
import Card  from '../components/Card.js';
import PopupWithForm from "../components/PopupWithForm.js";
import UserInfo from "../components/UserInfo.js";
import './index.css';

//функция создание карточки
function createCard(cardData){
    //проверяет инпуты на валидность
    validatingInputsForCards.disableSubmitButton();
    //если валидны - создает элемент(карточку)
    const cardElement = new Card(cardData, cardSelector,() => {
        //вешает на каждую обработчик клика - открытие попапа с картинкой при клике
        popupWithImg.open(cardData);
    });
    //возвращает карточку
    return cardElement.generateCard();
}
//вешаем слушатели на попап с картинкой (чтоб можно было закрыть)
popupWithImg.setEventListeners();

//помещает карточки из списка
const cardsList = new Section({
    //берет список карточек
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

const userInfo = new UserInfo(profileName, profileJob, profileAvatar);

//помещение информации в попап профиля
function handlePopupEditProfile(){
    const userData = userInfo.getUserInfo();
    nameInput.value = userData.name;
    jobInput.value = userData.job;
    const userAvatar = userInfo.getUserAvatar();
    avatarInput.value = userAvatar.avatar;
    popupUserForm.open();
}

//помещает информацию в попап аватара
function handlePopupEditAvatar(){
    const userAvatar = userInfo.getUserAvatar();
    avatarInput.value = userAvatar.avatar;
    popupWithAvatar.open();
}

//изменение информации на странице 
const popupUserForm = new PopupWithForm(popupProfile,() => {
    userInfo.setUserInfo({name: nameInput.value,job: jobInput.value});
    popupUserForm.close();
});
popupUserForm.setEventListeners();

//изменеие аватара
const popupWithAvatar = new PopupWithForm(popupAvatar, () => {
    userInfo.setUserAvatar({avatar: avatarInput.value})
    popupWithAvatar.close();
})
popupWithAvatar.setEventListeners();

//удаление карточки
const popupWithFormDelete = new PopupWithForm(popupDeleteImg, ()=>{
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
    addCardWithForm.open();
});

//кнопка редактирования аватара
editAvatarBtn.addEventListener('click', () => {
    validatingInputForAvatar.removeErrors();
    handlePopupEditAvatar();
});
/*
//кнопка открытия попапа удаления карточки
elementTrashBtn.addEventListener('click', () => {
    popupWithFormDelete.open();
    console.log('bghnjk')
});*/