class Datasource {
  constructor() {
    this._db = {};
  }

  initUserData(userId, maze) {
    this._db[userId] = {
      maze,
    };
  }

  updateUserData(userId, maze) {
    if (!this._db[userId]) {
      this._db[userId] = {};
    }

    this._db[userId] = { maze };
  }

  getUserData(userId) {
    return this._db[userId];
  }
}

module.exports = {
  Datasource
};
