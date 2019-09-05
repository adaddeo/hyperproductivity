import { StateType, ActionType } from 'typesafe-actions'
import { Epic as GenericEpic } from 'redux-observable'

import rootAction from './root-action'
import rootReducer from './root-reducer'

declare module 'store-types' {
  export type RootAction = ActionType<typeof rootAction>
  export type RootState = StateType<typeof rootReducer>
  export type Epic = GenericEpic<RootAction, RootAction, RootState>
}

declare module 'typesafe-actions' {
  interface Types {
    RootAction: ActionType<typeof rootAction>
  }
}
