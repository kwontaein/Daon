import AccountingForm from "@/components/main/accounting/accounting-form";
import {getCategorySelectionApi} from "@/features/accounting/api/form-server-api";
import {
    getCardTransactionfApi,
    getExpenseProofApi,
    getProcurementApi,
    getPurchaseVatApi,
    getSalesVATApi
} from "@/features/accounting/api/search-server-api";
import {AccountingDivision} from "@/model/types/accounting/type";
import {notFound} from "next/navigation";

export default async function AccountingPage({searchParams}: {
    searchParams: Promise<{
        division: string
        mode: 'detail' | 'edit'
        target: string
    }>
}) {
    const division = (await searchParams).division
    const mode = (await searchParams).mode || 'edit'
    const id = (await searchParams).target || ''
    const categorySelections = await getCategorySelectionApi()
    
    // division이 매핑되지 않거나, 잘못된 mode url 전달 및 데이터가 없으면 notFound()
    if (!AccountingDivision[division] || !['detail', 'edit'].includes(mode) || !id) {
        notFound()
    }
    let accountingData;
    switch (AccountingDivision[division]) {
        case "매입부가세" :
            accountingData = await getPurchaseVatApi({purchaseVATId: id})
            break;
        case "매출부가세" :
            accountingData = await getSalesVATApi({salesVATId: id})
            break;
        case "카드증빙" :
            accountingData = await getCardTransactionfApi({cardTransactionId: id})
            break;
        case "지출증빙" :
            accountingData = await getExpenseProofApi({expenseProofId: id})
            break;
        case "조달및수의" :
            accountingData = await getProcurementApi({procurementSettlementId: id})
            break;
    }


    return <AccountingForm mode={mode} division={division as keyof typeof AccountingDivision}
                           categorySelections={categorySelections} accountingData={accountingData.at(-1)}/>
}