import StockCate from "@/components/main-view/stock/cate/stock-cate";


export default async function CustomerCatePage() {
    const InitStockCate = await fetch("http://localhost:8080/api/getStockCateList",
        {
            cache:'force-cache',
            next: { tags: ['stocksCate']} 
        }
    )
    .then((response)=> response.json())
    .catch((error) => console.error('Error:', error));
    console.log(InitStockCate)
    return (
        <section key={JSON.stringify(InitStockCate)}>
            <StockCate InitStockCate={InitStockCate}/>
        </section>
    )
}