export interface Archivable {
  archivedAt: string | null
}

export function archive<T extends Archivable>(record: T): T {
  return {
    ...record,
    archivedAt: (new Date()).toISOString()
  }
}

export interface Indexable {
  id: string
}
