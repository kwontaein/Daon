import { ResponseCustomer } from "@/model/types/customer/customer/type"
import { ResponseEstimate } from "@/model/types/sales/estimate/type"
import { ResponseOfficial } from "@/model/types/sales/official/type"
import { ResponseReceipt } from "@/model/types/sales/receipt/type"
import { ResponseTask } from "@/model/types/sales/task/type"
import { ResponseCompany } from "@/model/types/staff/company/type"
import { ResponseEmployee } from "@/model/types/staff/employee/type"
import { ResponseStock } from "@/model/types/stock/stock/types"
import { create } from "zustand"



export type ModalState = {
    receipt:Partial<ResponseReceipt>//전표
    estimate:Partial<ResponseEstimate>,//견적서
    customer:Partial<ResponseCustomer>,//거래처
    customerList:Pick<ResponseCustomer,'customerId'| 'customerName'>[],
    task:Partial<ResponseTask>,//업무
    stock:Partial<ResponseStock>,//물품
    stockList:ResponseStock[],
    official:Partial<ResponseOfficial>//관리비
    company:Partial<ResponseCompany>,
    employee:Partial<ResponseEmployee>,
    modalPage:number,
    searchKeyword:string;
    postData:Partial<ResponseStock>| Partial<ResponseCustomer>
    reset:()=>void,
    setModalState:(state:Partial<ModalState>)=>void
    modalKey:string //모달을 식별하여 처리하기 위한 key
}


const initialModalState = {
    receipt:{},//전표
    estimate:{},//견적서
    customer:{},//거래처
    customerList:[],
    task:{},//업무
    stock:{},//물품
    stockList:[],
    official:{},//관리비
    company:{},
    employee:{},
    searchKeyword:'',
    modalPage:0,
    modalKey:'',
}

export const useModalState = create<ModalState>(set=>({
    ...initialModalState,
    postData:{},
    reset:()=>set((state)=>({...state, ...initialModalState})),
    setModalState:(changeState)=>set((state)=>({...state, ...changeState}))
}))