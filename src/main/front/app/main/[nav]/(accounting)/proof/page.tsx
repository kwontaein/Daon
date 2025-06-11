import AccountingSearch from "@/components/main/accounting/search";
import {getAllExpenseProofApi} from "@/features/accounting/api/search-server-api";
import {getCompany} from "@/features/staff/company/api/server-api";
import {PageByProps} from "@/model/types/share/type";

export default async function ProofPage({searchParams}: PageByProps) {
    const page = (await searchParams).page || 1;

    const companyList = await getCompany()
    const expenseProoList = await getAllExpenseProofApi()
    return (
        <AccountingSearch
            companyList={companyList}
            division='proof'
            initialListState={expenseProoList}
            page={page}/>    
    )
}