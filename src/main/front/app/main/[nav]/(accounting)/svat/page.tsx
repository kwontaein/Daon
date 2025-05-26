import AccountingSearch from "@/components/main/accounting/search";
import {getSalesVATApi} from "@/features/accounting/api/search-server-api";
import {getCompany} from "@/features/staff/company/api/server-api";
import {PageByProps} from "@/model/types/share/type";

export default async function SvatPage({searchParams}: PageByProps) {
    const page = (await searchParams).page || 1;

    const companyList = await getCompany()
    const initialSalesVatList = await getSalesVATApi()

    return (
        <>
            <AccountingSearch companyList={companyList} division='svat' initialListState={initialSalesVatList}
                              page={page}/>
        </>
    )
}