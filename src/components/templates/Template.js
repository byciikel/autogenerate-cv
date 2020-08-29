import React from 'react'
import { observer } from 'mobx-react'

import Store from '../../stores/Store'
import ElegancyTemplate from './ElegancyTemplate'

const Template = () => {
  switch (Store.activeTemplate) {
    case "Elegancy":
      return (
        <ElegancyTemplate />
      )
    default:
      return (
        <ElegancyTemplate />
      )
  }
}

export default observer(Template)
