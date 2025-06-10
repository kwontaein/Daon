'use client'

import jwtFilter from "@/features/share/jwtFilter";
import { StockCate } from "@/model/types/stock/cate/type";


export const deleteStockCateApi = async (stock: StockCate) => {

    return fetch(`/api/deleteStockCate`, {
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify(stock),
        cache: 'no-store'
    }).then(async (response) => {
        if(!response.ok){
            jwtFilter(response.status.toString());
        }

        return response.status
    }).catch (async (error)=> {
        if (error instanceof Response) {
            const { message } = await error.json();
            throw new Error(message);
        }
        if (error instanceof Error) {
            throw error;
        }
        throw new Error('알 수 없는 오류가 발생했습니다.');
    })
}