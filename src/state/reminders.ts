import { createAction, createReducer } from 'typesafe-actions'
import { createSelector } from 'reselect'
import { RootState } from 'store-types'

import { Reminder, buildReminder, withEvent, viewReminder } from '../models'

/* State */

export type RemindersState = Reminder[]

const initialState: RemindersState = []

/* Actions & Creators */

export const add = createAction('reminders/ADD', action => {
  return (...args: Parameters<typeof buildReminder>) => action(buildReminder(...args))
})

export const remove = createAction('reminders/REMOVE', action => {
  return (id: string) => action({ id })
})

export const markDone = createAction('reminders/DONE', action => {
  return (id: string, occurrenceDate: string) => {
    const eventDate = (new Date()).toISOString()

    return action({
      id,
      event: {
        eventDate,
        occurrenceDate
      }
    })
  }
})


export const actions = {
  add,
  markDone,
  remove,
}

/* Selectors */

const remindersSelector = (state: RootState) => state.reminders

const viewRemindersSelector = createSelector(
  remindersSelector,
  reminders => reminders.map(viewReminder)
)

const tagsSelector = createSelector(
  remindersSelector,
  reminders => {
    const counts: { [key: string]: number } = {}

    reminders.forEach(reminder =>
      reminder.tags.forEach(tag => counts[tag] = (counts[tag] || 0) + 1)
    )

    return Object.keys(counts).map(handle => ({ handle, count: counts[handle] }))
  }
)

export const selectors = {
  reminders: viewRemindersSelector,
  tags: tagsSelector
}

/* Reducer */

export const reducer =
  createReducer(initialState)
    .handleAction(add, (state, action) => {
      return [
        ...state,
        action.payload
      ]
    })
    .handleAction(markDone, (state, action) => {
      const { event } = action.payload

      return state.map(reminder =>
        reminder.id === action.payload.id ?
        withEvent(reminder, event) :
        reminder
      )
    })
    .handleAction(remove, (state, action) => {
      return state.filter(item => item.id !== action.payload.id)
    })
