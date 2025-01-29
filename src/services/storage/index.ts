interface IStorage {
  get: (key: string) => string | null;
  set: (key: string, value: string) => void;
  remove: (key: string) => void;
}

const storage: IStorage = {
  get: (key) => {
    if (window.localStorage) {
      return window.localStorage.getItem(key);
    }
    return null;
  },
  set: (key, value) => {
    if (window.localStorage) {
      window.localStorage.setItem(key, value);
    } else {
      throw new Error("Couldn't set a value to localstorage.");
    }
  },
  remove: (key) => {
    if (window.localStorage) {
      window.localStorage.removeItem(key);
    } else {
      throw new Error("Couldn't remove a value from localstorage.");
    }
  },
};

export default storage;
