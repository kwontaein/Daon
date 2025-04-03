import LedgerOfficialSearch from "@/components/main/ledger/ledger-official/search";
import { getOfficialApi } from "@/features/sales/official/api/officialApi";

export default async function LedgerOfficialPage(){
    const officials =await getOfficialApi();

    return(
        <LedgerOfficialSearch officials={officials}/>
    )
}