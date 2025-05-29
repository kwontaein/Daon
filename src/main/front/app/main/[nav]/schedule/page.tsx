import DaonCalendar from "@/components/main/schedule/calendar";
import '@/components/share/loading/loading.scss'
import { getUserInfo } from "@/features/user/userApi";

export default async function SchedulePage() {
    const user = await getUserInfo()

    return (
        <DaonCalendar user={user}/>
    )
}