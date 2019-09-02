import { createAction, createReducer } from 'typesafe-actions'
import uuid from 'uuid/v4'

export interface Item {
  id: string
  title: string
  description?: string
  schedule: string
  window: string
}

export type ItemsState = Item[]

export type AddOptions = Omit<Item, 'id' | 'schedule' | 'window'>

export const add = createAction('items/ADD', action => {
  return (options: AddOptions) => action({ id: uuid(), ...options })
})

export const remove = createAction('items/REMOVE', action => {
  return (id: string) => action({ id })
})

export const actions = {
  add,
  remove
}

const initialState: ItemsState = []

export const reducer =
  createReducer(initialState)
    .handleAction(add, (state, action) => {
      return [
        ...state,
        action.payload
      ]
    })
    .handleAction(remove, (state, action) => {
      return state.filter(item => item.id !== action.payload.id)
    })
