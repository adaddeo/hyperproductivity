import React, { useState } from 'react'
import { connect } from 'react-redux'

import { useInputState } from '../hooks'
import { actions, AddOptions } from '../state/reminders'

interface Props {
  add: (item: AddOptions) => void
}

interface FormError {
  key: string
  message: string
}

const frequencyUnits = [
  'day',
  'week',
  'month',
  'year'
]

function Form(props: Props) {
  const { add } = props

  const [title, setTitle, handleTitleChange] = useInputState()
  const [description, setDescription, handleDescriptionChange] = useInputState()
  const [start, setStart, handleStartChange] = useInputState()
  const [frequency, setFrequency, handleFrequencyChange] = useInputState('1')
  const [frequencyUnit, setFrequencyUnit, handleFrequencyUnitChange] = useInputState('day')

  const [errors, setErrors] = useState<FormError[]>([])

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    const errs: FormError[] = []

    if (title.length === 0) {
      errs.push({ key: 'title', message: 'Title must be set.' })
    }

    const frequencyString = frequency + ' ' + frequencyUnit

    if (errs.length === 0) {
      add({
        title,
        description,
        start,
        frequency: frequencyString
      })

      setTitle('')
      setDescription('')
      setStart('')
      setFrequency('1')
      setFrequencyUnit('day')
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
        className="text-input"
        value={title}
        onChange={handleTitleChange}
      />
      <input
        type="text"
        placeholder="Description"
        className="text-input"
        value={description}
        onChange={handleDescriptionChange}
      />
      <input
        type="text"
        placeholder="Starts on"
        className="text-input"
        value={start}
        onChange={handleStartChange}
      />

      <div className="row">
        <div className="column column-50">
          <input
            type="number"
            min="1"
            step="1"
            value={frequency}
            onChange={handleFrequencyChange}
          />
        </div>
        <div className="column column-50">
          <select value={frequencyUnit} onChange={handleFrequencyUnitChange}>
            { frequencyUnits.map(
                unit =>
                  <option key={unit} value={unit}>{unit + (frequency === '1' ? '' : 's')}</option>
              )
            }
          </select>
        </div>
      </div>

      <input type="submit" value="Add Reminder" className="button" style={{width: '100%'}} />

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
)(Form)
