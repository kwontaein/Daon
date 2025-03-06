import CustomerCate from "@/components/main/customer/cate/customer-cate";


export default async function CustomerCatePage() {
    const InitCustomerCate = await fetch("http://localhost:8080/api/getCustomerCate",
        {
            cache:'force-cache',
            next: { tags: ['customersCate']} 
        }
    )
    .then((response)=> response.json())
    .catch((error) => console.error('Error:', error));

    return (
        <section key={JSON.stringify(InitCustomerCate)}>
            <CustomerCate InitCustomerCate={InitCustomerCate}/>
        </section>
    )
}