import AccountingSearch from "@/components/main/accounting/search";
import {getExpenseProofApi} from "@/features/accounting/api/accountingSearchApi";
import {getCompany} from "@/features/staff/company/api/company-api";
import {PageByProps} from "@/model/types/share/type";

export default async function ProofPage({searchParams}: PageByProps) {
    const page = (await searchParams).page || 1;

    const companyList = await getCompany()
    const expenseProoList = await getExpenseProofApi()
    return (
        <AccountingSearch companyList={companyList} division='proof' initialListState={expenseProoList} page={page}/>
    )
}