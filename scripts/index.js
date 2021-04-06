//ПОПАПЫ
const popup = document.querySelector('.popup');
const popupProfile = document.querySelector('.popup-profile');
const popupCreate = document.querySelector('.popup-create');
const popupImg = document.querySelector('.popup-img');

//КНОПКИ ЗАКРТЫИЯ ФОРМ
const popupProfileClose = document.querySelector('.form__close-icon_for_profile');
const popupEditClose = document.querySelector('.form__close-icon_for_edit');
const popupImgClose = document.querySelector('.form__close-icon_for_img');

popupProfileClose.addEventListener('click', closePopup);
popupEditClose.addEventListener('click', closePopup);
popupImgClose.addEventListener('click', closePopup);


//ФОРМА РЕДАКТИРОВАНИЯ ПРОФИЛЯ
const openPopupProfileBtn = document.querySelector('.profile__edit-button');
const closePopupBtns = document.querySelector('.form__close-icon');
const formElement = document.querySelector('.input-profile');
const nameInput = formElement.querySelector('.popup__input_text_name');
const jobInput = formElement.querySelector('.popup__input_text_job');
const profName = document.querySelector('.profile__name');
const profJob = document.querySelector('.profile__job');

function openProfilePopup() {
    popupProfile.classList.add('popup_visible');
}

function openCreatePopup() {
    popupCreate.classList.add('popup_visible');
}

function closePopup() {
    popupProfile.classList.remove('popup_visible');
    popupCreate.classList.remove('popup_visible');
    popupImg.classList.remove('popup_visible');
}

function formSubmitHandler (evt) {
    evt.preventDefault();
    profName.textContent = nameInput.value;
    profJob.textContent = jobInput.value;
}

openPopupProfileBtn.addEventListener('click', openProfilePopup);
closePopupBtns.addEventListener('click', closePopup);
formElement.addEventListener('submit', formSubmitHandler);
formElement.addEventListener('submit', closePopup);
closePopupBtns.addEventListener('click', closePopup);

//Закрытие при нажатии вне формы. Слой
const popupOverlay = document.querySelectorAll('.overlay');
popupOverlay.forEach(function (close) {
    close.addEventListener('click', function (e){
        e.preventDefault();
        popup.classList.remove('popup_visible');
        popupImg.classList.remove('popup_visible');
    })
});

//КАРТОЧКИ
const initialCards = [
    {
        name: 'Архыз',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
    },
    {
        name: 'Челябинская область',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
    },
    {
        name: 'Иваново',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
    },
    {
        name: 'Камчатка',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
    },
    {
        name: 'Холмогорский район',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
    },
    {
        name: 'Байкал',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
    }
];

//СОЗДАНИЕ НОВЫХ КАРТОЧЕК
const elementContainer = document.querySelector('.elements');
const createCardBtn = document.querySelector('.profile__add-button');
const addCardBtn = document.querySelector('.popup__submit-button_create');
createCardBtn.addEventListener('click', openCreatePopup);
addCardBtn.addEventListener('click', createCardSubmit);

//Создание, удаление, лайк карточек
function createCards(initialCards) {
    const template = document.querySelector('.element').content;
    const card = template.querySelector('.element__container').cloneNode(true);
    card.querySelector('.element__text').textContent = initialCards.name;
    card.querySelector('.element__img').src = initialCards.link;
    card.querySelector('.element__img').alt = initialCards.name;

    const removeCard = card.querySelector('.element__trash');
    removeCard.addEventListener('click', function (){
            card.remove()
    });

    const likeBtn = card.querySelector('.element__like');
    likeBtn.addEventListener('click', function (){
        likeBtn.classList.toggle('element__like_active');
    });

    const elemImg = card.querySelector('.element__img');
    const formImgZoom = document.querySelector('.form__img');
    const formTitleZoom = document.querySelector('.form__title_zoom');
    elemImg.addEventListener('click', function openImgPopup() {
        popupImg.classList.add('popup_visible');
        formImgZoom.src = initialCards.link;
        formTitleZoom.textContent = initialCards.name;
    });
    return card;
}

//создание карточек
function createCardSubmit(e){
    e.preventDefault();
    const inputCreateForm = document.querySelector('.input-create');
    const cardNameInput = document.querySelector('.popup__input_place_name');
    const cardImgInput = document.querySelector('.popup__input_place_link');
    const elementCard = createCards({name: cardNameInput.value, link: cardImgInput.value});
    elementContainer.prepend(elementCard);
    inputCreateForm.reset();
    closePopup(popupCreate);
}

//помещение карточек
initialCards.forEach(function(initialCards){
    elementContainer.prepend(createCards(initialCards));
});


