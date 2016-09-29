const initialState = {
  errMsg: '',
  isAuthenticated: localStorage.getItem('user_token') ? true: false,
  isFetching: false,
};

export default initialState;
