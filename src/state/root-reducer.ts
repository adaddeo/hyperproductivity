import { combineReducers } from 'redux'

import { reducer as notesReducer } from './notes'
import { reducer as remindersReducer } from './reminders'

export default combineReducers({
  notes: notesReducer,
  reminders: remindersReducer
})
