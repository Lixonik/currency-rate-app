import {
	RequestedCurrencyCode,
	SourceCurrencyCode
} from '@pages/currency-rate/data-access/models/currency-rate-data.model'

export abstract class CurrencyRateUrl {
	static readonly DOMAIN = 'live'

	static getCurrencyRate = (source: SourceCurrencyCode, requested: RequestedCurrencyCode[]): string => {
		const requestedCurrencies = requested.join(',')

		return CurrencyRateUrl.DOMAIN + `?source=${source}&currencies=${requestedCurrencies}`
	}
}