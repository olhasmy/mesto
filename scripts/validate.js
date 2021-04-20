//показываем ошибку
const showInputError = (formElement, inputElement, errorMessage, configList) => {
    const errorElement = formElement.querySelector(`#${inputElement.id}--error`);
    inputElement.classList.add(configList.inputErrorClass);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(configList.errorClass);
};

//скрываем ошибку
const hideInputError = (formElement, inputElement, configList) => {
    const errorElement = formElement.querySelector(`#${inputElement.id}--error`);
    inputElement.classList.remove(configList.inputErrorClass);
    errorElement.textContent = '';
    errorElement.classList.remove(configList.errorClass);
};

//проверяем на валидность
const checkInputValidity = (formElement, inputElement, configList) => {
    if (!inputElement.validity.valid) {
        showInputError(formElement, inputElement, inputElement.validationMessage, configList);
    } else {
        hideInputError(formElement, inputElement, configList);
    }
};

//активация кнопки по валидности
const toggleButtonState = (inputList, buttonElement, configList) => {
    if (hasInvalidInput(inputList)) {
        buttonElement.classList.add(configList.inactiveButtonClass);
        buttonElement.disabled = true;
    } else {
        buttonElement.classList.remove(configList.inactiveButtonClass);
        buttonElement.disabled = false;
    }
};

//проверяем инпуты
const hasInvalidInput = (inputList) => {
    return inputList.some((inputElement) => {
        return !inputElement.validity.valid;
    })
};

//добавляем слушатели
const setEventListeners = (formElement, configList) => {
    const inputList = Array.from(formElement.querySelectorAll(configList.inputSelector));
    const buttonElement = formElement.querySelector(configList.submitButtonSelector);
    toggleButtonState(inputList, buttonElement, configList);
    inputList.forEach((inputElement) => {
        inputElement.addEventListener('input', function () {
            checkInputValidity(formElement, inputElement, configList);
            toggleButtonState(inputList, buttonElement, configList);
        });
    });
};

//проходим по формам, добавляем слушатель
function enableValidation(configList) {
    const forms = Array.from(document.querySelectorAll(configList.formSelector));
    forms.forEach(formElement => {
        formElement.addEventListener('submit', preventFormSubmit);
        setEventListeners(formElement, configList);
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
    inputErrorClass: 'popup__input-error',
    errorClass: 'popup__input-error_visible',
});