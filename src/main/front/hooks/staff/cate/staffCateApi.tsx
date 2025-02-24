'use server';
import { StaffCate } from "@/types/staff/cate/type";
import { revalidatePath, revalidateTag } from "next/cache";


export const updateCateApi = async (staff: StaffCate[]) => {
    return fetch("http://localhost:8080/api/updatestaffCate", {
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(staff),
        cache:'no-store'
    }).then(async (response) => {
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        if(response.status===500){
            window.alert('문제가 발생했습니다 관리자에게 문의해주세요.')
        }
        revalidateTag("staffsCate");
        revalidatePath("/main/staff/staff-cate");
        return response.status
    }).catch((error) => {
        console.error('Error:', error)
    })
}

export const createCateApi = async (staff: Pick<StaffCate,'staffCateName'>) => {
    return fetch("http://localhost:8080/api/saveStaffCate", {
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(staff),
        cache:'no-store'
    }).then(async (response) => {
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        if(response.status===500){
            window.alert('문제가 발생했습니다 관리자에게 문의해주세요.')
        }
        revalidateTag("staffCate");
        revalidatePath("/main/staff/staff-cate");
        return response.status
    }).catch((error) => {
        console.error('Error:', error)
    })
}


export const deleteCateApi =async (staff: StaffCate) => {
    return fetch("http://localhost:8080/api/deleteStaffCate", {
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(staff),
        cache:'no-store'
    }).then(async (response) => {
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        if(response.status===500){
            window.alert('문제가 발생했습니다 관리자에게 문의해주세요.')
        }
        revalidateTag("staffSCate")
        revalidatePath("/main/staff/staff-cate");
        return response.status
    }).catch((error) => {
        console.error('Error:', error)
    })
}