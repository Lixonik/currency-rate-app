import { Component, DestroyRef, OnDestroy, OnInit } from '@angular/core'
import { CommonModule } from '@angular/common'
import { Nil } from '@shared/types'
import { timer } from 'rxjs'
import { takeUntilDestroyed } from '@angular/core/rxjs-interop'
import { isNil } from '@shared/utils'
import { MatIconButton } from '@angular/material/button'
import { MatIcon } from '@angular/material/icon'
import { HttpClientModule } from '@angular/common/http'
import { CurrencyRateItemComponent } from '@pages/currency-rate/ui/currency-rate-item/currency-rate-item.component'
import { CurrencyRateApiService } from '@pages/currency-rate/data-access/services/currency-rate-api.service'
import {
	CurrencyRateData, QuoteKey, Quotes,
	Rates,
	RequestedCurrencyCode
} from '@pages/currency-rate/data-access/models/currency-rate-data.model'
import { REQUESTED_CURRENCY_CODES, SOURCE_CURRENCY_CODE } from '@pages/currency-rate/data-access/constants/currency-rate.constant'

@Component({
	selector: 'app-currency-rate',
	templateUrl: './currency-rate.component.html',
	styleUrl: './currency-rate.component.scss',
	standalone: true,
	providers: [CurrencyRateApiService],
	imports: [CommonModule, MatIconButton, MatIcon, CurrencyRateItemComponent, HttpClientModule]
})
export class CurrencyRateComponent implements OnInit, OnDestroy {
	showMore = false
	currentDateTime: Date | Nil = null
	visibleCurrencies: RequestedCurrencyCode[] = []
	errorMessage: string = ''

	// Hack to initialize a field
	rates: Rates = {} as Rates

	protected readonly sourceCurrencyCode = SOURCE_CURRENCY_CODE

	constructor(
		private readonly currencyRateApiService: CurrencyRateApiService,
		private readonly destroyRef: DestroyRef,
	) {
	}

	ngOnInit(): void {
		timer(0, 1000).pipe(takeUntilDestroyed(this.destroyRef)).subscribe(() => {
			this.currentDateTime = new Date()
		})

		this.updateVisibleCurrencies()

		this.currencyRateApiService.getCurrencyRate(SOURCE_CURRENCY_CODE, REQUESTED_CURRENCY_CODES).pipe(takeUntilDestroyed(this.destroyRef)).subscribe((data) => {
			if (isNil(data)) {
				this.errorMessage = 'An error occurred while fetching currency data.'

				return
			}
			this.errorMessage = ''

			this.processCurrencyRateData(data)
		})
	}


	ngOnDestroy(): void {
		throw new Error('Method not implemented.')
	}

	toggleShowMore(): void {
		this.showMore = !this.showMore
		this.updateVisibleCurrencies()
	}

	updateVisibleCurrencies(): void {
		this.visibleCurrencies = this.showMore ? REQUESTED_CURRENCY_CODES : REQUESTED_CURRENCY_CODES.slice(0, 3)
	}

	private processCurrencyRateData(data: CurrencyRateData): void {
		const responseQuotes: Quotes = data.quotes
		REQUESTED_CURRENCY_CODES.forEach(requestedCurrencyCode => {
			const quoteKey: QuoteKey = `${SOURCE_CURRENCY_CODE}${requestedCurrencyCode}`

			this.rates[requestedCurrencyCode] = 1 / Number(responseQuotes[quoteKey])
		})
	}
}