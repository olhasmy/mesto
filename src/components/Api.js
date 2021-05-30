export default class Api {
    constructor(options) {
        this.token = options.token;
        this.cohort = options.cohort;
    }
//получили информацию
    getUserInfo() {
        return fetch(`https://mesto.nomoreparties.co/v1/${this.cohort}/users/me`, {
            method: 'GET',
            headers: {
                authorization: '0970556a-6f94-4e95-aaf4-193fd780acec'
            }
        })
            .then(res => {
                if (res.ok) {
                    return res.json();
                }
                return Promise.reject(`Ошибка: ${res.status}`);
            })
            .catch((err) => {
                console.log(err);
            });
    }
//получили карточки
    getInitialCards() {
        return fetch(`https://mesto.nomoreparties.co/v1/${this.cohort}/cards`, {
            method: 'GET',
            headers: {
                authorization: '0970556a-6f94-4e95-aaf4-193fd780acec'
            },
        })
            .then(res => {
                if (res.ok) {
                    return res.json();
                }
                return Promise.reject(`Ошибка: ${res.status}`);
            })
            .catch((err) => {
                console.log(err);
            });
    }
//ничего не обновили
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
            .then(res => {
                if (res.ok) {
                    return res.json();
                }
                return Promise.reject(`Ошибка: ${res.status}`);
            })
            .catch((err) => {
                console.log(err);
            });
    }

    addNewCard(cardElement) {
        return fetch(`https://mesto.nomoreparties.co/v1/${this.cohort}/cards`, {
            method: 'POST',
            headers: {
                authorization: '0970556a-6f94-4e95-aaf4-193fd780acec',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: cardElement.name,
                link: cardElement.link
            })
        })
            .then(res => {
                if (res.ok) {
                    return res.json();
                }
                return Promise.reject(`Ошибка: ${res.status}`);
            })
            .catch((err) => {
                console.log(err);
            })
    }
}