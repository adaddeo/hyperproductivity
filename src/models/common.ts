import uuid from 'uuid/v4'

export const getISOString = () => (new Date()).toISOString()

export interface Indexable {
  id: string
}

export const buildIndexable = <T>(record: T): T & Indexable => {
  return {
    ...record,
    id: uuid()
  }
}

export interface Archivable {
  archivedAt: string | null
}

export const buildArchivable = <T>(record: T): T & Archivable => {
  return {
    ...record,
    archivedAt: null
  }
}

export const archive = <T extends Archivable>(record: T): T => {
  return {
    ...record,
    archivedAt: getISOString()
  }
}

export interface Modifyable {
  lastModifiedAt: string
}

export const buildModifable = <T>(record: T): T & Modifyable => {
  return {
    ...record,
    lastModifiedAt: getISOString()
  }
}

export const modify = <T extends Modifyable>(record: T): T => {
  return {
    ...record,
    lastModifiedAt: getISOString()
  }
}
