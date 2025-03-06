

export type ClientMousePosition = {
    x:number,
    y:number
}


export type PageByProps ={
    searchParams: Promise<{
        page: number| undefined
    }>
}


export type ModeByProps ={
    searchParams: Promise<{
        mode: CateMode
    }>
}
export type CateMode = 'add' | 'edit' | null

export type DetailPageProps ={
    searchParams: Promise<{
        target:string
        mode: 'detail' | 'edit'
    }>
}