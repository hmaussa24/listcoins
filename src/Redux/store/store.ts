import { configureStore } from "@reduxjs/toolkit";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import spinnerSlice from "../slice/spiner/spiner.slice";
import { combineReducers } from "redux";
import generalSlice from "../slice/general/general.slice";
const reducers = combineReducers({
  spinner: spinnerSlice,
  general: generalSlice,
});
const persistConfig = {
  key: 'root',
  storage,
};

const persistedReducer = persistReducer(persistConfig, reducers);

const store = configureStore({
  reducer: persistedReducer,
});;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
