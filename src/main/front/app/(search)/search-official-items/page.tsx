import OfficialSearchItems from "@/components/share/search-items/official-search";
import {getOfficialApi} from "@/features/sales/official/api/server-api";
import {ResponseOfficial} from "@/model/types/sales/official/type";
import {SearchNameProps} from "@/model/types/share/type";
import {revalidateTag} from "next/cache";


export const revalidate = 600;
export default async function SearchOfficialItemsPage({searchParams}: SearchNameProps) {
    const page = (await searchParams).page || 1;
    const officialName = (await searchParams).searchName;

    const searchResult: ResponseOfficial[] = await getOfficialApi(officialName)
    const pageByOfficial = searchResult.slice((page - 1) * 20, ((page - 1) * 20) + 20)

    if (typeof window !== "undefined") {
        window.addEventListener("beforeunload", () => {
            revalidateTag(`${officialName}`);
        });
    }
    return (
        <OfficialSearchItems
            officials={pageByOfficial}
            page={page}
            pageLength={searchResult.length}/>
    )
}