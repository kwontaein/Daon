import AccountingSearch from "@/components/main/accounting/search";
import { getSalesVATApi } from "@/features/accounting/api/accountingSearchApi";
import getCompany from "@/features/staff/company/api/company-api";

export default async function SvatPage(){
    
    const companyList = await getCompany()
    const salesVatList = await getSalesVATApi()
    console.log(salesVatList)
    return(
        <AccountingSearch companyList={companyList} division='svat'/>
    )
}