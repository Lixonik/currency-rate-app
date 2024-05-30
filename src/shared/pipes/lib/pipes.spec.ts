import { createPipeFactory, SpectatorPipe } from '@ngneat/spectator'
import { Pipe } from '@angular/core'
import { RoundAndStringifyPipe, SignPrefixPipe } from '@shared/pipes'

describe('Pipes', () => {
	let spectator: SpectatorPipe<Pipe>;
	const createRoundAndStringifyPipe = createPipeFactory(RoundAndStringifyPipe);
	const createSignPrefixPipe = createPipeFactory(SignPrefixPipe)

	describe('RoundAndStringifyPipe', () => {
		it('should round and stringify if input is number', () => {
			spectator = createRoundAndStringifyPipe(`{{ 8 | roundAndStringify }}`)

			expect(spectator.element).toContainText('8.00')
		})

		it('should return empty string if input is nil', () => {
			spectator = createRoundAndStringifyPipe(`{{ null | roundAndStringify }}`)

			expect(spectator.element).toContainText('')
		})
	})

	describe('SignPrefixPipe', () => {
		it('should add + sign if number is positive', () => {
			spectator = createSignPrefixPipe(`{{ 8 | signPrefix }}`)

			expect(spectator.element).toContainText('+8')
		})

		it('should not add + sign if number is negative', () => {
			spectator = createSignPrefixPipe(`{{ -8 | signPrefix }}`)

			expect(spectator.element).toContainText('-8')
		})
	})
})