import Affiliation from "@/components/main/customer/affiliation/affiliation";


export default async function AffiliationPage() {
    const InitAffiliation = await fetch("http://localhost:8080/api/getAffiliation",
        {
            cache:'force-cache',
            next: { tags: ['affiliation']} 
        }
    )
    .then((response)=> response.json())
    .catch((error) => console.error('Error:', error));

    return (
        <section key={JSON.stringify(InitAffiliation)}>
            <Affiliation InitAffiliation={InitAffiliation}/>
        </section>
    )
}