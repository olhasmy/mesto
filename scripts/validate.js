//показываем ошибку
const showInputError = (formElement, inputElement, errorMessage) => {
    const errorElement = formElement.querySelector(`#${inputElement.id}--error`);
    inputElement.classList.add('popup__input_type_error');
    errorElement.textContent = errorMessage;
    errorElement.classList.add('popup__error_visible');
};

//скрываем ошибку
const hideInputError = (formElement, inputElement) => {
    const errorElement = formElement.querySelector(`#${inputElement.id}--error`);
    inputElement.classList.remove('popup__input_type_error');
    errorElement.textContent = '';
    errorElement.classList.remove('popup__error_visible');
};

//проверяем на валидность
const checkInputValidity = (formElement, inputElement) => {
    if (!inputElement.validity.valid) {
        showInputError(formElement, inputElement, inputElement.validationMessage);
    } else {
        hideInputError(formElement, inputElement);
    }
};

//активация кнопки по валидности
const toggleButtonState = (inputList, buttonElement) => {
    if (hasInvalidInput(inputList)) {
        buttonElement.classList.add('popup__submit-button_disabled');
        buttonElement.disabled = true;
    } else {
        buttonElement.classList.remove('popup__submit-button_disabled');
        buttonElement.disabled = false;
    }
};

//проверяем инпуты
const hasInvalidInput = (inputList) => {
    return inputList.some((inputElement) => {
        return !inputElement.validity.valid;
    })
};

//добавляем листнеры
const setEventListeners = (formElement) => {
    const inputList = Array.from(formElement.querySelectorAll('.popup__input'));
    const buttonElement = formElement.querySelector('.popup__submit-button');
    toggleButtonState(inputList, buttonElement);
    inputList.forEach((inputElement) => {
        inputElement.addEventListener('input', function () {
            checkInputValidity(formElement, inputElement);
            toggleButtonState(inputList, buttonElement);
        });
    });
};

//проходим по формам, добавляем слушатель
function enableValidation(list) {
    const forms = Array.from(document.querySelectorAll(list.formSelector));
    forms.forEach(form => {
        form.addEventListener('submit', preventFormSubmit);
        setEventListeners(form, list);
    });
}

//отменем действия браузера по умолчанию
function preventFormSubmit(e) {
    e.preventDefault();
}

//включение валидации вызовом enableValidation
enableValidation( {
    formSelector: '.input',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__submit-button',
    inactiveButtonClass: 'popup__submit-button_disabled',
    inputErrorClass: 'popup__input_type_error',
    errorClass: 'popup__error_visible'
});