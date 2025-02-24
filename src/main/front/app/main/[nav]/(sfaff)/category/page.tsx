import StaffCate from "@/components/main-view/staff/cate/staff-cate";


export default async function StaffCatePage() {
    // const InitStaffCate = await fetch("http://localhost:8080/api/getStaffCateList",
    //     {
    //         cache:'force-cache',
    //         next: { tags: ['staffCate']} 
    //     }
    // )
    // .then((response)=> response.json())
    // .catch((error) => console.error('Error:', error));

    return (
        <section key={JSON.stringify([])}>
            <StaffCate InitStaffCate={[]}/>
        </section>
    )
}