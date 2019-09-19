import moment from 'moment'

import {
  upcomingOccurrences,
} from './reminder'

describe('occurrences', () => {
  describe('with nextOccurrence before range', () => {
    test('with occurrences (including inclusive)', () => {
      const nextOccurrence = moment('2019-01-01').toISOString()
      const frequency = { count: 1, unit: 'month' }

      const reminder = {
        nextOccurrence,
        frequency
      }

      const start = moment('2019-09-01').toISOString()
      const end = moment('2019-10-01').toISOString()

      expect(upcomingOccurrences(reminder, start, end)).toEqual([start, end])
    })

    test('without occurrences', () => {
      const nextOccurrence = moment('2019-01-01').toISOString()
      const frequency = { count: 1, unit: 'year' }

      const reminder = {
        nextOccurrence,
        frequency
      }

      const start = moment('2019-09-01').toISOString()
      const end = moment('2019-10-01').toISOString()

      expect(upcomingOccurrences(reminder, start, end)).toEqual([])
    })
  })

  test('with first in range', () => {
    const nextOccurrence = moment('2019-08-01').toISOString()
    const frequency = { count: 1, unit: 'month' }

    const reminder = {
      nextOccurrence,
      frequency
    }

    const start = moment('2019-01-01').toISOString()
    const end = moment('2019-09-01').toISOString()

    expect(upcomingOccurrences(reminder, start, end)).toEqual([nextOccurrence, end])
  })

  test('with first after range', () => {
    const nextOccurrence = moment('2020-08-01').toISOString()
    const frequency = { count: 1, unit: 'month' }

    const reminder = {
      nextOccurrence,
      frequency
    }

    const start = moment('2019-01-01').toISOString()
    const end = moment('2019-09-01').toISOString()

    expect(upcomingOccurrences(reminder, start, end)).toEqual([])
  })
})
