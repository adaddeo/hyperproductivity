import { createAction, createReducer } from 'typesafe-actions'
import uuid from 'uuid/v4'

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

/* Reducer */

export const reducer =
  createReducer<RemindersState>(initialState)
    .handleAction(add, (state, action) => {
      return [
        ...state,
        action.payload
      ]
    })
    .handleAction(remove, (state, action) => {
      return state.filter(item => item.id !== action.payload.id)
    })
