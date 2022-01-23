import { configureStore } from '@reduxjs/toolkit';
import spinnerSlice from '../slice/spiner/spiner.slice';
import { combineReducers } from 'redux';
import generalSlice from '../slice/general/general.slice';


const store = configureStore({
  reducer: combineReducers({
    spinner: spinnerSlice,
    general: generalSlice,
  }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store; 
