let popup = document.querySelector(".popup");
let openPopupBtn = document.querySelector('.profile__edit-button');
let closePopupBtns = document.querySelector('.form__close-icon');
let popupOverlay = document.querySelector('.overlay');
let formElement = document.querySelector('.input');
let nameInput = formElement.querySelector('.popup__input_text_name');
let jobInput = formElement.querySelector('.popup__input_text_job');
let profName = document.querySelector('.profile__name');
let profJob = document.querySelector('.profile__job');

function openPopup() {
    popup.classList.add('popup_visible');
}

function closePopup() {
    popup.classList.remove('popup_visible');
}

function formSubmitHandler (evt) {
    evt.preventDefault();
    profName.textContent = nameInput.value;
    profJob.textContent = jobInput.value;
}

openPopupBtn.addEventListener('click', openPopup);
closePopupBtns.addEventListener('click', closePopup);
popupOverlay.addEventListener('click', closePopup);
formElement.addEventListener('submit', formSubmitHandler);
formElement.addEventListener('submit', closePopup);

