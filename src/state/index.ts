import { StateType } from 'typesafe-actions'
import { createStore, applyMiddleware } from 'redux'
import logger from 'redux-logger'
// import { createEpicMiddleware } from 'redux-observable'


import rootReducer from './root-reducer'
// import rootEpic from './root-epic'


// export const epicMiddleware = createEpicMiddleware<
//   RootAction,
//   RootAction,
//   RootState,
// >()

// export const store = createStore(rootReducer, applyMiddleware(epicMiddleware))

// epicMiddleware.run(rootEpic)

const middlewares = []

// if (process.env.NODE_ENV === `development`) {
//   middlewares.push(logger)
// }

middlewares.push(logger)

export const store = createStore(rootReducer, {}, applyMiddleware(...middlewares))

export type RootState = StateType<ReturnType<typeof rootReducer>>
