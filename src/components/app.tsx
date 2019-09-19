import React from 'react'
import { Router, RouteComponentProps } from "@reach/router"

import SideNav from './side-nav'
import Reminders from './reminders'

type Props = { component: React.FunctionComponent } & RouteComponentProps

const Route: React.FunctionComponent<Props> = ({ component: Component }) => (
  <Component />
);

function App() {
  return (
    <div className="pane-row dark-mode">
      <SideNav />
      <Router className="pane">
        <Route component={Reminders} path="/reminders" default />
      </Router>
    </div>
  )
}

export default App
