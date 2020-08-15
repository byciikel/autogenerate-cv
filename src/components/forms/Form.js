import React from 'react'
import { observer } from 'mobx-react'
import Store from '../../stores/Store'
import ColorPicker from './ColorPicker'

function Form() {
  const { sideBarType } = Store
  if (sideBarType === "general") {
    return (
      <ColorPicker />
    )
  } else {
    return (
      <div/>
    )
  }
}

export default observer(Form)