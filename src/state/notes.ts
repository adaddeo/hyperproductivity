import { createAction, createReducer } from 'typesafe-actions'

import { Note, build, buildUpdate } from '../models'


/* State */

export type NotesState = Note[]

const initialState: NotesState = []

/* Actions & Creators */

export const add = createAction('notes/ADD', action => {
  return () => action(build())
})

export const update = createAction('notes/UPDATE', action => {
  return (id: string, note: Partial<Note>) => action({ id, note })
})

export const remove = createAction('notes/DELETE', action => {
  return (id: string) => action({ id })
})

export const actions = {
  add,
  update,
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
    .handleAction(update, (state, action) => {
      return state.map(note => {
        if (note.id === action.payload.id) {
          return buildUpdate(note, action.payload.note)
        } else {
          return note
        }
      })
    })
    .handleAction(remove, (state, action) => {
      return state.filter(item => item.id !== action.payload.id)
    })
