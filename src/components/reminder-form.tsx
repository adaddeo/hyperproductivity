import { unitOfTime } from 'moment'
import React, { useState } from 'react'
import { bindActionCreators, Dispatch } from 'redux'
import { connect } from 'react-redux'

import { useInputState } from '../hooks'
import { actions } from '../state/reminders'

type Props = ReturnType<typeof mapDispatchToProps>

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
  const [firstOccurrence, setFirstOccurrence, handleFirstOccurrenceChange] = useInputState()
  const [tags, setTags, handleTagsChange] = useInputState('')
  const [frequencyCount, setFrequencyCount, handleFrequencyCountChange] = useInputState('1')
  const [frequencyUnit, setFrequencyUnit, handleFrequencyUnitChange] = useInputState('day')

  const [errors, setErrors] = useState<FormError[]>([])

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    const errs: FormError[] = []

    if (title.length === 0) {
      errs.push({ key: 'title', message: 'Title must be set.' })
    }

    if (firstOccurrence.length === 0) {
      errs.push({ key: 'firstOccurence', message: 'First ocurrence must be set.' })
    }

    const tagsArray = tags.length > 0 ? tags.split(/,\s*/) : []

    if (errs.length === 0) {
      add({
        title,
        description,
        tags: tagsArray,
        nextOccurrence: firstOccurrence,
        frequency: {
          count: parseInt(frequencyCount),
          unit: frequencyUnit as unitOfTime.Base
        }
      })

      setTitle('')
      setDescription('')
      setFirstOccurrence('')
      setTags('')
      setFrequencyCount('1')
      setFrequencyUnit('day')
      setErrors([])
    } else {
      setErrors(errs)
    }

    event.preventDefault()
  }

  return (
    <div>
      <h5>Add Reminder</h5>

      <form className="form-stacked" onSubmit={handleSubmit}>
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
          placeholder="First occurrence"
          className="text-input"
          value={firstOccurrence}
          onChange={handleFirstOccurrenceChange}
        />
        <input
          type="text"
          placeholder="Tags"
          value={tags}
          onChange={handleTagsChange}
        />

        <div className="grid">
          <div className="width-1-2">
            <input
              type="number"
              min="1"
              step="1"
              value={frequencyCount}
              onChange={handleFrequencyCountChange}
            />
          </div>
          <div className="width-1-2">
            <select value={frequencyUnit} onChange={handleFrequencyUnitChange}>
              { frequencyUnits.map(
                  unit =>
                    <option key={unit} value={unit}>{unit + (frequencyCount === '1' ? '' : 's')}</option>
                )
              }
            </select>
          </div>
        </div>

        <div className="margin-top">
          <input type="submit" value="Add" className="button-green" style={{width: '100%'}} />
        </div>

        { errors.length > 0 &&
          <div className="margin-top">
            { errors.map(
              ({ message }, idx) =>
                <div key={idx} className="text-error margin-2-top">
                  {message}
                </div>
              )
            }
          </div>
        }
      </form>
    </div>
  )
}

const mapDispatchToProps = (dispatch: Dispatch) =>
  bindActionCreators({
    add: actions.add
  }, dispatch)

export default connect(
  null,
  mapDispatchToProps
)(Form)
