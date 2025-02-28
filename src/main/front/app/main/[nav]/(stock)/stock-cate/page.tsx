import StockCate from "@/components/main/stock/category/stock-cate";


export default async function CustomerCatePage() {
    const InitStockCate = await fetch("http://localhost:8080/api/getStockCateList",
        {
            cache:'force-cache',
            next: { tags: ['stocksCate']} 
        }
    )
    .then((response)=> response.json())
    .catch((error) => console.error('Error:', error));

    return (
        <section key={JSON.stringify(InitStockCate)}>
            <StockCate InitStockCate={InitStockCate}/>
        </section>
    )
}