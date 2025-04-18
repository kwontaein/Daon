import AccountingSearch from "@/components/main/accounting/search";
import { getExpenseProofApi } from "@/features/accounting/api/accountingSearchApi";
import getCompany from "@/features/staff/company/api/company-api";

export default async function ProofPage(){
    
    const companyList = await getCompany()
    const expenseProoList = await getExpenseProofApi()
    return(
        <AccountingSearch companyList={companyList} division='proof'/>
    )
}