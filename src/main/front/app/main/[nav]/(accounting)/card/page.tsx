import AccountingSearch from "@/components/main/accounting/search";
import {getAllCardTransactionApi} from "@/features/accounting/api/search-server-api";
import {getCompany} from "@/features/staff/company/api/server-api";
import {PageByProps} from "@/model/types/share/type";

export default async function CardPage({searchParams}: PageByProps) {
    const page = (await searchParams).page || 1;

    const companyList = await getCompany()
    const cardTransactionList = await getAllCardTransactionApi()

    return (
        <AccountingSearch
            companyList={companyList}
            division='card'
            initialListState={cardTransactionList}
            page={page}/>    
    )
}