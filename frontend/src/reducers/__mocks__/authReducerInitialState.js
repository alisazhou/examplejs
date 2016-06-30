const _storage = {};
const localStorage = {
  getItem (key) {
    return _storage[key];
  },
};

const initialState = {
  errMsg: '',
  isAuthenticated: localStorage.getItem('token') ? true: false,
  isFetching: false,
  token: '',
};

export default initialState;
