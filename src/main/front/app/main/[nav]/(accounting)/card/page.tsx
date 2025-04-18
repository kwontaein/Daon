import AccountingSearch from "@/components/main/accounting/search";
import { getCardTransactionfApi } from "@/features/accounting/api/accountingSearchApi";
import getCompany from "@/features/staff/company/api/company-api";

export default async function CardPage(){
    
    const companyList = await getCompany()
    const cardTransactionList = await getCardTransactionfApi()
    return(
        <AccountingSearch companyList={companyList} division='card'/>
    )
}