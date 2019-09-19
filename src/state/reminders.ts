import { createAction, createReducer, isActionOf } from 'typesafe-actions'
import { combineEpics } from 'redux-observable'
import { from } from 'rxjs'
import { filter, map, mergeMap, ignoreElements } from 'rxjs/operators'
import { createSelector } from 'reselect'
import { RootState, Epic } from 'store-types'

import { Reminder, buildReminder, withEvent, viewReminder } from '../models'
import { tag } from './tags'

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

/* Epics */


export const addEpic: Epic = action$ => action$.pipe(
  filter(isActionOf(add)),
  mergeMap(action => from(action.payload.tags).pipe(map(tag)))
)

export const removeEpic: Epic = action$ => action$.pipe(
  filter(isActionOf(remove)),
  ignoreElements()
)

export const epic = combineEpics(
  addEpic,
  removeEpic
)

/* Selectors */

const remindersSelector = (state: RootState) => state.reminders

const viewRemindersSelector = createSelector(
  remindersSelector,
  reminders => reminders.map(viewReminder)
)

export const selectors = {
  reminders: viewRemindersSelector
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
