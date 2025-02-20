import CustomerForm from "@/components/main-view/customer/register/customer-form";

export default async function RegisterCustomerCate(){
    
    const customerCate = await fetch("http://localhost:8080/api/getCustomerCate",{
        next: {revalidate: 360000, tags: ['customersCate']} //1시간마다 재검증
    }).then(async (response) => {
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const text = await response.text();
        if (!text) return [];
        return JSON.parse(text);
    }).catch((error) => {console.error('Error:', error)})

    return(
        <CustomerForm customerCate={customerCate}/>
    )
}