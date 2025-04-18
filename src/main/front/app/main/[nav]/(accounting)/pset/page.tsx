import AccountingSearch from "@/components/main/accounting/search";
import { getProcurementApi } from "@/features/accounting/api/accountingSearchApi";
import getCompany from "@/features/staff/company/api/company-api";
import { PageByProps } from "@/model/types/share/type";

export default async function PsetPage({searchParams}:PageByProps){
    const page = (await searchParams).page ||1;

    const companyList = await getCompany()
    const procurementList = await getProcurementApi();
    return(
        <AccountingSearch companyList={companyList} division='pset' initalListState={procurementList} page={page}/>
    )
}