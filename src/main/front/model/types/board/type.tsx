export type ResponseBoard = {
    boardId?: string
    writer: string
    createAt?: Date
    title: string
    content: string
    notice: boolean
    views?: number
    files?:BoardFile[]

}

export type BoardFile={
    boardId:string,
    fileId:string,
    fileLink:string,
    fileName:string
    originalName:string
    download:number
    fileSize:number
}
export type RequestBoard = {
    boardId?: string
    writer: string
    createAt?: Date
    title: string
    content: string
    notice: boolean
    views?: number
    files?: File[]    
    existingFileIds?:string[] //수정 시 유지되는 파일id들
    newFiles?:File[];   // 새로 업로드된 파일들
}