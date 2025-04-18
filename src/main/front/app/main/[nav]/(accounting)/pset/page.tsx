import AccountingSearch from "@/components/main/accounting/search";
import { getProcurementApi } from "@/features/accounting/api/accountingSearchApi";
import getCompany from "@/features/staff/company/api/company-api";

export default async function PsetPage(){
    
    const companyList = await getCompany()
    const procurementList = await getProcurementApi();
    return(
        <AccountingSearch companyList={companyList} division='pset'/>
    )
}