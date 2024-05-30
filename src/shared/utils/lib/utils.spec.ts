import { isNil } from '@shared/utils'

describe('utils', () => {
	describe('isNil', () => {
		it('should return true if input is null', () => {
			expect(isNil(null)).toEqual(true)
		})

		it('should return true if input is undefined', () => {
			expect(isNil(undefined)).toEqual(true)
		})

		it('should return false if input is not null/undefined', () => {
			expect(isNil(true)).toEqual(false)
		})
	})
})