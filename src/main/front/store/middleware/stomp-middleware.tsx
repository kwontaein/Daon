import {CompatClient, Frame, IMessage, Stomp} from "@stomp/stompjs";
import SockJS from "sockjs-client";
import {call, delay, fork, put, race, take} from 'redux-saga/effects';
import {buffers, END, eventChannel} from 'redux-saga';
import { DISCONNECT_STOMP, receivedStompMsg, SYNCHRONIZATION_STOMP } from "../slice/stomp-reducer";
import revalidateHandler from "@/features/revalidateHandler";





// unConnect stomp
function* closeWebSocketSaga(channel: any) {
    while (true) {
        const {payload} = yield take(DISCONNECT_STOMP)// 웹소켓 끊는 dispatch 발생 시 가져옴
        if (payload) {
            channel.close();
        }
    }
}

//제너레이터를 활용한 비동기식 처리
export function* initializeStompChannel(): any {
    const {payload} = yield take(SYNCHRONIZATION_STOMP)//액션을 기다린 후 dispatch 가 완료되면 실행
    if(payload){
        yield startStomp();
    }
}


function* startStomp(): any {
    //saga 의 call 을 쓰면 Promise 또는 Generator 함수만 받으며 Promise 시 res 반환 전까지 saga 실행중지
    const stompClient = yield call(createStompConnection)
    const channel = yield call(createEventChannel, stompClient); //외부 이벤트 소스를 saga 의 이벤트를 발생하게 채널연결

    //fork -> 백그라운드에서도 유지
    yield fork(closeWebSocketSaga, channel)


    let isRunning = true;

    //put : dispatch의 기능을 수행함
    while (isRunning) {
        //race -> 먼저 끝나는 것부터 처리
        const {Message, timeout} = yield race({
            timeout: delay(60 * 60 * 1000 * 24), 
            Message: take(channel), //액션을 기다린 후 dispatch 가 완료되면 실행
        });
        TODO:// 검색 상태가 아닐 때 실시간 갱신 revalidatePath추가 => take를 통해 검색상태 가져오기
        revalidateHandler(Message.destination)
        console.log(Message)
        if (timeout) isRunning = false;
        yield put(receivedStompMsg(Message));
    }

}


/**stomp 연결을 위한 함수 >>call 로 호출 > 비동기식으로 처리해주는 거, Promise 도 가능*/
function createStompConnection() {

    const stompUrl: string = `${process.env.NEXT_PUBLIC_API_URL}/ws-stomp`

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
            console.error('Broker reported error: ' + frame.headers['Message']);
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
function createEventChannel(stompClient: CompatClient) {

    //외부 이벤트 소스(예: 웹 소켓)를 Redux Saga 의 이벤트를 발생시키는 채널로 변환
    return eventChannel(emit => {
        //subscriber 함수는 새로운 구독이 시작될 때 호출되고, 구독이 종료될 때 호출되는 unsubscribe 함수를 반환
        const subscribeMessage = ()=> {
            stompClient.subscribe(`/topic/transaction_alert`, (iMessage: IMessage) => {
                emit(JSON.parse(iMessage.body));
            })
        
        };
        subscribeMessage();
        // 제네레이터 함수 선언

        return function unsubscribe() {
            //stompClient.disconnect();//연결 끊기(완전히
            stompClient.deactivate().then(r => {
            }); //연결 끊기(임시 비활성화
        };
    }, buffers.expanding<number>(1000) || buffers.none())
}
