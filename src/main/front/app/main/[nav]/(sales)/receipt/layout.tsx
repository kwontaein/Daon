export default function ReceiptLayout(
    {receipt, summary}
    :{
        receipt: React.ReactNode,
        summary: React.ReactNode,
    }){
    return(
        <div>
            {receipt}
            {summary}
        </div>
    )
}