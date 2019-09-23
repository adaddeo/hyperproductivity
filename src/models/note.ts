import moment from 'moment'
import uuid from 'uuid/v4'
import Quill, { DeltaStatic } from 'quill'

export interface Note {
  id: string
  title: string
  delta: DeltaStatic
  tags: string[]
  lastModified: string
}

const Delta = Quill.import('delta')

export const build = (): Note => ({
  id: uuid(),
  title: '',
  delta: new Delta(),
  lastModified: moment().toISOString(),
  tags: []
})

export const buildUpdate = (note: Note, updates: Partial<Note>): Note => ({
  ...note,
  lastModified: moment().toISOString(),
  ...updates
})

export const noteView = (note: Note) => {
  const displayTitle = note.title === '' ? 'Untitled' : note.title
  const displayLastModified = moment(note.lastModified).format('LLL')

  return {
    ...note,
    displayTitle,
    displayLastModified
  }
}
