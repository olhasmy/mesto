export default class UserInfo {
    constructor(nameSelector, jobSelector, avatarSelector) {
        this._name = nameSelector;
        this._job = jobSelector;
        this._avatar = avatarSelector;
    }
    getUserInfo() {
        this._user = {
            name: this._name.textContent,
            about: this._job.textContent,
        }
        return this._user
    }

    getUserAvatar() {
        this._userAvatar = {
            avatar: this._avatar.src,
        }
        return this._userAvatar
    }

    setUserInfo(data) {
        if(data.name) {
            this._name.textContent = data.name;
        }
        if(data.about) {
            this._job.textContent = data.about;
        }
    }

    setUserAvatar(data) {
        if(data.avatar) {
            this._avatar.src = data.avatar;
        }
    }
}