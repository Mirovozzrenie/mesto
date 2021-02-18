class UserInfo {
  constructor(userName, userStatus) {
    this._userName = userName;
    this._userStatus = userStatus;
    this._name = this._userName.textContent;
    this._status = this._userStatus.textContent;
  }
  updateUserInfo() {
    this._userName.textContent = this._name;
    this._userStatus.textContent = this._status;

  }
  setUserInfo(newName, newStatus) {
    this._name = newName;
    this._status = newStatus;
  }
  getUserInfo() {
    return {
      name: this._name,
      status: this._status
    };
  }
}

export { UserInfo };

