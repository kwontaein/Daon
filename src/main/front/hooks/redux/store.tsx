import { combineReducers, configureStore } from '@reduxjs/toolkit';
import receiptSearchSlice from './slice/receipt-search-slice'
import receiptSelectorSlice  from './slice/receipt-select-slice';
const rootReducer = combineReducers({
    receiptSearch: receiptSearchSlice,
    receiptSelector : receiptSelectorSlice,
});

export const store = configureStore({
  reducer: rootReducer,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;