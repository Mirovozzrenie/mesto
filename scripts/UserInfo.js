class UserInfo {
  constructor(userName, userStatus) {
    this._userName = userName;
    this._userStatus = userStatus;
    this._name = '';
    this._status = '';
  }
  updateUserInfo() {
    this._userName.textContent = this._name;
    this._userStatus.textContent = this._status;
    console.log(this._userName.textContent)
    console.log (this._userName)
        console.log(this._userName.textContent)

  }
  setUserInfo(newName, newStatus) {
    this._name = newName;
    this._status = newStatus;
  }
  getUserInfo(){
    return{
      name: this._userName,
      status: this._userStatus
    }
  }
}

export { UserInfo };