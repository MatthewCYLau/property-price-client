import { expect, test } from 'vitest'
import { convertDateToValidFormet } from '../src/utils/date'

test('Converts date to valid format', () => {
  expect(convertDateToValidFormet(new Date('01-16-2019'))).toBe('2019-01-16')
})
