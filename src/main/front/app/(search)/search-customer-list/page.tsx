import CustomerListSearch from "@/components/share/search-items/customer-list-search";
import CustomerSearchItems from "@/components/share/search-items/customer-search";
import { searchCustomersApi } from "@/features/customer/customer/api/server-api";
import { CustomerSearchCondition, ResponseCustomer } from "@/model/types/customer/customer/type";
import { SearchNameProps } from "@/model/types/share/type";
import { revalidateTag } from "next/cache";

export default async function SearchCustomerListPage({searchParams} : SearchNameProps) {
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

    if (typeof window !== "undefined") {
        window.addEventListener("beforeunload", () => {
          revalidateTag(`${customerName}`);
        });
      }
      
    return(
        <CustomerListSearch initialcustomers={searchResult} page={page}/>
    )
}