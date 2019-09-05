import { combineReducers } from 'redux'

import { reducer as remindersReducer } from './reminders'
import { reducer as notesReducer } from './notes'

const rootReducer = combineReducers({
  notes: notesReducer,
  reminders: remindersReducer
})

export default rootReducer
