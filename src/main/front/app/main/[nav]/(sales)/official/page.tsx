import OfficialCate from "@/components/main/sales/official/official";
import { getOfficialApi } from "@/features/sales/official/api/officialApi";

export default async function OfficialPage(){

    const official =await getOfficialApi();
    return <OfficialCate officials={official} key={official}/>
}