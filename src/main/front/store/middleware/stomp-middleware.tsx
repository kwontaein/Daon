import {CompatClient, Frame, IMessage, Stomp} from "@stomp/stompjs";
import SockJS from "sockjs-client";
import {call, delay, fork, put, race, take} from 'redux-saga/effects';
import {buffers, channel, END, EventChannel, eventChannel} from 'redux-saga';
import {
    ADD_SUBSCRIBE,
    Destination,
    receivedStompMsg, REQUEST_FILE,
    SEND_STOMP_MSG,
    SYNCHRONIZATION_STOMP,
    UPDATE_STOMP_STATE,
    updateLoading,
} from "../slice/stomp-reducer"


type stateType = "ALARM" | "READ" | "SEND" | "ENDPOINT" | "ONLINE" | "OFFLINE";

interface StompData {
    param: string | number,
    state: stateType,
    message?: string,
}


export const groupEndPointMap = new Map();
export const friendEndPointMap = new Map();
export const scrollPointMap = new Map();
export const toggleCurrentMap = new Map();
export const BoardFilterMap = new Map();
export const BoardSearchMap = new Map();
export const BoardParamMap = new Map();
export const ChatContentMap = new Map();
export const EventStateMap = new Map();
export const EndPointParamMap = new Map();

export const subscribeDirection = ['personalTopic', 'groupMsg', 'friendMsg']


let emiter : (input: (END | number)) => void

function* sendStomp(stompClient: CompatClient) {
    while (true) {
        const {payload} = yield take(SEND_STOMP_MSG)//액션을 기다린 후 dispatch 가 완료되면 실행
        const {param, target, message} = yield payload;

        const data: StompData = {
            param: `${param}`, //groupMsg,friendMsg
            message: `${message}`,
            state: "SEND", //0:endpoint 로드
        }
        const url = `/app/${target}`
        stompClient.publish({
            destination: `${url}`,
            body: JSON.stringify(data),
        })
    }
}

function* endPointStomp(stompClient: CompatClient) {
    while (true) {
        const {payload} = yield take(REQUEST_FILE)//액션을 기다린 후 dispatch 가 완료되면 실행
        const {param, target, message} = yield payload;

        const data: StompData = {
            param: `${param}`, //groupMsg,friendMsg
            message: `${message}`,
            state: "ENDPOINT", //0:endpoint 로드
        }
        const url = `/app/${target}`
        stompClient.publish({
            destination: `${url}`,
            body: JSON.stringify(data),
        })
    }
}

function* sendPublish(destination: Destination, stompClient: CompatClient) {
    destination.map((sub: (string | number)[], index: number) => {
        sub.map((param: (string | number)) => {
            const data: StompData = {
                param: `${param}`, //groupMsg,friendMsg
                state: "ALARM", //0:endpoint 로드
            }
            const url = `/app/${subscribeDirection[index]}`
            stompClient.publish({
                destination: `${url}`,
                body: JSON.stringify(data),
            })
        })
    })
    onlineStateSetting(stompClient, "ONLINE");
    yield put(updateLoading({loading: true}));
}


function* addSubScribe(stompClient:CompatClient,) {
    while (true) {
        const { payload } = yield take(ADD_SUBSCRIBE);
        const param = payload.subScribeParam;
        stompClient.subscribe(`/topic/friendMsg/${param}`, (iMessage: IMessage) => {
            emiter(JSON.parse(iMessage.body));
        });
        stompClient.subscribe(`/user/topic/friendMsg/${param}`, (iMessage: IMessage) => {
            emiter(JSON.parse(iMessage.body));
        });
    }
}



function* closeWebSocketSaga(channel: any) {
    while (true) {
        const {payload} = yield take(UPDATE_STOMP_STATE)// 웹소켓 끊는 dispatch 발생 시 가져옴
        if (!payload.isConnect) {
            channel.close();
        }
    }
}

//제너레이터를 활용한 비동기식 처리
export function* initializeStompChannel(): any {
    const {payload} = yield take(SYNCHRONIZATION_STOMP)//액션을 기다린 후 dispatch 가 완료되면 실행
    yield startStomp(payload.destination);
}


