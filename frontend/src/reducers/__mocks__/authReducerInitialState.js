const _storage = {};
const localStorage = {
  getItem (key) {
    return _storage[key];
  },
};

const initialState = {
  errMsg: '',
  isAuthenticated: localStorage.getItem('user_token') ? true: false,
  isFetching: false,
};

export default initialState;
