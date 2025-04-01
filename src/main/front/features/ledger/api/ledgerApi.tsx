import { LedgerSearchCondition } from "@/model/types/ledger/type";

export async function getLedgerCustomerApi(searchCondition:LedgerSearchCondition){
    console.log(searchCondition)
    try {
        const response = await fetch("http://localhost:8080/api/getLedgers", {
            method: "POST",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(searchCondition),
        });

        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);

        const text = await response.text();
        return text ? JSON.parse(text) : [];
    } catch (error) {
        console.error('Error:', error);
    }
}

export async function getLedgerCustomesrApi(searchCondition:LedgerSearchCondition){
    try {
        const response = await fetch("http://localhost:8080/api/getLedgers", {
            method: "POST",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(searchCondition),
        });

        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);

        const text = await response.text();
        return text ? JSON.parse(text) : [];
    } catch (error) {
        console.error('Error:', error);
    }
}



export async function getLedgerStockApi(searchCondition:LedgerSearchCondition){
    try {
        const response = await fetch("http://localhost:8080/api/getStockLedger", {
            method: "POST",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(searchCondition),
        });

        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);

        const text = await response.text();
        return text ? JSON.parse(text) : [];
    } catch (error) {
        console.error('Error:', error);
    }
}

export async function getSaleReceiptApi(searchCondition:LedgerSearchCondition){
    try {
        const response = await fetch("http://localhost:8080/api/getSaleReceipt", {
            method: "POST",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(searchCondition),
        });

        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);

        const text = await response.text();
        return text ? JSON.parse(text) : [];
    } catch (error) {
        console.error('Error:', error);
    }
}

export async function getPurchaseReceiptApi(searchCondition:LedgerSearchCondition){
    try {
        const response = await fetch("http://localhost:8080/api/getPurchaseReceipt", {
            method: "POST",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(searchCondition),
        });

        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);

        const text = await response.text();
        return text ? JSON.parse(text) : [];
    } catch (error) {
        console.error('Error:', error);
    }
}

