import React from 'react'
import { observer } from 'mobx-react'
import Store from '../../stores/Store'
import ColorPicker from './ColorPicker'

function Form() {
  const { sideBarType } = Store
  if (sideBarType === "color-picker") {
    return (
      <ColorPicker />
    )
  } else if (sideBarType === "input-name") {
    return (
      <div>asdas</div>
    )
  } else {
    return (
      <div/>
    )
  }
}

export default observer(Form)