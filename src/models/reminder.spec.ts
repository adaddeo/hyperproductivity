import moment from 'moment'

import {
  nextOccurrence,
  frequencyAsDuration
} from './reminder'

describe('frequencyAsDuration', () => {
  it('return correctly', () => {
    expect(frequencyAsDuration('1 week')).toEqual(moment.duration({'week': 1}))
  })
})

describe('nextOccurrence', () => {
  test('before any occurrence', () => {
    const firstOccurrence = moment().add(1, 'month').toISOString()
    const frequency = '1 year'

    expect(nextOccurrence(firstOccurrence, frequency)).toEqual('a month')
  })

  test('after first occurrence', () => {
    const firstOccurrence = moment().subtract(2, 'month').toISOString()
    const frequency = '1 year'

    expect(nextOccurrence(firstOccurrence, frequency)).toEqual('10 months')
  })

  test('after first recurrence', () => {
    const firstOccurrence = moment().subtract(14, 'month').toISOString()
    const frequency = '1 year'

    expect(nextOccurrence(firstOccurrence, frequency)).toEqual('10 months')
  })
})
