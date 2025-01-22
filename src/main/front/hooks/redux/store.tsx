import { combineReducers, configureStore } from '@reduxjs/toolkit';
import calendarSlice from './slice/calendar-slice'

const rootReducer = combineReducers({
    calendarDate: calendarSlice,
});

export const store = configureStore({
  reducer: rootReducer,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;