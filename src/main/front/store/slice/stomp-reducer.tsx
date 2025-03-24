import {handleActions} from 'redux-actions';

export const SYNCHRONIZATION_STOMP = 'SYNCHRONIZATION_STOMP';
export const DISCONNECT_STOMP = 'DISCONNECT_STOMP';
export const RECEIVED_STOMP_MSG = 'RECEIVED_STOMP_MSG';


export type StompMessage ={
    destination:string,
    id:string,
}

export interface StompState {
    isConnect: boolean,
    Message: StompMessage,
}

const initialState: StompState ={
    isConnect: false,
    Message: {
        destination: '',
        id: '',
    },
}

export const stompConnect = () => ({ 
    type:SYNCHRONIZATION_STOMP,
    payload:true,
})
export const stompDisconnect = () => ({ 
    type:DISCONNECT_STOMP,
    payload:false,
})


export const receivedStompMsg = (payload:{Message:StompMessage}) => ({ 
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
            Message: {
                ...action.payload.Message
            },
        }),
    },
    initialState
)

export default stompReducer;