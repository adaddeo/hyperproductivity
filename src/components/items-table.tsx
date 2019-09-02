import React from 'react'
import { connect } from 'react-redux'

import { RootState } from '../state/index'
import { Item } from '../state/items'

interface Props {
  items: Item[]
}

function ItemsTable(props: Props) {
  const { items } = props

  if (items.length === 0) {
    return null
  }

  return (
    <table>
      <thead>
        <tr>
          <th>Item</th>
          <th>Status</th>
        </tr>
      </thead>
      <tbody>
        { items.map(
            (item, idx) =>
              <tr key={item.id}>
                <td>{item.title}</td>
                <td>{item.schedule}</td>
              </tr>
          )
        }
      </tbody>
    </table>
  )
}

const mapStateToProps = (state: RootState) => state

export default connect(
  mapStateToProps
)(ItemsTable)
