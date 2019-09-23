import { useCallback, useRef } from 'react'
import Quill, { DeltaStatic, QuillOptionsStatic } from 'quill'


export interface Options {
  configurationOptions: QuillOptionsStatic 
  textChange: (delta: DeltaStatic) => void
  initialValue: DeltaStatic
}

export default ({
  configurationOptions,
  initialValue,
  textChange
}: Options) => {
  const instance = useRef<Quill | null>(null)

  const container = useCallback(node => {
    if (node !== null && instance.current === null) {
      instance.current = new Quill(node, configurationOptions)
      instance.current.on('text-change', (delta, oldDelta, source) => source === "user" && textChange(oldDelta.compose(delta)))
      instance.current.setContents(initialValue)
      instance.current.focus()
    }
  }, [configurationOptions, textChange, initialValue])

  return container
}
