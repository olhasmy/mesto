export default class UserInfo {
    constructor(nameSelector, jobSelector) {
        this._name = nameSelector;
        this._job = jobSelector;
    }
    getUserInfo() {
        this._user = {
            name: this._name.textContent,
            job: this._job.textContent
        }
        return this._user
    }

    setUserInfo(data) {
        this._name.textContent = data.name
        this._job.textContent = data.job
    }
}