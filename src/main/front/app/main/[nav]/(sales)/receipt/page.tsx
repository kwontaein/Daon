import ReceiptSearch from "@/components/main/sales/receipt/search/search";

import '@/styles/_global.scss';

import { PageByProps } from "@/model/types/share/type";
import { getAllReceiptsApi } from "@/features/sales/receipt/api/server-api";

export default async function ReceiptPage({searchParams}: PageByProps) {
    const page = (await searchParams).page || 1;
    const initialReceipt = await getAllReceiptsApi()

    return (
        <div className="flex-row">
            <section className="full-screen">
                <ReceiptSearch initialReceipts={initialReceipt} page={page}/>
            </section>
        </div>
    );
}