import PVATSaerchResult from "@/components/main/accounting/pvat/search-result";
import AccountingSearch from "@/components/main/accounting/search";
import {getPurchaseVatApi} from "@/features/accounting/api/accountingSearchApi";
import {getCompany} from "@/features/staff/company/api/company-api";
import {PageByProps} from "@/model/types/share/type";

export default async function PvatPage({searchParams}: PageByProps) {
    const page = (await searchParams).page || 1;

    const companyList = await getCompany()
    const initialPurchaseVATList = await getPurchaseVatApi()

    return <AccountingSearch companyList={companyList} division='pvat' initialListState={initialPurchaseVATList}
                             page={page}/>
}