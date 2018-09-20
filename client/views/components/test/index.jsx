import React from 'react'
import {observer, inject} from 'mobx-react';
@inject((stores) => ({store: stores.appState}))
@observer
class TopicDetail extends React.Component {
  componentDidMount() {
    // do something here
  }

  render() {
    return (
      <div>
        This is test content
        {this.props.store.name}
        </div>
    )
  }
}
export default TopicDetail
