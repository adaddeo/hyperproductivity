import { useState } from 'react'

const tuple = <T extends any[]>(...args: T): T => args

function useInputState(initialValue: string = '') {
  const [value, setValue] = useState(initialValue)

  function handleChange(event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) {
    setValue(event.target.value)
  }

  return tuple(value, setValue, handleChange)
}

export default useInputState
