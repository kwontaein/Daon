import AccountingSearch from "@/components/main/accounting/search";
import { getCardTransactionfApi } from "@/features/accounting/api/accountingSearchApi";
import {getCompany} from "@/features/staff/company/api/company-api";
import { PageByProps } from "@/model/types/share/type";

export default async function CardPage({searchParams}:PageByProps){
    const page = (await searchParams).page ||1;
    
    const companyList = await getCompany()
    const cardTransactionList = await getCardTransactionfApi()

    return(
        <AccountingSearch companyList={companyList} division='card' initalListState={cardTransactionList} page={page}/>
    )
}