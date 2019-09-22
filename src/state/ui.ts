import { createAction, createReducer } from 'typesafe-actions'

import { add as addNote } from './notes'

/* State */

export type NotesState = {
  currentNoteId?: string
}

const initialState: NotesState = {}

/* Actions & Creators */

export const openNote = createAction('ui/OPEN_NOTE', action => {
  return (id: string) => action({ id })
})

export const actions = {
  openNote
}

/* Reducer */

export const reducer =
  createReducer(initialState)
    .handleAction([openNote, addNote], (state, action) => {
      return {
        ...state,
        currentNoteId: action.payload.id
      }
    })
