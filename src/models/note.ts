import moment from 'moment'
import { compose } from 'redux'
import Quill, { DeltaStatic } from 'quill'

import {
  Archivable,
  Indexable,
  Modifyable,
  buildIndexable,
  buildArchivable,
  buildModifable,
  modify
} from './common'


export interface Note extends Archivable, Indexable, Modifyable {
  title: string
  delta: DeltaStatic
  tags: string[]
}

const Delta = Quill.import('delta')

export const build = (): Note => compose(
  buildIndexable,
  buildArchivable,
  buildModifable
)({
  title: '',
  delta: new Delta(),
  tags: []
})

export const buildUpdate = (note: Note, updates: Partial<Note>): Note => modify({
  ...note,
  ...updates
})

export const noteView = (note: Note) => {
  const displayTitle = note.title === '' ? 'Untitled' : note.title
  const displayLastModified = moment(note.lastModifiedAt).format('LLL')

  return {
    ...note,
    displayTitle,
    displayLastModified
  }
}
