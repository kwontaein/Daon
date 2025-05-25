'use server'
import { revalidatePath, revalidateTag } from "next/cache";

export default async function revalidateHandler(destination:string){
    revalidateTag(destination)
}

export async function revalidateAllPaths() {
    const paths = ['/', '/main'];
    await Promise.all(paths.map(path => revalidatePath(path)));
}