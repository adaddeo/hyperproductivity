import { createAction, createReducer } from 'typesafe-actions'
import uuid from 'uuid/v4'

import { Note } from '../models'


/* State */

export type NotesState = Note[]

const initialState: NotesState = []

/* Actions & Creators */

export type AddOptions = Omit<Note, 'id'>

export const add = createAction('notes/ADD', action => {
  return (options: AddOptions) => action({ id: uuid(), ...options })
})

export const remove = createAction('notes/DELETE', action => {
  return (id: string) => action({ id })
})

export const actions = {
  add,
  remove
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
    .handleAction(remove, (state, action) => {
      return state.filter(item => item.id !== action.payload.id)
    })
