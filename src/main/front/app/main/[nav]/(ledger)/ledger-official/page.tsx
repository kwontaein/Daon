import LedgerOfficialSearch from "@/components/main/ledger/ledger-official/search";
import { getOfficialApi } from "@/features/sales/official/api/server-api";

export default async function LedgerOfficialPage(){
    const officials =await getOfficialApi();

    return(
        <LedgerOfficialSearch officials={officials}/>
    )
}