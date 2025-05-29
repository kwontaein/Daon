import { getUserSchedule } from "@/features/schedule/api/scheduleApi";
import {
    useQuery,

} from "@tanstack/react-query";

export const QUERY_USER_SCHEDULE = "QUERY_USER_SCHEDULE"
export const QUERY_USER_INFO = "QUERY_USER_INFO"

export const useFetchCalendar =  (userId:string, year:number)=>
    useQuery({
        queryKey:[QUERY_USER_SCHEDULE, year],
        queryFn:()=>getUserSchedule(userId, year),
    })


