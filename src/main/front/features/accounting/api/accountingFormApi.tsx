import { CardTransaction, ExpenseProof, ProcurementSettlement, PurchaseVAT, SalesVAT, UnionAccountingType } from "@/model/types/accounting/type";

//회계 거래처분류 
export async function getCategorySelectionApi(){
    try {
        const response = await fetch("http://localhost:8080/api/getCategorySelection", {
            headers: { 'Content-Type': 'application/json' },
        });

        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);

        const text = await response.text();
        return text ? JSON.parse(text) : [];
    } catch (error) {
        console.error('Error:', error);
    }
}

//매입부가세
export async function savePurchaseVatApi(saveData:UnionAccountingType){
    try{
        const response = await fetch("http://localhost:8080/api/savePurchaseVAT", {
            method:"POST",
            headers : {
                'Content-Type': 'application/json'
            },
            body:JSON.stringify(saveData as PurchaseVAT)
        })
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);

        return response.status;
    } catch (error) {
        console.error('Error:', error);
    }
}
//매출부가세
export async function saveSalesVATApi(saveData:UnionAccountingType){
    console.log(saveData)
    try{
        const response = await fetch("http://localhost:8080/api/saveSalesVAT", {
            method:"POST",
            headers : {
                'Content-Type': 'application/json'
            },
            body:JSON.stringify(saveData as SalesVAT)
        })
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);

        return response.status;
    } catch (error) {
        console.error('Error:', error);
    }
}
//카드증빙
export async function saveCardTransactionApi(saveData:UnionAccountingType){
    try{
        const response = await fetch("http://localhost:8080/api/saveCardTransaction", {
            method:"POST",
            headers : {
                'Content-Type': 'application/jsonmethod'
            },
            body:JSON.stringify(saveData as CardTransaction)
        })
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);

        return response.status;
    } catch (error) {
        console.error('Error:', error);
    }
}
//지출증빙
export async function saveExpenseProofApi(saveData:UnionAccountingType){
    try{
        const response = await fetch("http://localhost:8080/api/saveExpenseProof", {
            method:"POST",
            headers : {
                'Content-Type': 'application/jsonmethod'
            },
            body:JSON.stringify(saveData as ExpenseProof)
        })
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);

        return response.status;
    } catch (error) {
        console.error('Error:', error);
    }
}

//조달 및 수의 계산정산
export async function saveProcurementApi(saveData:UnionAccountingType){
    try{
        const response = await fetch("http://localhost:8080/api/saveProcurement", {
            method:"POST",
            headers : {
                'Content-Type': 'application/jsonmethod'
            },
            body:JSON.stringify(saveData as ProcurementSettlement)
        })
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);

        return response.status;
    } catch (error) {
        console.error('Error:', error);
    }
}
