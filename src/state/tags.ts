import { createAction, createReducer } from 'typesafe-actions'

import { buildTag, Tag } from '../models'


/* State */

export type TagsState = Tag[]

const initialState: TagsState = []

/* Actions & Creators */

export const tag = createAction('tags/TAG', action => {
  return (handle: string) => action({ handle })
})

export const untag = createAction('tags/UNTAG', action => {
  return (handle: string) => action({ handle })
})

export const actions = {
  tag,
  untag
}

/* Reducer */

export const reducer =
  createReducer(initialState)
    .handleAction(tag, (state, action) => {
      const { handle } = action.payload
      let addTag = true

      const newState = state.map(t => {
        if (t.handle === handle) {
          addTag = false
          return {
            ...t,
            count: t.count + 1
          }
        } else {
          return t
        }
      })

      if (addTag) {
        return [
          ...state,
          buildTag({ handle })
        ]
      } else {
        return newState
      }
    })
    .handleAction(untag, (state, action) => {
      const { handle } = action.payload

      return state.reduce((acc: Tag[], t) => {
        if (t.handle === handle) {
          if (t.count === 1) {
            return acc
          } else {
            return [...acc, { ...t, count: t.count - 1}]
          }
        } else {
          return [...acc, t]
        }
      }, [])
    })
