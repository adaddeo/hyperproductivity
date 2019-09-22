import moment from 'moment'
import uuid from 'uuid/v4'

export interface Reminder {
  id: string
  title: string
  description?: string
  tags: string[]
  frequency: Frequency
  nextOccurrence: string
  events: OccurrenceEvent[]
}

export interface Frequency {
  unit: moment.unitOfTime.Base
  count: number
}

export interface OccurrenceEvent {
  eventDate: string
  occurrenceDate: string
  notes?: string
}

export const buildReminder = (options: Omit<Reminder, 'id' | 'events'>): Reminder => ({
  id: uuid(),
  tags: [],
  events: [],
  ...options
})

export const withEvent = (reminder: Reminder, event: OccurrenceEvent): Reminder => {
  const lastOccurrence = moment(reminder.nextOccurrence)
  const nextOccurrence = lastOccurrence
    .add(reminder.frequency.count, reminder.frequency.unit)
    .toISOString()

  return {
    ...reminder,
    nextOccurrence,
    events: [
      ...reminder.events,
      event
    ]
  }
}

export const upcomingOccurrences  = (reminder: Reminder, startStr: string, endStr: string) => {
  const nextOccurrence = moment(reminder.nextOccurrence)
  const { count: freq, unit } = reminder.frequency

  const start = moment(startStr)
  const end = moment(endStr)

  let k = nextOccurrence

  // Optimization to set our k starting point (potentially) within the range
  if (k < start) {
    // This uses floating point numbers and probably introduces subtle bugs.
    const a = start.diff(nextOccurrence, unit, true)
    const b = a % freq

    k = start.add(b, unit)
  }


  const occurrences = []

  while (k <= end) {
    occurrences.push(k.toISOString())
    k.add(freq, unit)
  }

  return occurrences
}

export const reminderView = (reminder: Reminder) => {
  const now = moment()
  const nextOccurrence = moment(reminder.nextOccurrence)
  const nextOccurrenceIn = moment.duration(nextOccurrence.diff(now)).humanize()
  const nextOccurrenceMS = nextOccurrence.unix()
  const prettyFrequency = frequencyAsString(reminder.frequency)

  return {
    ...reminder,
    nextOccurrenceIn,
    nextOccurrenceMS,
    prettyFrequency
  }
}

export const frequencyAsString = (frequency: Frequency) =>
  `${frequency.count} ${frequency.unit}${frequency.count > 1 ? 's' : ''}`
