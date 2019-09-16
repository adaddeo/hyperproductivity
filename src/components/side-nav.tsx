import React from 'react'
import { Link } from "@reach/router"

import Tags from './tags'
import './side-nav.scss'

function SideNav() {
  return (
    <div className="pane pane-fixed left-nav-pane">
      <div className="pane-body">
        <h5>Views</h5>

        <div className="pane-unbody">
          <div className="side-nav">
            <Link to="/events">Events</Link>
            <Link to="/notes">Notes</Link>
            <Link to="/reminders">Reminders</Link>
            <Link to="/tasks">Tasks</Link>
          </div>
        </div>

        <h5 className="margin-6-top">Tags</h5>

        <Tags />
      </div>
    </div>
  )
}

export default SideNav
