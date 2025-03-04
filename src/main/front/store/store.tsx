import { combineReducers, configureStore } from '@reduxjs/toolkit';
import receiptSearchSlice from './slice/receipt-search'
import receiptSelectorSlice  from './slice/receipt-select';
import customerSearchSlice from './slice/customer-search';
import stockSearchSlice from './slice/stock-search';
import taskSearchSlice from './slice/task-search';

const rootReducer = combineReducers({
    receiptSearch: receiptSearchSlice,
    receiptSelector: receiptSelectorSlice,
    customerSearch: customerSearchSlice,
    stockSearch: stockSearchSlice,
    taskSearch: taskSearchSlice,
});

export const store = configureStore({
  reducer: rootReducer,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;