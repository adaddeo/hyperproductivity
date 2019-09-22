import { combineReducers } from 'redux'

import { reducer as notesReducer } from './notes'
import { reducer as remindersReducer } from './reminders'
import { reducer as uiReducer } from './ui'

export default combineReducers({
  notes: notesReducer,
  reminders: remindersReducer,
  ui: uiReducer
})
