import { actions as notesActions } from './notes'
import { actions as remindersActions } from './reminders'
import { actions as tagsActions } from './tags'


export default {
  notes: notesActions,
  reminders: remindersActions,
  tags: tagsActions
}
