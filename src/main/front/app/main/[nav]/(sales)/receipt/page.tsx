import ReceiptSearch from "@/components/main-view/sales/receipt/search";
import RegisterButton from "@/components/main-view/sales/receipt/button";
import ReceiptTableHeader from "@/components/main-view/sales/receipt/table/table-header";
import Calendar from "@/components/main-view/sales/receipt/aside/calendar";

import '@/styles/_global.scss';

export default function ReceiptPage() {
    return (
        <div className="flex-row">
            <section className="full-screen">
                <ReceiptSearch/>
                <RegisterButton/>
                
                <ReceiptTableHeader>
                    <tbody></tbody>
                </ReceiptTableHeader>
            </section>
            <section style={{marginInline:'1rem'}}>
                <Calendar/>
            </section>
        </div>
    );
}