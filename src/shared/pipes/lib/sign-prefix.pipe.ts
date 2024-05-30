import { Pipe, PipeTransform } from '@angular/core'

@Pipe({
	name: 'signPrefix',
	standalone: true,
})
export class SignPrefixPipe implements PipeTransform {
	transform(value: string): string {
		return Number(value) > 0 ? `+${value}` : value
	}

}