import { nameInput, jobInput, placeName, pictureLink, avatarLinkInput } from "./const.js";
class Api {
  constructor({ url, headers, groupId }) {
    this._headers = headers;
    this._url = url;
    this._groupId = groupId;
  }

  getInitialCards() {
    return fetch(`${this._url}/v1/${this._groupId}/cards`, {
      headers: this._headers
    }).then(res => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Ошибка на сервере ${res.status}`);
    });
  }

  getUserServerInfo() {
    return fetch(`${this._url}/v1/${this._groupId}/users/me`, {
      headers: this._headers
    }).then(this._check);
  }

  setUserServerInfo() {
    return fetch(`${this._url}/v1/${this._groupId}/users/me`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({
        name: nameInput.value,
        about: jobInput.value
      })
    }).then(this._check);
  }

  addNewCard() {
      return fetch(`${this._url}/v1/${this._groupId}/cards`, {
        method: "POST",
        headers: this._headers,
        body: JSON.stringify({
          name: placeName.value,
          link: pictureLink.value
        })
      }).then(this._check);
    }
  
   removeCard(cardId) {
    return fetch(`${this._url}/v1/${this._groupId}/cards/${cardId}`, {
      method: "DELETE",
      headers: this._headers,
    }).then(this._check);
  } 
  
      addLike(cardId) {
    return fetch(`${this._url}/v1/${this._groupId}/cards/likes/${cardId}`, {
      method: "PUT",
      headers: this._headers,
    }).then(this._check);
  }

    removeLike(cardId) {
    return fetch(`${this._url}/v1/${this._groupId}/cards/likes/${cardId}`, {
      method: "DELETE",
      headers: this._headers,
    }).then(this._check);
  }

    patchUserAvatar() {
    return fetch(`${this._url}/v1/${this._groupId}/users/me/avatar`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({
        avatar: avatarLinkInput.value,
      }),
    }).then(this._check);
  }
  
  _check(res){
    if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Ошибка на сервере ${res.status}`);
    }

}
export { Api };
