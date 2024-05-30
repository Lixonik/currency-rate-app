import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core'
import { MatIcon } from '@angular/material/icon'
import { CommonModule } from '@angular/common'
import { RoundAndStringifyPipe, SignPrefixPipe } from '@shared/pipes'
import { SOURCE_CURRENCY_CODE } from '@pages/currency-rate/data-access/constants/currency-rate.constant'

@Component({
	selector: 'app-currency-rate-item',
	standalone: true,
	imports: [
		CommonModule,
		MatIcon,
		RoundAndStringifyPipe,
		SignPrefixPipe
	],
	templateUrl: './currency-rate-item.component.html',
	styleUrl: './currency-rate-item.component.scss',
})
export class CurrencyRateItemComponent implements OnInit, OnChanges {
	@Input() currency: string = ''
	@Input() rate: number = 0

	previousRate: number = 0
	difference: number = 0

	protected readonly sourceCurrencyCode = SOURCE_CURRENCY_CODE

	constructor() {
	}

	ngOnInit() {
		this.previousRate = 0
		this.difference = 0
	}

	ngOnChanges(changes: SimpleChanges) {
		if (changes['rate']) {
			this.difference = this.previousRate !== 0 ? this.rate - this.previousRate : 0
			this.previousRate = this.rate
		}
	}
}
