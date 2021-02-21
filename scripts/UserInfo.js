import { profileUserName } from './const.js';

class UserInfo {
  constructor(name, about, avatar) {
    this._userName = name;
    this._userStatus = about;
    this._name = this._userName.textContent;
    this._status = this._userStatus.textContent;
    this.currentUser = profileUserName;
    this._avatar = avatar;
  }
  updateUserInfo() {
    this._userName.textContent = this._name;
    this._userStatus.textContent = this._status;
    
  }
  setUserInfo({name, about, avatar, _id}) {
    this._name = name;
    this._status = about;
    this._avatar.src = avatar;
    this.currentUser._id = _id;
  }
  getUserInfo() {
    return {
      name: this._name,
      status: this._status,
    };
  }
  
   setUserAvatar(res) {
    this._avatar.src = res.avatar;
    this._avatar.alt = res.name;
  }
}

export { UserInfo };
