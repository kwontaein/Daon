import { getUserSchedule } from "@/features/schedule/api/scheduleApi";
import {
    keepPreviousData,
    QueryClient,
    useInfiniteQuery,
    useMutation,
    useQuery,
    useQueryClient
} from "@tanstack/react-query";

export const QUERY_USER_SCHEDULE = "QUERY_USER_SCHEDULE"

export const useFetchCalendar =  (userId:string, year:number)=>
    useQuery({
        queryKey:[QUERY_USER_SCHEDULE, year],
        queryFn:()=>getUserSchedule(userId, year),
    })



export const queryClient = new QueryClient();