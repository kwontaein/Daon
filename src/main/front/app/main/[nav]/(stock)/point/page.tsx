import StockPoint from "@/components/main/stock/point/point";
export default async function StockPointPage(){
    const InitStockPoint = await fetch("http://localhost:8080/api/getStockPointList",
        {
            cache:'force-cache',
            next: { tags: ['stockPoint']} 
        }
    )
    .then((response)=> response.json())
    .catch((error) => console.error('Error:', error));

    return <StockPoint InitStockPoint={[]}/>
    
}