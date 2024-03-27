const loggerMiddleware = require("redux-logger").createLogger();
const configureStore = require("@reduxjs/toolkit").configureStore;
const cakeReducer = require("../features/cake/cakeSlice");
const breadReducer = require("../features/bread/breadSlice");
const userReducer = require("../features/user/userSlice");

const store = configureStore({
  reducer: {
    cake: cakeReducer,
    bread: breadReducer,
    user: userReducer,
  },
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware().concat(loggerMiddleware);
  },
});

module.exports = store;
