import { Routes } from '@angular/router'
import { AppComponent } from './app.component'

export const routes: Routes = [
	{
		path: '',
		component: AppComponent,
		children: [
			{
				path: 'currency-rate',
				loadComponent: () => import('@pages/currency-rate/feature').then(m => m.CurrencyRateComponent)
			},
			{
				path: '**',
				redirectTo: 'currency-rate',
			}
		]
	}

]
