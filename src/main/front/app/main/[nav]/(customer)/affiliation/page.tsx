import Affiliation from "@/components/main/customer/affiliation/affiliation";


export default async function AffiliationPage() {
    const affiliations = await fetch("http://localhost:8080/api/getAffiliation",
        {
            cache:'force-cache',
            next: { tags: ['affiliation']} 
        }
    )
    .then((response)=> response.json())
    .catch((error) => console.error('Error:', error));

    return <Affiliation affiliations={affiliations}/>

}