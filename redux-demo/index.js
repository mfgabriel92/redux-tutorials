const redux = require("redux");
const createStore = redux.createStore;
const bindActionCreators = redux.bindActionCreators;
const combineReducers = redux.combineReducers;
const applyMiddleware = redux.applyMiddleware;

const reduxLogger = require("redux-logger");
const logger = reduxLogger.createLogger();

const produce = require("immer").produce;

// Action
const CAKE_ORDERED = "CAKE_ORDERED";
const CAKE_RESTOCKED = "CAKE_RESTOCKED";
const BREAD_ORDERED = "BREAD_ORDERED";
const BREAD_RESTOCKED = "BREAD_RESTOCKED";

function orderCake(qty = 1) {
  return {
    type: CAKE_ORDERED,
    payload: {
      qty,
    },
  };
}

function restockCake(qty = 1) {
  return {
    type: CAKE_RESTOCKED,
    payload: {
      qty,
    },
  };
}

function orderBread(qty = 1) {
  return {
    type: BREAD_ORDERED,
    payload: {
      qty,
    },
  };
}

function restockBread(qty = 1) {
  return {
    type: BREAD_RESTOCKED,
    payload: {
      qty,
    },
  };
}

// Reducer
const initialCakeState = {
  noOfCakes: 10,
};

const initialBreadState = {
  noOfBreads: 10,
};

function cakeReducer(state = initialCakeState, action) {
  switch (action.type) {
    case CAKE_ORDERED:
      return produce(state, (draft) => {
        draft.noOfCakes -= action.payload.qty;
      });
    case CAKE_RESTOCKED:
      return produce(state, (draft) => {
        draft.noOfCakes += action.payload.qty;
      });
    default:
      return state;
  }
}

function breadReducer(state = initialBreadState, action) {
  switch (action.type) {
    case BREAD_ORDERED:
      return produce(state, (draft) => {
        draft.noOfBreads -= action.payload.qty;
      });
    case BREAD_RESTOCKED:
      return produce(state, (draft) => {
        draft.noOfBreads += action.payload.qty;
      });
    default:
      return state;
  }
}

// Store
const rootReducer = combineReducers({ cakeReducer, breadReducer });
const store = createStore(rootReducer, applyMiddleware(logger));

const unsub = store.subscribe(() => {});

const actions = bindActionCreators(
  { orderCake, orderBread, restockCake, restockBread },
  store.dispatch
);
actions.orderCake();
actions.orderCake();
actions.orderCake();
actions.restockCake(3);

actions.orderBread();
actions.orderBread();
actions.restockBread(2);

unsub();
