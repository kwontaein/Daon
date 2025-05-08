'use client'
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import React from "react";

export const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            staleTime: undefined, //만료시간 설정 : 1시간
            refetchIntervalInBackground: true, //백그라운드에서는 refetch를 막음
            retry: 3,
        },
        mutations: {
            //retry: 1,
        },
    },
  });
export default function CalendarLayout({children}:{children:React.ReactNode}){
    return(
        <QueryClientProvider client={queryClient}>
            {children}
        </QueryClientProvider>
    )
}