'use server'
import { revalidateTag } from "next/cache";

export default async function revalidateHandler(destination:string){
    revalidateTag(destination)
}