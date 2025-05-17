import DaonCalendar from "@/components/main/schedule/calendar";
import { cookies } from "next/headers";

export default async function SchedulePage() {
    const user = (await cookies()).get('user')?.value

    return <DaonCalendar user={JSON.parse(user)}/>
}