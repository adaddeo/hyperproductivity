import { combineReducers } from 'redux'

import { reducer as remindersReducer } from './reminders'

const rootReducer = combineReducers({
  reminders: remindersReducer
})

export default rootReducer
