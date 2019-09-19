import { combineEpics } from 'redux-observable'
import { tap, ignoreElements } from 'rxjs/operators'
import { Epic } from 'store-types'

export const storageEpic: Epic = (action$, state$) => state$.pipe(
  tap(state => localStorage.setItem('state', JSON.stringify(state))),
  ignoreElements()
)

export default combineEpics(
  storageEpic
)
