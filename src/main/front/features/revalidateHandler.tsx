'use server'
import { revalidatePath, revalidateTag } from "next/cache";

export default async function revalidateHandler(destination:string){
    revalidateTag(destination)
}

export async function revalidateAllPaths() {
    const paths = ['/', '/main']; // 여기에 필요한 경로 추가
    paths.forEach((path) => revalidatePath(path));
  }