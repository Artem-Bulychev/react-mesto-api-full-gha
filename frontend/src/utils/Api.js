class Api {
  constructor(options) {
    this._url = options.baseUrl
  }

  getInitialCards() {
    const token = localStorage.getItem("token");
    return fetch(`${this._url}/cards`, {
      method: "GET",
      headers: {
        "content-type": "application/json",
        "authorization": `Bearer ${token}`,
      },
    }).then((res) => this._checkRequest(res))
  }

  _checkRequest(res) {
    if (res.ok) {
      return res.json()
    }
    return Promise.reject(`Ошибка: ${res.status}`)
  }

  _req(url, options) {
    return fetch(url, options).then(this._checkRequest)
  }

  getInfo() {
    const token = localStorage.getItem("token");
    return  this._req(`${this._url}/users/me`, {
      method: "GET",
      headers: {
        "content-type": "application/json",
        "authorization": `Bearer ${token}`,
      },
    })
  }

  editInfo({ name, about }) {
    const token = localStorage.getItem("token");
    return fetch(`${this._url}/users/me`, {
      method: "PATCH",
      headers: {
        "content-type": "application/json",
        "authorization": `Bearer ${token}`,
      },
      body: JSON.stringify({
        name: name,
        about: about,
      }),
    }).then((res) => this._checkRequest(res))
  }

  userAvatar({ avatar }) {
    const token = localStorage.getItem("token");
    return fetch(`${this._url}/users/me/avatar`, {
      method: "PATCH",
      headers: {
        "content-type": "application/json",
        "authorization": `Bearer ${token}`,
      },
      body: JSON.stringify({
        avatar: avatar,
      }),
    }).then((res) => this._checkRequest(res))
  }

  newCard(data) {
    const token = localStorage.getItem("token");
    return fetch(`${this._url}/cards`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
        "authorization": `Bearer ${token}`,
      },
      body: JSON.stringify({
        name: data.name,
        link: data.link,
      }),
    }).then((res) => this._checkRequest(res))
  }

  deleteCard(cardId) {
    const token = localStorage.getItem("token");
    return fetch(`${this._url}/cards/${cardId}/likes`, {
      method: "DELETE",
      headers: {
        "content-type": "application/json",
        "authorization": `Bearer ${token}`,
      },
    }).then((res) => this._checkRequest(res))
  }

  modLike(cardId, isLiked){
    if(!isLiked){
      return this.putLike(cardId)
    } else{
      return this.deleteLike(cardId)
    }
  } 

  putLike(cardId) {
    const token = localStorage.getItem("token");
    return fetch(`${this._url}/cards/${cardId}/likes`, {
      method: "PUT",
      headers: {
        "content-type": "application/json",
        "authorization": `Bearer ${token}`,
      },
    }).then((res) => this._checkRequest(res))
  }

  deleteLike(cardId) {
    const token = localStorage.getItem("token");
    return fetch(`${this._url}/cards/${cardId}/likes`, {
      method: "DELETE",
      headers: {
        "content-type": "application/json",
        "authorization": `Bearer ${token}`,
      },
    }).then((res) => this._checkRequest(res))
  }
}

const api = new Api({
  baseUrl: "https://api.domainname.tema.nomoreparties.co",
  // headers: {
  //   authorization: "5730adbc-cf45-48cf-ad8c-2a55448015a6",
  //   "Content-Type": "application/json",
  // },
});



export default api