export type CurrencyRateData = {
	quotes: Quotes
	source: SourceCurrencyCode
	success: boolean
	timestamp: number
}

export type CurrencyCode = 'USD' | 'EUR' | 'GBP' | 'CNY' | 'JPY' | 'TRY' | 'RUB'

export type SourceCurrencyCode = 'RUB'

export type RequestedCurrencyCode = Exclude<CurrencyCode, SourceCurrencyCode>

export type QuoteKey = `${SourceCurrencyCode}${RequestedCurrencyCode}`

export type Quotes = Record<QuoteKey, number>

export type Rates = Record<RequestedCurrencyCode, number>
