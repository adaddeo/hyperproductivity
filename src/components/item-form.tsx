import React, { useState } from 'react'
import { connect } from 'react-redux'

import { actions, AddOptions } from '../state/items'

interface Props {
  add: (item: AddOptions) => void
}

interface FormError {
  key: string
  message: string
}

function ItemForm(props: Props) {
  const { add } = props

  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [errors, setErrors] = useState<FormError[]>([])

  function handleTitleChange(event: React.ChangeEvent<HTMLInputElement>) {
    setTitle(event.target.value)
  }

  function handleDescriptionChange(event: React.ChangeEvent<HTMLInputElement>) {
    setDescription(event.target.value)
  }

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    const errs: FormError[] = []

    if (title.length === 0) {
      errs.push({ key: 'title', message: 'Title must be set.' })
    }

    if (errs.length === 0) {
      add({ title, description })
      setTitle('')
      setDescription('')
      setErrors([])
    } else {
      setErrors(errs)
    }

    event.preventDefault()
  }

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Title"
        value={title}
        onChange={handleTitleChange}
      />
      <input
        type="text"
        placeholder="Description"
        value={description}
        onChange={handleDescriptionChange}
      />

      <input type="submit" value="Add" className="button" />

      { errors.length > 0 &&
        errors.map(
          ({ message }, idx) =>
            <div key={idx} className="text-error">
              {message}
            </div>
        )
      }
    </form>
  )
}

const mapDispatchToProps = {
  add: actions.add
}

export default connect(
  null,
  mapDispatchToProps
)(ItemForm)
