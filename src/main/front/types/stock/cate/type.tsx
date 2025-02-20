export type StockCateType = {
    stockCateId :string|null,
    stockCateName :string,
}
export type StockCatePageProps ={
    searchParams: Promise<{
        mode: CateMode
    }>
}

export type CateMode = 'add' | 'edit' | null