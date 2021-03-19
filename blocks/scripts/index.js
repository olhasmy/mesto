let popup = document.querySelector(".edit__form");
let openPopupBtn = document.querySelector('.profile__info_edit-button');
let closePopupBtns = document.querySelector('.form__close-icon');
let popupOverlay = document.querySelector('.overlay');

function openPopup() {
    popup.classList.add('edit__form_visible');
}

function closePopup() {
    popup.classList.remove('edit__form_visible');
}

openPopupBtn.addEventListener('click', function () {
    openPopup();
});

closePopupBtns.addEventListener('click', function () {
    closePopup();
});

popupOverlay.addEventListener('click', function () {
    closePopup();
});

// Находим форму в DOM
let formElement = document.querySelector('.edit__form');
let nameInput = formElement.querySelector('.form__field-name');
let jobInput = formElement.querySelector('.form__field-job');

// Обработчик «отправки» формы, хотя пока
// она никуда отправляться не будет
    function formSubmitHandler (evt) {
        evt.preventDefault();
        let profName = document.querySelector('.profile__info_name');
        let profJob = document.querySelector('.profile__info_job');
        profName.textContent = nameInput.value;
        profJob.textContent = jobInput.value;
        formElement.remove();
    }

// Прикрепляем обработчик к форме:
// он будет следить за событием “submit” - «отправка»
formElement.addEventListener('submit', formSubmitHandler);


