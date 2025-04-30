export default function ReceiptLayout(
    {receipt, summary,mobile}
    :{
        receipt: React.ReactNode,
        summary: React.ReactNode,
        mobile: React.ReactNode,
    }){
    return(
        <div>
            {receipt}
            {summary}
            {mobile}
        </div>
    )
}