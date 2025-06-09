import StockPoint from "@/components/main/stock/point/point";
import {cookies} from "next/headers";
import jwtFilter from "@/features/share/jwtFilter";


export default async function StockPointPage() {
    const cookieStore = cookies();
    const cookie = cookieStore.toString();

    const InitStockPoint = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/getStockPointList`,
        {
            headers: {
                'Content-Type': 'application/json',
                Cookie: cookie,
            },
            cache: 'force-cache',
            next: {tags: ['stockPoint']}
        }
    )
        .then(async (response) => {
            response.json()
            const text = await response.text();
            jwtFilter(text)
            jwtFilter(text)
        })
        .catch((error) => console.error('Error:', error));

    return <StockPoint InitStockPoint={[]}/>

}