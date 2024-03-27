const store = require("./app/store");
const cakeActions = require("./features/cake/cakeSlice").cakeActions;
const breadActions = require("./features/bread/breadSlice").breadActions;
const userActions = require("./features/user/userSlice").userActions;

store.dispatch(userActions.fetchUsers());
