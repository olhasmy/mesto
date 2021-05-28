export default class UserInfo {
    constructor(nameSelector, jobSelector, avatarSelector) {
        this._name = nameSelector;
        this._job = jobSelector;
        this._avatar = avatarSelector;
    }
    getUserInfo() {
        this._user = {
            name: this._name.textContent,
            job: this._job.textContent,
        }
        return this._user
    }

    getUserAvatar() {
        this._userAvatar = {
            avatar: this._avatar.textContent,
        }
        return this._userAvatar
    }

    setUserInfo(data) {
        this._name.textContent = data.name;
        this._job.textContent = data.job;
        this.setUserAvatar(data);
    }

    setUserAvatar(data) {
        this._avatar.src = data.avatar;
   }
}