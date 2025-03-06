import { RequestSearchStock, StockSearchCondition } from "@/model/types/stock/stock/types";

export const fetchSearchStocks = async(searchCondition: StockSearchCondition) => {
    try {
        const response = await fetch("http://localhost:8080/api/getStockList", {
            method: "POST",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({...searchCondition, receiptCategory: 'DEPOSIT'}),
        });

        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);

        const text = await response.text();
        return text ? JSON.parse(text) : [];
    } catch (error) {
        console.error('Error:', error);
    }
};