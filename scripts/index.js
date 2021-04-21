//ПОПАПЫ
const popupProfile = document.querySelector('.popup_type_edit-profile');
const popupCreate = document.querySelector('.popup_type_add-card');
const popupImg = document.querySelector('.popup_type_show-image');

//КНОПКИ ЗАКРТЫИЯ ФОРМ
const popupProfileClose = document.querySelector('.form__close-icon_for_profile');
const popupEditClose = document.querySelector('.form__close-icon_for_edit');
const popupImgClose = document.querySelector('.form__close-icon_for_img');

//ФОРМА РЕДАКТИРОВАНИЯ ПРОФИЛЯ
const openPopupProfileBtn = document.querySelector('.profile__edit-button');
const formElement = document.querySelector('.input_type_edit-profile');
const nameInput = formElement.querySelector('.popup__input_text_name');
const jobInput = formElement.querySelector('.popup__input_text_job');
const profName = document.querySelector('.profile__name');
const profJob = document.querySelector('.profile__job');

//СОЗДАНИЕ НОВЫХ КАРТОЧЕК
const elementContainer = document.querySelector('.elements');
const createCardBtn = document.querySelector('.profile__add-button');
const addCardBtn = document.querySelector('.popup__submit-button_create');

//Слой
const popupOverlay = document.querySelectorAll('.overlay');

const cardNameInput = document.querySelector('.popup__input_place_name');
const cardImgInput = document.querySelector('.popup__input_place_link');

const template = document.querySelector('.element').content;
const formImgZoom = document.querySelector('.form__img');
const formTitleZoom = document.querySelector('.form__title_zoom');
const inputCreateForm = document.querySelector('.input_type_add-card');

//Функция закрытия по ESC
function closeEsc(e) {
    if (e.key === 'Escape') {
        closePopup(popupProfile);
        closePopup(popupCreate);
        closePopup(popupImg);
    }
}

//Закрытие при нажатии вне формы. Слой
popupOverlay.forEach(function (close) {
    close.addEventListener('click', function (e) {
        e.preventDefault();
        closePopup(popupProfile);
        closePopup(popupCreate);
        closePopup(popupImg);
    });
});

//Открытие попапа
function openPopup(popup) {
    popup.classList.add('popup_visible');
    document.addEventListener('keydown', closeEsc);
}

//Закрытие попапа
function closePopup(popup) {
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

//Создание, удаление, лайк карточки
function createCard(cardData) {
    const card = template.querySelector('.element__container').cloneNode(true);
    const removeCard = card.querySelector('.element__trash');
    const likeBtn = card.querySelector('.element__like');
    const cardImage = card.querySelector('.element__img');
    const cardHeading = card.querySelector('.element__text');

    cardHeading.textContent = cardData.name;
    cardImage.src = cardData.link;
    cardImage.alt = cardData.name;


    removeCard.addEventListener('click', function (e){
        e.target.closest('.element__container').remove();
    });

    likeBtn.addEventListener('click', function (){
        likeBtn.classList.toggle('element__like_active');
    });

    cardImage.addEventListener('click', function (){
        openPopup(popupImg);
        formImgZoom.src = cardData.link;
        formTitleZoom.textContent = cardData.name;
    });
    popupImgClose.addEventListener('click', function (){closePopup(popupImg);});
    return card;
}

//Создание карточек
function createCardSubmit(){
    const elementCard = createCard({name: cardNameInput.value, link: cardImgInput.value});
    elementContainer.prepend(elementCard);
    inputCreateForm.reset();
    addCardBtn.disabled = true;
    closePopup(popupCreate);
}

//Помещение карточек
initialCards.forEach(function(cardData){
    elementContainer.prepend(createCard(cardData));
});

createCardBtn.addEventListener('click', function (){
    openPopup(popupCreate);
    addCardBtn.classList.add(validationConfig.inactiveButtonClass);
});

addCardBtn.addEventListener('click', createCardSubmit);

openPopupProfileBtn.addEventListener('click', function (){openPopup(popupProfile);});
formElement.addEventListener('submit', formSubmitHandlerProfile);

popupProfileClose.addEventListener('click', function (){closePopup(popupProfile);});
popupEditClose.addEventListener('click', function (){closePopup(popupCreate);});