import React from 'react'
import { observer } from 'mobx-react'
import Store from '../../stores/Store'
import ColorPicker from './ColorPicker'
import Biography from './Biography'
import Skills from './Skills'
import Interests from './Interests'

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
    case "skills":
      return (
        <Skills />
      )
    case "interests":
      return (
        <Interests />
      )
    default:
      return (
        <div />
      )
  }
}

export default observer(Form)