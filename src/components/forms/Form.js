import React from 'react'
import { observer } from 'mobx-react'
import Store from '../../stores/Store'
import ColorPicker from './ColorPicker'
import Biography from './Biography'

function Form() {
  const { sideBarType } = Store
  switch (sideBarType) {
    case "general":
      return (
        <ColorPicker />
      )
    case "biography":
      return (
        <Biography />
      )
    default:
      return (
        <div />
      )
  }
}

export default observer(Form)