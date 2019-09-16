import uuid from 'uuid/v4'

export interface Tag {
  id: string
  handle: string
  count: number
}

export type BuildTagOptions = Pick<Tag, 'handle'>

export const buildTag = (options: BuildTagOptions): Tag => ({
  id: uuid(),
  count: 1,
  ...options
})
