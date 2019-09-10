import { createAction, createReducer, isActionOf } from 'typesafe-actions'
import { combineEpics } from 'redux-observable'
import uuid from 'uuid/v4'
import { filter, tap, ignoreElements } from 'rxjs/operators'
import { Epic } from 'store-types'

import { Reminder } from '../models'
import { createDatabase, insert, del } from '../storage/memory'

/* State */

export type RemindersState = Reminder[]

const initialState: RemindersState = []

/* Actions & Creators */

export type AddOptions = Omit<Reminder, 'id' | 'window'>

export const init = createAction('reminders/INIT', action => {
  return (reminders: Reminder[]) => action({ reminders })
})

export const add = createAction('reminders/ADD', action => {
  return (options: AddOptions) => action({ id: uuid(), ...options })
})

export const remove = createAction('reminders/REMOVE', action => {
  return (id: string) => action({ id })
})

export const actions = {
  init,
  add,
  remove
}

/* Epics */

const DATABASE = 'reminders'

try {
  createDatabase(DATABASE)
} catch (error) {
  // no-op, database already exists
}

export const addEpic: Epic = action$ => action$.pipe(
  filter(isActionOf(add)),
  tap(action => insert(DATABASE, action.payload.id, action.payload)),
  ignoreElements()
)

export const removeEpic: Epic = action$ => action$.pipe(
  filter(isActionOf(remove)),
  tap(action => del(DATABASE, action.payload.id)),
  ignoreElements()
)

export const epic = combineEpics(
  addEpic,
  removeEpic
)

/* Reducer */

export const reducer =
  createReducer(initialState)
    .handleAction(init, (state, action) => {
      return action.payload.reminders
    })
    .handleAction(add, (state, action) => {
      return [
        ...state,
        action.payload
      ]
    })
    .handleAction(remove, (state, action) => {
      return state.filter(item => item.id !== action.payload.id)
    })
