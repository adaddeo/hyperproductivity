import React from 'react'
import { Router, RouteComponentProps } from "@reach/router"

import Notes from './notes'
import Reminders from './reminders'
import SideNav from './side-nav'


type Props = { component: React.FunctionComponent | React.ComponentClass } & RouteComponentProps

const Route: React.FunctionComponent<Props> = ({ component: Component }) => (
  <Component />
);

function App() {
  return (
    <div className="pane-row dark-mode">
      <div className="pane pane-fixed pane-width-1">
        <SideNav />
      </div>
      <Router className="pane">
        <Route component={Reminders} path="/reminders" default />
        <Route component={Notes} path="/notes" />
      </Router>
    </div>
  )
}

export default App
