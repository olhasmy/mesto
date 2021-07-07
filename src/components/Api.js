export default class Api {
    constructor(options) {
        this.token = options.token;
        this.cohort = options.cohort;
    }

    _handleResponse(res) {
        if (res.ok) {
            return res.json();
        } else {
            return Promise.reject(`Ошибка: ${res.status}`);
        }
    }

    //получили информацию
    getUserInfo() {
        return fetch(`https://mesto.nomoreparties.co/v1/${this.cohort}/users/me`, {
            method: 'GET',
            headers: {
                authorization: '0970556a-6f94-4e95-aaf4-193fd780acec'
            }
        })
            .then(this._handleResponse);
    }

    //получили карточки
    getInitialCards() {
        return fetch(`https://mesto.nomoreparties.co/v1/${this.cohort}/cards`, {
            method: 'GET',
            headers: {
                authorization: '0970556a-6f94-4e95-aaf4-193fd780acec'
            },
        })
            .then(this._handleResponse);
    }

    //обновили информацию
    updateUserInfo(info) {
        return fetch(`https://mesto.nomoreparties.co/v1/${this.cohort}/users/me`, {
            method: 'PATCH',
            headers: {
                authorization: '0970556a-6f94-4e95-aaf4-193fd780acec',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: info.name,
                about: info.about,
            })
        })
            .then(this._handleResponse);
    }

    //добавили новую карточку
    addNewCard(cardElement) {
        return fetch(`https://mesto.nomoreparties.co/v1/${this.cohort}/cards`, {
            method: 'POST',
            headers: {
                authorization: '0970556a-6f94-4e95-aaf4-193fd780acec',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: cardElement.name,
                link: cardElement.link,
            })
        })
            .then(this._handleResponse);
    }

    //сменили аватар
    addNewAvatar(avatarElement){
        return fetch(`https://mesto.nomoreparties.co/v1/${this.cohort}/users/me/avatar`, {
            method: 'PATCH',
            headers: {
                authorization: '0970556a-6f94-4e95-aaf4-193fd780acec',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                avatar: avatarElement.avatar
            })
        })
            .then(this._handleResponse);
    }

    //лайк
    setLike(cardId, isLiked) {
        return fetch(`https://mesto.nomoreparties.co/v1/${this.cohort}/cards/likes/${cardId}`, {
            method: isLiked? 'DELETE' : 'PUT',
            headers: {
                authorization: '0970556a-6f94-4e95-aaf4-193fd780acec',
            },
        })
            .then(this._handleResponse);
    }

    //удаление карточки
    deleteCard(cardId) {
        return fetch(`https://mesto.nomoreparties.co/v1/${this.cohort}/cards/${cardId}`, {
            method: 'DELETE',
            headers: {
                authorization: '0970556a-6f94-4e95-aaf4-193fd780acec',
            },
        })
            .then(this._handleResponse);
    }
}