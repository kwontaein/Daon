import { combineReducers, configureStore } from '@reduxjs/toolkit';

import receiptSearchSlice from './slice/receipt-search'
import receiptSelectorSlice  from './slice/receipt-select';
import { initializeStompChannel } from './middleware/stomp-middleware';
import { all } from "@redux-saga/core/effects"; 
import StompReducer, { stompConnect } from './slice/stomp-reducer';
import createSagaMiddleware from 'redux-saga';


function* rootSaga() {
  // all 함수는 여러 사가를 합쳐주는 역할을 한다.
  yield all([initializeStompChannel()]);
}

const rootReducer = combineReducers({
    stomp: StompReducer,
    receiptSearch: receiptSearchSlice,
    receiptSelector: receiptSelectorSlice,
});

const sagaMiddleware = createSagaMiddleware();


export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(sagaMiddleware),
});



export const sagaTask =sagaMiddleware.run(rootSaga);
export const sagaRefresh = ()=>{
  //stomp연결해제
  store.dispatch(stompConnect())

  setTimeout(()=>{
    sagaTask.cancel()
    sagaTask;//취소 후 재연결
  },50)
}

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;