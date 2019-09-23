import { createStore, applyMiddleware, Middleware } from 'redux'
import logger from 'redux-logger'
import { createEpicMiddleware } from 'redux-observable'
import { RootAction, RootState } from 'store-types'

import rootReducer from './root-reducer'
import rootEpic from './root-epic'

export const epicMiddleware = createEpicMiddleware<
  RootAction,
  RootAction,
  RootState
>()

const middlewares: Middleware[] = [epicMiddleware]

if (process.env.NODE_ENV === `development`) {
  middlewares.push(logger)
}

let initialState: RootState = {} as RootState
let storageState = localStorage.getItem('state')

if (storageState) {
  initialState = JSON.parse(storageState)
  delete initialState.ui 
}

export const store = createStore(rootReducer, initialState, applyMiddleware(...middlewares))

epicMiddleware.run(rootEpic)
