import { Injectable } from '@angular/core'
import { environment } from '@environments/environment'
import { HttpClient } from '@angular/common/http'
import { catchError, of, share, switchMap, timer } from 'rxjs'
import { Nil } from '@shared/types'
import { CurrencyRateUrl } from '@pages/currency-rate/data-access/domain/url'
import {
	CurrencyRateData,
	RequestedCurrencyCode,
	SourceCurrencyCode
} from '@pages/currency-rate/data-access/models/currency-rate-data.model'

@Injectable({
	providedIn: 'root'
})
export class CurrencyRateApiService {
	private readonly apiKey = environment.CURRENCY_RATE_API_KEY
	private readonly baseUrl = environment.CURRENCY_RATE_URL

	constructor(private readonly http: HttpClient) {
	}

	getCurrencyRate(source: SourceCurrencyCode, requested: RequestedCurrencyCode[]) {
		const headers = { 'apikey': this.apiKey }

		return timer(0, 5000).pipe(
			switchMap(() =>
				this.http.get<CurrencyRateData | Nil>(
					`${this.baseUrl}/${CurrencyRateUrl.getCurrencyRate(source, requested)}`,
					{ headers })
			),
			catchError(error => {
				console.log('CurrencyRate request error: ' + error.message)

				return of(void 0)
			}),
			share()
		)
	}
}
