import {createAction, handleActions} from 'redux-actions';
import {Dispatch} from 'redux';
import { RootState } from '../store';


export type Message ={
    
} 
// Action Types
export const SYNCHRONIZATION_STOMP = 'SYNCHRONIZATION_STOMP';
export const REQUEST_FILE = 'REQUEST_FILE';
export const RECEIVED_STOMP_MSG = 'RECEIVED_STOMP_MSG';
export const SEND_STOMP_MSG = 'SEND_STOMP_MSG';
export const UPDATE_ONLINE = 'UPDATE_ONLINE'
export const UPDATE_LOADING = "UPDATE_LOADING"
export const UPDATE_APP_POSITION = "UPDATE_APP_POSITION"
export const UPDATE_STOMP_STATE = "UPDATE_STOMP_STATE"
export const ADD_SUBSCRIBE = "ADD_SUBSCRIBE"

//todo 추가 하나
type stateType = "ALARM" | "SEND" | "READ" | "RELOAD" | "ONLINE" | "OFFLINE" | "";
type requestType = "ENDPOINT" | "READ" | "RELOAD" | "ONLINE" | "OFFLINE" | "";

export interface ReceivedStomp {
    param: string,
    message: Message[],
    state: stateType,
    onlineUserList: string[],
    target: string,
    userId:string,
    receivedUUID:string,
}


//초기상태 정의
export interface StompState {
    destination: string[][],
    target: string,
    param: string,
    message: string, //송신한 메시지
    receiveMessage: ReceivedStomp, //받은 메세지 정보
    requestFile: requestType,
    isOnline: string, //온라인여부
    loading: boolean, //로딩여부 (stomp 셋팅 후 true)
    isConnect: boolean, //웹소켓 연결여부=>로그아웃 시 false
    messageType: string,
    subScribeParam: string, //추가로 구독할 param
}


export interface StompData {
    stomp: StompState
}

export interface DispatchStompProps {
    synchronizationStomp: (payload: { destination: string[][] }) => void;
    updateStompState: (payload: { isConnect: boolean }) => void;
    updateAppPosition: (payload: { target: string, param: string }) => void;
    requestFile: (payload: {
        target: string,
        param: string,
        requestFile: requestType,
    }) => void;
    sendStompMsg: (payload: {
        target: string, param: string, message: string,
        messageType: string
    }) => void;
    receivedStompMsg: (payload: {
        receiveMessage: {
            param: string,
            message: string,
            userId: string,
            sendDate: string,
            state: stateType,
            chatUUID: string,
        }
    }) => void;
    updateOnline: (payload: { isOnline: string }) => void;
    updateLoading: (payload: { loading: boolean }) => void;
}

/*======================================= 외부 컴포넌트 Connect를 하기 위한 함수 =======================================*/
export const mapDispatchToStompProps = (dispatch: Dispatch): DispatchStompProps => ({
    synchronizationStomp: (payload: { destination: string[][] }) => dispatch(synchronizationStomp(payload)),
    updateStompState: (payload: { isConnect: boolean }) => dispatch(updateStompState(payload)),
    updateAppPosition: (payload: { target: string, param: string }) => dispatch(updateAppPosition(payload)),
    requestFile: (payload: {
        target: string,
        param: string,
        requestFile: requestType,
    }) => dispatch(requestFile(payload)),
    sendStompMsg: (payload: {
        target: string, param: string, message: string,
        messageType: string
    }) => dispatch(sendStompMsg(payload)),
    receivedStompMsg: (payload: {
        receiveMessage: {
            param: string,
            message: string,
            userId: string,
            sendDate: string,
            state: stateType,
            chatUUID: string,
        }
    }) => dispatch(receivedStompMsg(payload)),
    updateOnline: (payload: { isOnline: string }) => dispatch(updateOnline(payload)),
    updateLoading: (payload: { loading: boolean }) => dispatch(updateLoading(payload)),
});

//(Component Props로 전달하기 위한 interface)
export const mapStateToStompProps = (state: RootState): StompData => ({
    stomp: state.stomp, // store에서 가져올 상태를 매핑
});

/**=======================================/*=======================================/*=======================================/*/


