import { expect, test } from 'vitest'
import { convertDateToValidFormet } from '../src/utils/date'

test('Converts date to valid format', () => {
  expect(convertDateToValidFormet(new Date('2019-01-16'))).toBe('16-01-2019')
})
