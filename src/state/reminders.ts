import { createAction, createReducer, isActionOf } from 'typesafe-actions'
import uuid from 'uuid/v4'
import { filter, tap, ignoreElements } from 'rxjs/operators'
import { Epic } from 'store-types'

import { Reminder } from '../models'

/* State */

export type RemindersState = Reminder[]

const initialState: RemindersState = []

/* Actions & Creators */

export type AddOptions = Omit<Reminder, 'id' | 'window'>

export const add = createAction('items/ADD', action => {
  return (options: AddOptions) => action({ id: uuid(), ...options })
})

export const remove = createAction('items/REMOVE', action => {
  return (id: string) => action({ id })
})

export const actions = {
  add,
  remove
}

/* Epics */

export const addEpic: Epic = action$ => action$.pipe(
  filter(isActionOf(add)),
  tap(console.log),
  ignoreElements()
)

export const epic = addEpic

/* Reducer */

export const reducer =
  createReducer(initialState)
    .handleAction(add, (state, action) => {
      return [
        ...state,
        action.payload
      ]
    })
    .handleAction(remove, (state, action) => {
      return state.filter(item => item.id !== action.payload.id)
    })
