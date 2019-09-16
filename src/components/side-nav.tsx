import React from 'react'
import { connect } from 'react-redux'

import { RootState } from 'store-types'
import './side-nav.scss'

type Props =
  ReturnType<typeof mapStateToProps>

function SideNav(props: Props) {
  const { tags } = props

  return (
    <div className="pane pane-fixed left-nav-pane">
      <div className="pane-body">
        <h5>Views</h5>

        <div className="pane-unbody">
          <div className="side-nav">
            <a href="#events">Events</a>
            <a href="#notes">Notes</a>
            <a href="#reminders">Reminders</a>
            <a href="#tasks">Tasks</a>
          </div>
        </div>

        <h5 className="margin-6-top">Tags</h5>

        <div className="pane-unbody">
          <div className="side-nav">
            { tags.length > 0 &&
              tags.map(tag => (
                <a key={tag.id} href="#tags">
                  <div className="flex flex-between">
                    <div><span className="text-muted">#</span> {tag.handle}</div>
                    <div>{tag.count}</div>
                  </div>
                </a>
              ))
            }
          </div>
        </div>
      </div>
    </div>
  )
}

const mapStateToProps = (state: RootState) => ({
  tags: state.tags
})

export default connect(
  mapStateToProps
)(SideNav)
