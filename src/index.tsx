import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import 'normalize.css'

import './index.scss'
import { store } from './state'
import App from './components/app'
import * as serviceWorker from './serviceWorker'
import { getDatabase } from './storage/memory'
import { init } from './state/reminders'

try {
  const remindersDb = getDatabase('reminders')
  store.dispatch(init(Object.values(remindersDb)))
} catch (error) {
  console.log(error)
}

const rootElement = document.getElementById('root')

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  rootElement
)

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister()
