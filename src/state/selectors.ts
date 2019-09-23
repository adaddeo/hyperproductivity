import { createSelector } from 'reselect'
import { RootState } from 'store-types'

import { noteView } from '../models/note'
import { reminderView } from '../models/reminder'

/* UI */

const currentNoteIdSelector = (state: RootState) => state.ui.currentNoteId


/* Notes */

const notesStateSelector = (state: RootState) => state.notes

export const notesSelector = createSelector(
  notesStateSelector,
  notes => notes.map(noteView)
)

export const currentNoteSelector = createSelector(
  notesStateSelector,
  currentNoteIdSelector,
  (notes, id) => {
    if (id === null) {
      return null 
    }

    const note = notes.find(note => note.id === id)

    if (note === undefined) {
      throw new TypeError(`Note with id ${id} doesn't exist.`)
    }

    return note
  }
)

/* Reminders */

const remindersStateSelector = (state: RootState) => state.reminders

export const remindersSelector = createSelector(
  remindersStateSelector,
  reminders => reminders.map(reminderView)
)

export const tagsSelector = createSelector(
  remindersSelector,
  reminders => {
    const counts: { [key: string]: number } = {}

    reminders.forEach(reminder =>
      reminder.tags.forEach(tag => counts[tag] = (counts[tag] || 0) + 1)
    )

    return Object.keys(counts).map(handle => ({ handle, count: counts[handle] }))
  }
)
