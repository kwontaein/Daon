export type AccountType =
  | 'disabled'
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
    uuid:any,
    date?: Date,
    account?: AccountType,
    company?: string,
    note?: string,
    unit_price?: string,
    amount?: string,
    product?: string,
    quantity?: string,
    briefs?: string,
};

