export type AccountType =
  | 'input'
  | 'sales'
  | 'purchase'
  | 'deposit'
  | 'withdrawal'
  | 'sale_discount'
  | 'purchase_discount'
  | 'sales_replacement'
  | 'cost'
  | 'return_delivery'
  | 'returned_received';

export type Receipt = {
    uuid:string,
    date?: Date,
    account?: AccountType,
    company?: string,
    note?: string,
    unit_price?: number,
    amount?: number,
    product?: string,
    quantity?: number,
    briefs?: string,
};
