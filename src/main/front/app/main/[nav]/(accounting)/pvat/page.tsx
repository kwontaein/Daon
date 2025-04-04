import AccountingSearch from "@/components/main/accounting/search";
import getCompany from "@/features/staff/company/api/company-api";

export default async function PvatPage(){
    
    const companyList = await getCompany()
    
    return(
        <AccountingSearch companyList={companyList} division='pvat'/>
    )
}