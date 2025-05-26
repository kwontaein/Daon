import CustomerSearch from "@/components/main/customer/search/search";
import CustomLoading from "@/components/share/loading/loading";
import { getAffiliation } from "@/features/customer/affiliation/api/server-api";
import { searchCustomersApi } from "@/features/customer/customer/api/server-api";
import { Affiliation } from "@/model/types/customer/affiliation/type";
import { CustomerSearchCondition, ResponseCustomer } from "@/model/types/customer/customer/type";
import { PageByProps } from "@/model/types/share/type";
import { Suspense } from "react";




const allCustomerRequestBody:CustomerSearchCondition ={
    category: null,
    cateId:null,
    searchTarget :'all',
    customerName: null,
    ceo:null,
}
export default async function CustomerPage({searchParams}:PageByProps) {
    const page = (await searchParams).page || 1;

    const affiliations:Affiliation[] = await getAffiliation()
    const initialCustomers:ResponseCustomer[] = await searchCustomersApi(allCustomerRequestBody)

    return (
        <section>
            <Suspense fallback={<CustomLoading content="거래처 정보를 조회중입니다."/>}>
                <CustomerSearch affiliations={affiliations} initialCustomers={initialCustomers} page={page}/>
            </Suspense>
        </section>
    )
}