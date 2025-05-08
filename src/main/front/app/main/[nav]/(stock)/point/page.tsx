import StockPoint from "@/components/main/stock/point/point";
import { cookies } from "next/headers";
export default async function StockPointPage(){
    const cookieStore = cookies();
    const cookie = cookieStore.toString();

    const InitStockPoint = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/getStockPointList`,
        {
            headers : {
                'Content-Type': 'application/json',
                Cookie:cookie,
            },
            cache:'force-cache',
            next: { tags: ['stockPoint']} 
        }
    )
    .then((response)=> response.json())
    .catch((error) => console.error('Error:', error));

    return <StockPoint InitStockPoint={[]}/>
    
}