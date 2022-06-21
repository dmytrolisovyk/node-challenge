export interface UserExpense {
    id: string
    merchant_name: string
    amount_in_cents: string
    currency: string
    user_id: string
    date_created: Date
    status: string
}
