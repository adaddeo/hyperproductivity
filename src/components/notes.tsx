import React from 'react'

import NotesNavigation from './notes-navigation'
import NoteEditor from './note-editor'


function Notes() {
  return (
    <div className="pane-row">
      <div className="pane pane-fixed pane-width-3">
        <NotesNavigation />
      </div>
      <div className="pane">
        <NoteEditor />
      </div>
    </div>
  )
}

export default Notes
