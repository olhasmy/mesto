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


/////////


//Находим форму в DOM
let formElement = document.querySelector('.form');
//Находим поля формы в DOM
   let nameInput = formElement.querySelector('.form__field_name');
   let jobInput = formElement.querySelector('.form__field_job');

// Обработчик «отправки» формы, хотя пока
// она никуда отправляться не будет
    function formSubmitHandler (evt) {
        evt.preventDefault();
        let jobInput = formElement.querySelector('.form__field_job');
        // Эта строчка отменяет стандартную отправку формы.
        // Так мы можем определить свою логику отправки.
        // О том, как это делать, расскажем позже.
        jobInput.value;
        nameInput.value;
        // Получите значение полей jobInput и nameInput из свойства value
        let ElemName = document.querySelector('.profile__info_title');
        let ElemJob = document.querySelector('.profile__info_text');
        ElemJob.textContent = jobInput.value;
        // Выберите элементы, куда должны быть вставлены значения полей

        // Вставьте новые значения с помощью textContent
    }

// Прикрепляем обработчик к форме:
// он будет следить за событием “submit” - «отправка»
formElement.addEventListener('submit', formSubmitHandler);




/*let element = document.querySelector('.form__submit-button');

function showClick() {
    console.log('Мы кликнули по элементу');
}

element.addEventListener('click', showClick);*/

