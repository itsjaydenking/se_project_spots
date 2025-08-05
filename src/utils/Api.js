class Api {
  constructor(options) {
    this._baseUrl = options.baseUrl;
    this._headers = options.headers;
  }

  // ========================================
  // PRIVATE HELPER METHODS
  // ========================================

  _checkResponse(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Error: ${res.status}`);
  }

  _request(endpoint, options = {}) {
    return fetch(`${this._baseUrl}${endpoint}`, {
      headers: this._headers,
      ...options,
    }).then(this._checkResponse);
  }

  // ========================================
  // PUBLIC API METHODS
  // ========================================

  // === DATA FETCHING ===

  getAppInfo() {
    return Promise.all([this.getInitialCards(), this.getUserInfo()]);
  }

  getInitialCards() {
    return this._request("/cards");
  }

  getUserInfo() {
    return this._request("/users/me");
  }

  // === USER PROFILE MANAGEMENT ===

  editUserInfo({ name, about }) {
    return this._request("/users/me", {
      method: "PATCH",
      body: JSON.stringify({ name, about }),
    });
  }

  updateUserAvatar({ avatar }) {
    return this._request("/users/me/avatar", {
      method: "PATCH",
      body: JSON.stringify({ avatar }),
    });
  }

  // === CARD MANAGEMENT ===

  postNewCard(cardData) {
    return this._request("/cards", {
      method: "POST",
      body: JSON.stringify(cardData),
    });
  }

  deleteCard(cardId) {
    return this._request(`/cards/${cardId}`, {
      method: "DELETE",
    });
  }

  // === LIKE FUNCTIONALITY ===

  likeCard(cardId) {
    return this._request(`/cards/${cardId}/likes`, {
      method: "PUT",
    });
  }

  dislikeCard(cardId) {
    return this._request(`/cards/${cardId}/likes`, {
      method: "DELETE",
    });
  }
}

export default Api;
