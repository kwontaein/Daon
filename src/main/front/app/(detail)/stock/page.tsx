import StockForm from "@/components/main/stock/stock/form/stock-form";
import { getStockCateApi } from "@/features/stock/category/api/stockCateApi";
import { getStockListApi } from "@/features/stock/stock/api/searchStockApi";
import { DetailPageProps } from "@/model/types/share/type";

export default async function RegisterStockPage({searchParams}:DetailPageProps){
    const mode = (await searchParams).mode
    const target = (await searchParams).target
    const InitStockCate = await getStockCateApi()

    return(
       <StockForm mode={mode} stockCate={InitStockCate}/>
    )
}