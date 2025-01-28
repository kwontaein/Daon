import ReceiptSearch from "@/components/main-view/sales/receipt/search";
import RegisterButton from "@/components/main-view/sales/receipt/button";
import ReceiptTableHeader from "@/components/main-view/sales/receipt/table/table-header";

export default function ReceiptPage() {
    return (
        <section>
            <ReceiptSearch/>
            <RegisterButton/>
            
            <ReceiptTableHeader>
                <tbody></tbody>
            </ReceiptTableHeader>
        </section>
    );
}