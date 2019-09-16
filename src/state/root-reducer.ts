import { combineReducers } from 'redux'

import { reducer as notesReducer } from './notes'
import { reducer as remindersReducer } from './reminders'
import { reducer as tagsReducer } from './tags'


export default combineReducers({
  notes: notesReducer,
  reminders: remindersReducer,
  tags: tagsReducer
})
