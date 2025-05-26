import StockForm from "@/components/main/stock/stock/form/stock-form";
import MobileModal from "@/components/share/mobile-modal/page";
import { getStockCateApi } from "@/features/stock/category/api/server-api";
import { getStockByIdApi, getStockListApi } from "@/features/stock/stock/api/search-server-api";
import { DetailPageProps } from "@/model/types/share/type";

export default async function RegisterStockPage({searchParams}:DetailPageProps){
    const mode = (await searchParams).mode
    const stockId = (await searchParams).target

    const stock = await getStockByIdApi(stockId)
    const InitStockCate = await getStockCateApi()
    return(
        <MobileModal >
            <StockForm mode={mode} stockCate={InitStockCate} stock={stock} isMobile={true}/>
        </MobileModal>
    )
}