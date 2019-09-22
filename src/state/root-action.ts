import { actions as notesActions } from './notes'
import { actions as remindersActions } from './reminders'
import { actions as uiActions } from './ui'


export default {
  notes: notesActions,
  reminders: remindersActions,
  ui: uiActions
}
