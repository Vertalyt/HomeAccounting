
export function formatCurrency(value, currency = 'UAH') {
    return new Intl.NumberFormat('en-US', { 
        style: 'currency', 
        currency 
    }).format(value)
}