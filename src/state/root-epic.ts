import { combineEpics } from 'redux-observable'

import { epic as remindersEpic } from './reminders'

export default combineEpics(
  remindersEpic
)
