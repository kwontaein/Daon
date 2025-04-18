import AccountingSearch from "@/components/main/accounting/search";
import { getPurchaseVatApi } from "@/features/accounting/api/accountingSearchApi";
import getCompany from "@/features/staff/company/api/company-api";

export default async function PvatPage(){
    
    const companyList = await getCompany()
    const purchaseVatList = await getPurchaseVatApi()

    return(
        <AccountingSearch companyList={companyList} division='pvat'/>
    )
}