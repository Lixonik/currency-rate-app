import { createComponentFactory, Spectator } from '@ngneat/spectator';
import { CurrencyRateItemComponent } from './currency-rate-item.component';
import { MatIcon } from '@angular/material/icon';
import { RoundAndStringifyPipe, SignPrefixPipe } from '@shared/pipes';
import { CommonModule } from '@angular/common'

describe('CurrencyRateItemComponent', () => {
	let spectator: Spectator<CurrencyRateItemComponent>;
	const createComponent = createComponentFactory({
		component: CurrencyRateItemComponent,
		imports: [
			CommonModule,
			MatIcon,
			RoundAndStringifyPipe,
			SignPrefixPipe
		],
	});

	beforeEach(() => spectator = createComponent());

	it('should display the currency and rate correctly', () => {
		spectator.setInput('currency', 'USD');
		spectator.setInput('rate', 1.23);
		spectator.detectChanges();

		expect(spectator.query('.item')).toHaveText('USD');
		expect(spectator.query('span')).toHaveText('1.23');
	});

	it('should display the difference with an up arrow if positive', () => {
		spectator.setInput('rate', 2.03);
		spectator.setInput('rate', 10.13);
		spectator.detectChanges();

		expect(spectator.query('mat-icon')).toContainText('arrow_drop_up');
		expect(spectator.query('span')).toContainText('(+8.10)');
	});

	it('should display the difference with a down arrow if negative', () => {
		spectator.setInput('rate', 1.23);
		spectator.setInput('rate', 1.13);
		spectator.detectChanges();

		expect(spectator.query('mat-icon')).toContainText('arrow_drop_down');
		expect(spectator.query('span')).toContainText('(-0.10)');
	});

	it('should not display an arrow if the difference is zero', () => {
		spectator.setInput('rate', 1.10);
		spectator.component.previousRate = 1.10;
		spectator.detectChanges();

		expect(spectator.query('mat-icon')).toBeNull();
		expect(spectator.query('span')).toHaveText('(0.00)');
	});
});
