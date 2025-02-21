export type StockCate = {
    stockCateId :string,
    stockCateName :string,
}
export type StockCatePageProps ={
    searchParams: Promise<{
        mode: CateMode
    }>
}

export type CateMode = 'add' | 'edit' | null

