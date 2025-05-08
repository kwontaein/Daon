import StockPoint from "@/components/main/stock/point/point";
export default async function StockPointPage(){
    const InitStockPoint = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/getStockPointList`,
        {
            cache:'force-cache',
            next: { tags: ['stockPoint']} 
        }
    )
    .then((response)=> response.json())
    .catch((error) => console.error('Error:', error));

    return <StockPoint InitStockPoint={[]}/>
    
}