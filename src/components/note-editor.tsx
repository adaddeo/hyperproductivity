import React from 'react'
import { bindActionCreators, Dispatch } from 'redux'
import { connect } from 'react-redux'
import { RootState } from 'store-types'

import { useInputState, useQuill } from '../hooks'
import { Note } from '../models/note'
import { currentNoteSelector } from '../state/selectors'
import { actions as noteActions } from '../state/notes'


type Props =
  ReturnType<typeof mapStateToProps>

function NoteEditorContainer(props: Props) {
  const { note } = props

  if (!note) {
    return null
  } else {
    return <ConnectedNoteEditor key={note.id} note={note} />
  }
}

function NoteEditor(props: { note: Note } & ReturnType<typeof mapDispatchToProps>) {
  const { note, archive, del, update } = props

  const quillContainer = useQuill({
    configurationOptions: {
      scrollingContainer: 'ql-container',
      theme: 'snow'
    },
    textChange: delta => update({ delta }),
    initialValue: note.delta
  })

  function handleChange(event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    const { name, value } = event.target
    update({ [name]: value })
  }

  return (
    <div className="pane-column">
      <div className="pane pane-fixed pane-body-condensed">
        <input
          type="text"
          name="title"
          value={note.title} 
          onChange={handleChange} 
          placeholder="Title"
          className="clear h5"
        />

        <input
          type="text"
          name="title"
          placeholder="#tags"
          className="clear"
        />
      </div>
      <div className="pane pane-fixed pane-body-minimal">
        { note.archivedAt === null ?
          <button onClick={archive}>Archive</button> :
          <button onClick={archive}>Unarchive</button>
        }

        <button className="button button-danger" onClick={del}>Delete</button>
      </div>
      <div className="pane">
        <div className="flex flex-column">
          <div ref={quillContainer} />
        </div>
      </div>
    </div>
  )
}


const mapDispatchToProps = (dispatch: Dispatch, props: { note: Note }) => {
  const { id } = props.note

  return bindActionCreators({
    archive: noteActions.archive.bind(null, id),
    del: noteActions.del.bind(null, id),
    update: noteActions.update.bind(null, id)
  }, dispatch)
}

const ConnectedNoteEditor = connect(
  null,
  mapDispatchToProps
)(NoteEditor)


const mapStateToProps = (state: RootState) => ({
  note: currentNoteSelector(state)
})

export default connect(
  mapStateToProps
)(NoteEditorContainer)
