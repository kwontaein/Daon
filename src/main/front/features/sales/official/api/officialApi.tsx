// 'use server';

// import { StockCate } from "@/model/types/stock/cate/type";
// import { revalidatePath, revalidateTag } from "next/cache";


// export const updateStockCateApi = async (cates: StockCate[]) => {
//     return fetch("http://localhost:8080/api/updateStockCate", {
//         method: "POST",
//         headers: {
//             'Content-Type': 'application/json',
//         },
//         body: JSON.stringify(cates),
//         cache:'no-store'
//     }).then(async (response) => {
//         if (!response.ok) {
//             throw new Error(`HTTP error! status: ${response.status}`);
//         }
//         if(response.status===500){
//             window.alert('문제가 발생했습니다 관리자에게 문의해주세요.')
//         }
//         revalidateTag("stocksCate");
//         // revalidatePath("/main/stock/stock-cate");
//         return response.status
//     }).catch((error) => {
//         console.error('Error:', error)
//     })
// }

// export const saveStockCateApi = async (stock: Pick<StockCate, 'stockCateName'>) => {
//     return fetch("http://localhost:8080/api/saveStockCate", {
//         method: "POST",
//         headers: {
//             'Content-Type': 'application/json',
//         },
//         body: JSON.stringify(stock),
//         cache:'no-store'
//     }).then(async (response) => {
//         if (!response.ok) {
//             throw new Error(`HTTP error! status: ${response.status}`);
//         }
//         if(response.status===500){
//             window.alert('문제가 발생했습니다 관리자에게 문의해주세요.')
//         }
//         revalidateTag("stocksCate");
//         // revalidatePath("/main/stock/stock-cate");
//         return response.status
//     }).catch((error) => {
//         console.error('Error:', error)
//     })
// }


// export const deleteStockCateApi =async (stock: StockCate) => {
//     return fetch("http://localhost:8080/api/deleteStockCate", {
//         method: "POST",
//         headers: {
//             'Content-Type': 'application/json',
//         },
//         body: JSON.stringify(stock),
//         cache:'no-store'
//     }).then(async (response) => {
//         if (!response.ok) {
//             throw new Error(`HTTP error! status: ${response.status}`);
//         }
//         if(response.status===500){
//             window.alert('문제가 발생했습니다 관리자에게 문의해주세요.')
//         }
//         revalidateTag("stocksCate")
//         // revalidatePath("/main/stock/stock-cate");
//         return response.status
//     }).catch((error) => {
//         console.error('Error:', error)
//     })
// }