export type ResponseBoard = {
    boardId?: string
    writer: string
    createAt?: Date
    title: string
    content: string
    notice: boolean
    views?: number
    files?: File[]
}