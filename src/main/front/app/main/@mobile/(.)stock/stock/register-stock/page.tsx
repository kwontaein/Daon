import StockForm from "@/components/main/stock/stock/form/stock-form";
import MobileModal from "@/components/share/mobile-modal/page";
import { getStockCateApi } from "@/features/stock/category/api/stockCateApi";

export default async function RegisterStockPage(){
    const InitStockCate = await getStockCateApi()

    return(
        <MobileModal>
            <StockForm mode='write' stockCate={InitStockCate}/>
        </MobileModal>
    )
}