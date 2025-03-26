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

    return (
        <section key={JSON.stringify(InitStockPoint)}>
            <p style={{color:'red', fontSize:'13px', marginBottom:'5px'}}>※ 입력하신 적립율을 품목소비가에 적용하게 됩니다.</p>
            <StockPoint InitStockPoint={[]}/>
        </section>
    )
}