class Api {
    constructor(config) {
        this._url = config.url;
        this._headers = config.headers;
    }
    _getData(res) {
        if (res.ok) {
            return res.json();
        }
        else {
            return Promise.reject(`Произошла ошибка: ${res.status}`);
        }
    }
    getInitialCards() {
        return fetch(`${this._url}/cards`, {
            method: 'GET',
            headers: this._headers
        })
        
        .then(this._getData)
    }
    getUserDetails() {
        return fetch(`${this._url}/users/me`, {
            method: 'GET',
            headers: this._headers
        })
        .then(this._getData)
        
    }
    changeUserDetails(data) {
        return fetch(`${this._url}/users/me`, {
            method: 'PATCH',
            headers: this._headers,            
            body: JSON.stringify({
                name: data.name,
                about: data.about
            })
        })
        .then(this._getData)       
        
    }

    changeUserAvatar(data) {
        return fetch(`${this._url}/users/me/avatar`, {
            method: 'PATCH',
            headers: this._headers,            
            body: JSON.stringify({
                avatar: data.avatar
            })
        })
        .then(this._getData)
        
        
    }
    addNewCard(data) {
        return fetch(`${this._url}/cards`, {
            method: 'POST',
            headers: this._headers,
            body: JSON.stringify({
                name: data.name,
                link: data.link
            })
        })
        .then(this._getData)
    }
    deleteCard(id) {
        return fetch(`${this._url}/cards/${id}`, {
            method: 'DELETE',
            headers: this._headers
        })
        .then(this._getData)
    }   

    addLike(id) {
        return fetch(`${this._url}/cards/${id}/likes`, {
            method: 'PUT',
            headers: this._headers,            
        })
        .then(this._getData)
    }

    deleteLike(id) {
        return fetch(`${this._url}/cards/${id}/likes`, {
            method: 'DELETE',
            headers: this._headers,            
        })
        .then(this._getData)
    }

}

const api = new Api({
    url: "https://mesto.nomoreparties.co/v1/cohort-63",
    headers: {
        "content-type": "application/json; charset=UTF-8",
        authorization: 'b94fdff7-1397-48ac-8fa6-b1bcc959d2d6'
    }
});

export default api;