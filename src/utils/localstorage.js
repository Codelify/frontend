const KEY = "codelify";

export default {
  set: function(payload) {
    try {
      const item = JSON.stringify(payload);
      localStorage.setItem(KEY, item);
    } catch {
      return undefined;
    }
  },

  get: function() {
    try {
      const item = localStorage.getItem(KEY);
      if (item === null) {
        return undefined;
      } else {
        return JSON.parse(item);
      }
    } catch {
      return undefined;
    }
  },

  clear: function() {
    localStorage.clear();
  }
};
