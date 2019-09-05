import { combineReducers } from 'redux'

import { reducer as remindersReducer } from './reminders'
import { reducer as notesReducer } from './notes'

export default combineReducers({
  notes: notesReducer,
  reminders: remindersReducer
})
