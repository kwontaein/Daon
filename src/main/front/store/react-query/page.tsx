import {
    keepPreviousData,
    QueryClient,
    useInfiniteQuery,
    useMutation,
    useQuery,
    useQueryClient
} from "@tanstack/react-query";

export const QUERY_USER_SCHEDULE = "QUERY_USER_SCHEDULE"

export const useFetchCalendar =  (year:number,month:number)=>
    useQuery({
        queryKey:[QUERY_USER_SCHEDULE,year,month],
        queryFn:()=>{}
    })


