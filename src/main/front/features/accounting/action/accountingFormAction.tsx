import {UnionAccountingType, VAT} from "@/model/types/accounting/type"
import {
    saveCardTransactionApi,
    saveExpenseProofApi,
    saveProcurementApi,
    savePurchaseVatApi,
    saveSalesVATApi,
    updateCardTransactionApi,
    updateExpenseProofApi,
    updateProcurementApi,
    updatePurchaseVatApi,
    updateSalesVATApi
} from "../api/form-server-api";


const apiMap = {
    write: {
        pvat: savePurchaseVatApi,
        svat: saveSalesVATApi,
        card: saveCardTransactionApi,
        proof: saveExpenseProofApi,
        pset: saveProcurementApi,
    },
    edit: {
        pvat: updatePurchaseVatApi,
        svat: updateSalesVATApi,
        card: updateCardTransactionApi,
        proof: updateExpenseProofApi,
        pset: updateProcurementApi,
    }
};

export default async function accountingFormAction(prevState, formData) {

    const formState: UnionAccountingType = {
        purchaseVATId: prevState.purchaseVATId,
        salesVATId: prevState.salesVATId,
        cardTransactionId: prevState.cardTransactionId,
        expenseProofId: prevState.expenseProofId,
        procurementSettlementId: prevState.procurementSettlementId,
        categorySelection: formData.get('categorySelection'),
        date: formData.get('date'),
        customerId: formData.get('customerId'),
        businessNumber: formData.get('businessNumber'),
        customerName: formData.get('customerName'),
        amount: formData.get('amount'),
        vat: formData.get('vat'),
        total: formData.get('total'),
        note: formData.get('note'),
        memo: formData.get('memo'),
        paidDate: formData.get('paidDate'),
        cardCompany: formData.get('cardCompany'),
        paymentDetails: formData.get('paymentDetails'),
        modelName: formData.get('modelName'),   // 모델명
        vendor: formData.get('vendor'),   // 매입처
        quantity: formData.get('quantity'),    // 수량
        acceptance: formData.get('acceptance'),    // 인수
        installation: formData.get('installation'), // 설치
        payment: formData.get('payment'),   // 결재
    }

    let status;
    const action = formData.get('action')
    const mode = formData.get('mode')
    if (action) {
        const postData = Object.fromEntries(Object.entries({...formState})
            .filter(([key, value]) => value !== 'none' && value !== null)
            .map(([key, value]) => {
                if (['amount', 'vat', 'total', 'quantity'].includes(key) && value) {
                    return [key, (value as string).replace(/,/g, "").replace(/\D/g, "")]
                }
                return [key, value]
            }))

        if (mode in apiMap && action in apiMap[mode]) {
            status = await apiMap[mode][action](postData);
        }
    }

    delete prevState.status;

    return {
        ...prevState,
        ...formState,
        status,
    }
}