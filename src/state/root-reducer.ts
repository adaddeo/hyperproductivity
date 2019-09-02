import { combineReducers } from 'redux'

import { reducer as itemsReducer } from './items'

const rootReducer = combineReducers({
  items: itemsReducer
})

export default rootReducer
