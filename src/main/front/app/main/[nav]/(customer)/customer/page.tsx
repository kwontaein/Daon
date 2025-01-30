import CustomerSearch from "@/components/main-view/customer/search";
import CustomerSearchResult from "@/components/main-view/customer/search-result";
import axios from "axios";

interface Customer {
    customerId: string; // UUID는 문자열로 처리
    customerName: string;
    contactInfo: string;
    category: string;
    phoneNumber: string;
    fax: string;
    userId: string;
    cateId: string; // UUID는 문자열로 처리
  }
export default async function CustomerPage() {
    // const response = await fetch('http://localhost:8080/api/getCustomers', {
    //     cache: 'no-store',
    // });

    const response2 = await axios.post("http://localhost:8080/api/getCustomers", {
        params: {
            customerId: null, // UUID는 문자열로 처리
            customerName: null,
            contactInfo: null,
            category: null,
            phoneNumber: null,
            fax: null,
            userId: null,
            cateId: null,
        },
      });
    console.log(response2)
    return (
        <section>
            <CustomerSearch/>
            <CustomerSearchResult/>
        </section>
    )
}