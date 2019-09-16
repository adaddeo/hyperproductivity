import React from 'react'
import { connect } from 'react-redux'

import { RootState } from 'store-types'

type Props =
  ReturnType<typeof mapStateToProps>

function Tags(props: Props) {
  const { tags } = props

  if (tags.length === 0) {
    return <div>No tags</div>
  }

  return (
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
  )
}

const mapStateToProps = (state: RootState) => ({
  tags: state.tags
})

export default connect(
  mapStateToProps
)(Tags)
