export type CustomerCateType = {
    customerCateId:string|null,
    customerCateName:string,
}
export type CustomerCatePageProps ={
    searchParams: Promise<{
        mode: CateMode
    }>
}

export type CateMode = 'add' | 'edit' | null