import { createAction, createReducer } from 'typesafe-actions'

import { Reminder, buildReminder, withEvent } from '../models'

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
