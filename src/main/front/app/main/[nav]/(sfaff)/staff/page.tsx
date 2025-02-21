import StaffTable from "@/components/main-view/staff/staff-table";

interface StaffPageProps{
    searchParams:Promise<{
        page:number|undefined,
    }>
}
export default async function StaffPage({searchParams}:StaffPageProps){
    const page = (await searchParams).page ||0
    return(
        <div>
            <StaffTable initialStaff={[]} page={page}/>
        </div>
    )
}