// action 함수 정의, 외부 컴포넌트에서 접근하여 payload를 전달하여 store를 수정, (state, action)
export const synchronizationStomp = (payload: { destination: string[][] }) => ({
    type: SYNCHRONIZATION_STOMP,
    payload: payload,
});

export const updateStompState = (payload: { isConnect: boolean }) => ({
    type: UPDATE_STOMP_STATE,
    payload: payload,
})

export const updateAppPosition = (payload: { target: string, param: string }) => ({
    type: UPDATE_APP_POSITION,
    payload: payload,
})

export const requestFile = (payload: { target: string, param: string, requestFile: requestType }) => ({
    type: REQUEST_FILE,
    payload: payload,
});


//메시지 전송 (주소, 식별자, 메시지 넣기)
export const sendStompMsg = (payload: { target: string, param: string, message: string, messageType: string }) => ({
    type: SEND_STOMP_MSG,
    payload: payload,
});


//메시지 받기
//채널에서 take로 받아온 message를 받아 action에 대한 payload전달 (dispatch)


export const receivedStompMsg = (payload: {
    receiveMessage: {
        param: string,
        message: string,
        userId: string,
        sendDate: string,
        state: stateType,
        chatUUID: string
    }
}) => ({
    type: RECEIVED_STOMP_MSG,
    payload: payload,
});

export const updateOnline = (payload: { isOnline: string }) => ({
    type: UPDATE_ONLINE,
    payload: payload,
});

export const updateLoading = (payload: { loading: boolean }) => ({
    type: UPDATE_LOADING,
    payload: payload,
});
export const addSubScribe = (payload:{subScribeParam:string})=>({
    type: ADD_SUBSCRIBE,
    payload: payload,
})


export interface Destination {
    map: any;
    [index: number]: (string | number)[];
}


// Reducer-saga : 초기 State
const initialState: StompState = {
    destination: [], // topic/app의 경로
    target: '',//초기 publish 대상
    param: '', // (sub/pub 시)식별하기 위한 값
    message: '',
    receiveMessage: {
        param: '',
        message: [],
        state: '',
        onlineUserList: [],
        target: '',
        userId:'',
        receivedUUID:''
    }, // 초기 message 상태
    requestFile: '',
    isOnline: "OFFLINE",
    loading: false,
    isConnect: false,
    messageType: "",
    subScribeParam:''
};

//주소를 저장, app/topic을 구분해서 구독 및 메시지 전달을 가능하게 유동적으로 설정
//Reducer를 통해 action type에 따른 수정, type을 받아 접근
const StompReducer = handleActions(
    {
        [SYNCHRONIZATION_STOMP]: (state, action) => ({
            ...state,
            destination: action.payload.destination, //[[userid],[userid],list<groupId>, list<friendId>]
        }),

        [UPDATE_STOMP_STATE]: (state, action) => ({
            ...state,
            isConnect: action.payload.isConnect, //[[userid],[userid],list<groupId>, list<friendId>]
        }),

        [UPDATE_APP_POSITION]: (state, action) => ({
            ...state,
            target: action.payload.target,
            param: action.payload.param,
        }),

        [REQUEST_FILE]: (state, action) => ({
            ...state,
            target: action.payload.target,
            param: action.payload.param,
            requestFile: action.payload.requestFile,
        }),

        [SEND_STOMP_MSG]: (state, action) => ({
            ...state,
            target: action.payload.target,
            param: action.payload.param,
            message: action.payload.message,
            messageType: action.payload.messageType,
        }),

        [RECEIVED_STOMP_MSG]: (state, action) => ({
            ...state,
            receiveMessage: {
                ...state.receiveMessage,
                ...action.payload.receiveMessage,
            },
        }),

        [UPDATE_ONLINE]: (state, action) => ({
            ...state,
            isOnline: action.payload.isOnline,
        }),
        [UPDATE_LOADING]: (state, action) => ({
            ...state,
            loading: action.payload.loading,
        }),
        [ADD_SUBSCRIBE]: (state, action) => ({
            ...state,
            subScribeParam:action.payload.subScribeParam
        })
    },
    initialState
);


export default StompReducer;