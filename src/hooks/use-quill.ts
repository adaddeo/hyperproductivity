import { useCallback, useRef } from 'react'
import Quill, { DeltaStatic } from 'quill'


export interface Options {
  textChange: (delta: DeltaStatic) => void
  initialValue: DeltaStatic
}

export default ({
  initialValue,
  textChange
}: Options) => {
  const instance = useRef<Quill | null>(null)

  const container = useCallback(node => {
    if (node !== null && instance.current === null) {
      instance.current = new Quill(node, { theme: 'snow' })
      instance.current.on('text-change', (delta, oldDelta, source) => textChange(oldDelta.compose(delta)))
      instance.current.setContents(initialValue)
      instance.current.focus()
    }
  }, [textChange, initialValue])

  return container
}
