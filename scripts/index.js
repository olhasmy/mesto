//ПОПАПЫ
const popupProfile = document.querySelector('.popup-profile');
const popupCreate = document.querySelector('.popup-create');
const popupImg = document.querySelector('.popup-img');

//КНОПКИ ЗАКРТЫИЯ ФОРМ
const popupProfileClose = document.querySelector('.form__close-icon_for_profile');
const popupEditClose = document.querySelector('.form__close-icon_for_edit');
const popupImgClose = document.querySelector('.form__close-icon_for_img');

//ФОРМА РЕДАКТИРОВАНИЯ ПРОФИЛЯ
const openPopupProfileBtn = document.querySelector('.profile__edit-button');
const formElement = document.querySelector('.input-profile');
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

//Функция закрытия по ESC
function closeEsc(e) {
    if (e.key === 'Escape') {
        closePopup();
    }
}

function openProfilePopup() {
    popupProfile.classList.add('popup_visible');
    document.addEventListener('keydown', closeEsc);
}

function openCreatePopup() {
    popupCreate.classList.add('popup_visible');
    cardNameInput.value = '';
    cardImgInput.value = '';
    document.addEventListener('keydown', closeEsc);
}

function closePopup() {
    popupProfile.classList.remove('popup_visible');
    popupCreate.classList.remove('popup_visible');
    popupImg.classList.remove('popup_visible');
    document.removeEventListener('keydown', closeEsc);
}

function formSubmitHandler (evt) {
    evt.preventDefault();
    profName.textContent = nameInput.value;
    profJob.textContent = jobInput.value;
    closePopup();
}

//Создание, удаление, лайк карточки
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
        document.addEventListener('keydown', closeEsc); 
    });
    return card;
}

//Создание карточек
function createCardSubmit(){
    const inputCreateForm = document.querySelector('.input-create');
    const elementCard = createCards({name: cardNameInput.value, link: cardImgInput.value});
    elementContainer.prepend(elementCard);
    inputCreateForm.reset();
    closePopup();
}

//Закрытие при нажатии вне формы. Слой
popupOverlay.forEach(function (close) {
    close.addEventListener('click', function (e){
        e.preventDefault();
        closePopup();
    })
});

//помещение карточек
initialCards.forEach(function(initialCards){
    elementContainer.prepend(createCards(initialCards));
});

createCardBtn.addEventListener('click', openCreatePopup);
addCardBtn.addEventListener('click', createCardSubmit);

openPopupProfileBtn.addEventListener('click', openProfilePopup);
formElement.addEventListener('submit', formSubmitHandler);

popupProfileClose.addEventListener('click', closePopup);
popupEditClose.addEventListener('click', closePopup);
popupImgClose.addEventListener('click', closePopup);
