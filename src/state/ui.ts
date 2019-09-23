import { createAction, createReducer } from 'typesafe-actions'

import { add as addNote, del as delNote } from './notes'

/* State */

export type UIState = {
  currentNoteId: string | null
}

const initialState: UIState = {
  currentNoteId: null
}

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
    .handleAction(delNote, (state) => {
      return {
        ...state,
        currentNoteId: null
      }
    })
