import uuid from 'uuid/v4'
import Quill, { DeltaStatic } from 'quill'

export interface Note {
  id: string
  title: string
  delta: DeltaStatic
  tags: string[]
}

const Delta = Quill.import('delta')

export const buildNote = (): Note => ({
  id: uuid(),
  title: '',
  delta: new Delta(),
  tags: []
})

export const noteView = (note: Note) => {
  const displayTitle = note.title === '' ? 'Untitled' : note.title

  return {
    ...note,
    displayTitle
  }
}
