import React from 'react'
import { connect } from 'react-redux'

import { RootState } from 'store-types'
import { tagsSelector } from '../state/selectors'


type Props =
  ReturnType<typeof mapStateToProps>

function Tags(props: Props) {
  const { tags } = props

  if (tags.length === 0) {
    return <div>No tags</div>
  }

  return (
    <div className="pane-unbody">
      <nav className="side-nav">
        { tags.length > 0 &&
          tags.map(tag => (
            <a key={tag.handle} href="#tags">
              <div className="flex flex-between">
                <div><span className="text-muted">#</span> {tag.handle}</div>
                <div>{tag.count}</div>
              </div>
            </a>
          ))
        }
      </nav>
    </div>
  )
}

const mapStateToProps = (state: RootState) => ({
  tags: tagsSelector(state)
})

export default connect(
  mapStateToProps
)(Tags)
