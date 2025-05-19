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
}