function* startStomp(destination: string[][]): any {
    //비동기식 함수를 호출하는 call 을 사용하여 stompClient 를받아옴
    //saga 의 call 을 쓰면 Promise 또는 Generator 함수만 받으며 Promise 시 res 반환 전까지 saga 실행중지
    const stompClient = yield call(createStompConnection) //Stomp 를 connect 하는 함수, 성공 시 다음 명령 실행
    const channel = yield call(createEventChannel, stompClient, destination); //외부 이벤트 소스를 saga 의 이벤트를 발생하게 채널연결

    //함수 실행 후 백그라운드에도 유지
    yield fork(sendStomp, stompClient)
    yield fork(endPointStomp, stompClient)
    yield fork(sendPublish, destination, stompClient)
    yield fork(closeWebSocketSaga, channel)
    // yield fork(addSubScribe, channel, destination); // 추가 구독 감지 및 처리
    yield fork(addSubScribe, stompClient)
    let isRunning = true;

    //put : dispatch의 기능을 수행함
    while (isRunning) {
        //race : 경주랑 비슷하게 여러개의 사가 효과가 동시에 실행하고 먼저 완료되는 효과만 처리함
        const {receiveMessage, timeout} = yield race({
            timeout: delay(60 * 60 * 1000), //1시간 뒤 stomp 끊기게 설정 => delay :작업을 지연 시키는 메서드
            receiveMessage: take(channel), //액션을 기다린 후 dispatch 가 완료되면 실행
        });
        if (timeout) isRunning = false;
        const receiveData = yield put(receivedStompMsg({receiveMessage}));

        const {state, param, userId, message, endPoint, target} = receiveData.payload.receiveMessage

        console.log(state)

        if(state ==="ALARM"){
            target ==="groupMsg" ?
                groupEndPointMap.set(param, groupEndPointMap.get(param) || endPoint) :
                friendEndPointMap.set(param, friendEndPointMap.get(param) || endPoint)
        }

    }

}


//stomp 연결을 위한 함수 >>call 로 호출 > 비동기식으로 처리해주는 거, Promise 도 가능
function createStompConnection() {

    const stompUrl: string = "http://localhost:8080/ws-stomp"

    return new Promise((res, rej) => {

        const sock = () => new SockJS(stompUrl);
        const stompClient = Stomp.over(sock);


        // WebSocket 에러 처리
        stompClient.onWebSocketError = (error: Error) => {
            console.error('Error with websocket', error);
            rej(error);
        };

        // Stomp 에러 처리
        stompClient.onStompError = (frame: Frame) => {
            console.error('Broker reported error: ' + frame.headers['message']);
            console.error('Additional details: ' + frame.body);
            rej(frame);
        };

        stompClient.reconnectDelay = 5000; // 다시 연결 시도 delay : 5초
        stompClient.heartbeatIncoming = 4000; // 서버로부터 연결 수신확인/수신이 오지 않으면 끊긴걸로 간주
        stompClient.heartbeatOutgoing = 4000; // 클라이언트가 서버로 신호를 보냄, 연결이 활성상태를 알림

        stompClient.onConnect = () => {
            res(stompClient);
        };
        stompClient.activate();


    });

}

//stomp 를 유동적으로 쓰기위한 함수, 이벤트 채널을 발생 =>saga
function createEventChannel(stompClient: CompatClient, destination: string[][]) {

    //외부 이벤트 소스(예: 웹 소켓)를 Redux Saga 의 이벤트를 발생시키는 채널로 변환
    return eventChannel(emit => {
        //subscriber 함수는 새로운 구독이 시작될 때 호출되고, 구독이 종료될 때 호출되는 unsubscribe 함수를 반환
        const subscribeMessage = ()=> {
            destination.map((sub: string[], index: number) => {
                sub.map((param: string) => {
                    stompClient.subscribe(`/topic/${subscribeDirection[index]}/${param}`, (iMessage: IMessage) => {
                        emit(JSON.parse(iMessage.body));
                    })
                    //공통으로 쓰는 것(1:N)은 각각의 개인 구독(/user)처리를 추가로 해야함, 개인 구독을 통해 파일을 읽어오는 등의 개인적 처리는 상대방에게 공유되지 않음
                    if (subscribeDirection[index] === "groupMsg" || subscribeDirection[index] === "friendMsg") {
                        stompClient.subscribe(`/user/topic/${subscribeDirection[index]}/${param}`, (iMessage: IMessage) => {
                            emit(JSON.parse(iMessage.body));
                        })
                    }
                })
            })
        };
        subscribeMessage();
        emiter = emit
        // 제네레이터 함수 선언

        return function unsubscribe() {
            onlineStateSetting(stompClient, "OFFLINE");
            //stompClient.disconnect();//연결 끊기(완전히
            stompClient.deactivate().then(r => {
            }); //연결 끊기(임시 비활성화
        };
        //크기를 지정하고 버퍼에 새로운 항목이 추가될 때마다 버퍼의 크기를 동적으로 확장
        //인자로는 확장의 최장크기(크기제한)
    }, buffers.expanding<number>(1000) || buffers.none())
}

function onlineStateSetting(stompClient: CompatClient, msg: stateType) {
    const userId = localStorage.getItem("userId");
    console.log("onlineStateSetting 실행", userId)
    if (userId != null) {
        const data: StompData = {
            param: `${userId}`, //groupMsg,friendMsg
            state: msg, //0:endpoint 로드
        }
        const url = `/app/personalTopic`
        stompClient.publish({
            destination: `${url}`,
            body: JSON.stringify(data),
        })
    }
}