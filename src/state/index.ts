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

export const store = createStore(rootReducer, {}, applyMiddleware(...middlewares))

epicMiddleware.run(rootEpic)
