import moment from 'moment'
import uuid from 'uuid/v4'

export interface Reminder {
  id: string
  title: string
  description?: string
  firstOccurrence: string
  frequency: string
  tags: string[]
}

export type BuildReminderOptions = Omit<Reminder, 'id' | 'window'>

export const buildReminder = (options: BuildReminderOptions): Reminder => ({
  id: uuid(),
  tags: [],
  ...options
})

export const nextOccurrence = (firstOccurrence: string, frequency: string) => {
  const now = moment()
  const firstOccurrenceDate = moment(firstOccurrence)

  const duration = now.diff(firstOccurrenceDate)

  if (duration < 0) {
    return moment.duration(-1 * duration).humanize()
  }

  const frequencyDuration = frequencyAsDuration(frequency).as('milliseconds')
  const next = frequencyDuration - (duration % frequencyDuration)

  return moment.duration(next).humanize()
}

const FREQUENCY_REGEX = /(\d+)\s(\w+)/

export const frequencyAsDuration = (frequency: string) => {
  const match = frequency.match(FREQUENCY_REGEX)

  if (match === null) {
    throw new Error('Invalid frequency')
  }

  const [count, unit] = match.slice(-2)

  return moment.duration({ [unit]: count })
}
