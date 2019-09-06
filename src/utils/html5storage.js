var storage = {

  setLsJson: function (key, obj) {
    localStorage.setItem(key, JSON.stringify(obj));
  },

  getLsJson: function (key) {
    return JSON.parse(localStorage.getItem(key))
  },

  setPlsJson: function (key, obj) {
    plus.storage.setItem(key, JSON.stringify(obj))
  },

  getPlsJson: function (key) {
    return JSON.parse(plus.storage.getItem(key))
  }
}

export default storage
