const axios = require("axios");
const thunkMiddleware = require("redux-thunk").thunk;
const produce = require("immer").produce;
const redux = require("redux");
const loggerMiddleware = require("redux-logger").createLogger();

const createStore = redux.createStore;
const applyMiddleware = redux.applyMiddleware;

const initialState = {
  loading: false,
  users: [],
  error: "",
};

const FETCH_USERS_REQUESTED = "FETCH_USERS_REQUESTED";
const FETCH_USERS_SUCCEEDED = "FETCH_USERS_SUCCEEDED";
const FETCH_USERS_FAILED = "FETCH_USERS_FAILED";

function fetchUserRequest() {
  return {
    type: FETCH_USERS_REQUESTED,
  };
}

function fetchUserSuccess(users) {
  return {
    type: FETCH_USERS_SUCCEEDED,
    payload: {
      users,
    },
  };
}

function fetchUserFailure(error) {
  return {
    type: FETCH_USERS_FAILED,
    payload: {
      error,
    },
  };
}

function reducer(state = initialState, action) {
  switch (action.type) {
    case FETCH_USERS_REQUESTED:
      return produce(state, (draft) => {
        draft.loading = true;
      });
    case FETCH_USERS_SUCCEEDED:
      return produce(state, (draft) => {
        draft.loading = false;
        draft.users = action.payload.users;
      });
    case FETCH_USERS_FAILED:
      return produce(state, (draft) => {
        draft.loading = false;
        draft.error = action.payload.error;
      });
    default:
      return state;
  }
}

function fetchUsers() {
  return function (dispatch) {
    dispatch(fetchUserRequest());
    axios
      .get("https://jsonplaceholder.typicode.com/users")
      .then((res) => {
        const users = res.data.map((user) => user.name);
        dispatch(fetchUserSuccess(users));
      })
      .catch((err) => fetchUserFailure(err.message));
  };
}

const store = createStore(
  reducer,
  applyMiddleware(thunkMiddleware, loggerMiddleware)
);

store.dispatch(fetchUsers());
