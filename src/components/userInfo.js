export default class UserInfo {
    constructor({nameSelector, jobSelector, avatarSelector}) {
        this._name = nameSelector;
        this._job = jobSelector;
        this._avatar = avatarSelector;
    }
    getUserInfo() {
        this._user = {
            name: this._name.textContent,
            job: this._job.textContent,
            avatar: this._avatar
        }
        return this._user
    }

    setUserInfo(data) {
        this._name.textContent = data.name
        this._job.textContent = data.job
        this._avatar.textContent = data.avatar
    }
}