import { createComponentFactory, Spectator } from '@ngneat/spectator'
import { CurrencyRateComponent } from './currency-rate.component'
import { CurrencyRateApiService } from '@pages/currency-rate/data-access/services/currency-rate-api.service'
import { MatIcon } from '@angular/material/icon'
import { MatIconButton } from '@angular/material/button'
import { CurrencyRateItemComponent } from '@pages/currency-rate/ui/currency-rate-item/currency-rate-item.component'
import { CommonModule, formatDate } from '@angular/common'

describe('CurrencyRateComponent', () => {
	let spectator: Spectator<CurrencyRateComponent>
	const createComponent = createComponentFactory({
		component: CurrencyRateComponent,
		imports: [CommonModule, MatIconButton, MatIcon, CurrencyRateItemComponent],
		mocks: [CurrencyRateApiService]
	})

	beforeEach(() => spectator = createComponent())

	it('should display the current date and time', () => {
		const mockDate = new Date()
		const formatedDate = formatDate(mockDate, 'dd.MM.yyyy, HH:mm:ss', 'en-US')
		spectator.component.currentDateTime = mockDate
		spectator.component.ngOnInit()
		spectator.detectChanges()

		expect(spectator.query('.date-time')).toContainText(formatedDate)
	})

	it('should display a list of currency rate items', () => {
		expect(spectator.queryAll(CurrencyRateItemComponent).length).toBe(3)
	})

	it('should toggle showMore and update visibleCurrencies when button is clicked', () => {
		const button = spectator.query('button') as HTMLButtonElement

		spectator.click(button)
		expect(spectator.component.showMore).toBeTrue()
		expect(spectator.component.visibleCurrencies.length).toBeGreaterThan(3)

		spectator.click(button)
		expect(spectator.component.showMore).toBeFalse()
		expect(spectator.component.visibleCurrencies.length).toBe(3)
	})
})
