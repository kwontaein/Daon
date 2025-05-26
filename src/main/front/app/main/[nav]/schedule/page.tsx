import DaonCalendar from "@/components/main/schedule/calendar";
import { cookies } from "next/headers";
import '@/components/share/loading/loading.scss'
import { Suspense } from "react";
import CustomLoading from "@/components/share/loading/loading";
import { getUserInfo } from "@/features/user/userApi";

export default async function SchedulePage() {
    const user = await getUserInfo()

    return (
        <DaonCalendar user={user}/>
    )
}