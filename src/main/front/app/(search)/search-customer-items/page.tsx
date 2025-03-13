import CustomerSearchItems from "@/components/share/search-items/customer-search-items";
import { searchCustomersApi } from "@/features/customer/customer/api/searchCustomerApi";
import { CustomerSearchCondition, ResponseCustomer } from "@/model/types/customer/customer/type";
import { SearchNameProps } from "@/model/types/share/type";
import { revalidateTag } from "next/cache";

export default async function SearchCustomerItemsPage({searchParams} : SearchNameProps) {
    const page = (await searchParams).page ||1;
    const customerName = (await searchParams).searchName;

    const postSearchInfo:CustomerSearchCondition = {
        category:null,
        cateId:null,
        searchTarget :'all',
        customerName: customerName,
        ceo:null,
    }
    const searchResult:ResponseCustomer[] = await searchCustomersApi(postSearchInfo)
    const pageByCustomers = searchResult.slice((page-1)*20, ((page-1)*20)+20)

    if (typeof window !== "undefined") {
        window.addEventListener("beforeunload", () => {
          revalidateTag(`${customerName}`);
        });
      }
      
    return(
        <CustomerSearchItems customers={pageByCustomers} page={page} pageLength={searchResult.length}/>
    )
}