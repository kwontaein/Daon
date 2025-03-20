import {handleActions} from 'redux-actions';

export const SYNCHRONIZATION_STOMP = 'SYNCHRONIZATION_STOMP';
export const RECEIVED_STOMP_MSG = 'RECEIVED_STOMP_MSG';


export type StompMessage ={
    destination:string,
    targetId:string,
}

export interface StompState {
    isConnect: boolean,
    message: StompMessage,
}

const initialState: StompState ={
    isConnect: false,
    message: {
        destination: '',
        targetId: '',
    },
}

export const stompConnect = (payload:{isConnect:boolean}) => ({ 
    type:SYNCHRONIZATION_STOMP,
    payload:payload,
})


export const receivedStompMsg = (payload:{message:StompMessage}) => ({ 
    type:RECEIVED_STOMP_MSG,
    payload:payload,
})



const stompReducer = handleActions(
    {
        [SYNCHRONIZATION_STOMP]: (state, action) => ({
            ...state,
            isConnect: action.payload.isConnect, 
        }),
        [RECEIVED_STOMP_MSG]: (state, action) => ({
            ...state,
            message: {
                ...action.payload.message
            },
        }),
    },
    initialState
)

export default stompReducer;