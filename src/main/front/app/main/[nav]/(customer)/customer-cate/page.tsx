import CustomerCate from "@/components/main-view/customer/cate/customer-cate";

export default async function CustomerCatePage() {

    const data = await fetch("http://localhost:8080/api/getCustomerCate")
        .then((response)=> response.json())
        .catch((error) => console.error('Error:', error));
        
    console.log(data)
    return (
        <section>
            <CustomerCate customerCate={data}/>
        </section>
    )
}