import { Pipe, PipeTransform } from '@angular/core'
import { Nil } from '@shared/types'
import { isNil } from '@shared/utils'

@Pipe({
	name: 'roundAndStringify',
	standalone: true,
})
export class RoundAndStringifyPipe implements PipeTransform {
	transform(value: number | Nil): string {
		return isNil(value) ? '' : value.toFixed(2)
	}
}