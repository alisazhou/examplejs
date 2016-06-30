const initialState = {
  errMsg: '',
  isAuthenticated: localStorage.getItem('token') ? true: false,
  isFetching: false,
  token: '',
};

export default initialState;
