import React, { useState } from 'react'
import { connect } from 'react-redux'

import { RootState } from './state/index'
import { Item, actions, AddOptions } from './state/items'

interface Props {
  items: Item[],
  add: (item: AddOptions) => void
  remove: (id: string) => void
}

function App(props: Props) {
  const { items, add } = props

  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')

  function handleTitleChange(event: React.ChangeEvent<HTMLInputElement>) {
    setTitle(event.target.value)
  }

  function handleDescriptionChange(event: React.ChangeEvent<HTMLInputElement>) {
    setDescription(event.target.value)
  }

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    if (title.length > 0) {
      add({ title, description })
      setTitle('')
      setDescription('')
    }

    event.preventDefault()
  }

  return (
    <React.Fragment>
      <form onSubmit={handleSubmit}>
        <div>
          <input
            type="text"
            placeholder="title"
            value={title}
            onChange={handleTitleChange}
          />
        </div>
        <div>
          <input
            type="text"
            placeholder="description"
            value={description}
            onChange={handleDescriptionChange}
          />
        </div>

        <input type="submit" value="Add" />
      </form>

      <div>
        { items.map((item, idx) => <li key={idx}>{item.title}</li>) }
      </div>
    </React.Fragment>
  )
}

const mapStateToProps = (state: RootState) => state
const mapDispatchToProps = {
  add: actions.add,
  remove: actions.remove
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App)
