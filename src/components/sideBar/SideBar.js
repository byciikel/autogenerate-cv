import React, { Component } from 'react'
import { cx } from 'emotion'
import { observer } from 'mobx-react'
import Store from '../../stores/Store'
import Form from '../forms/Form'

export class SideBar extends Component {
  
  render() {
    const { isSideBarActive, sideBarType } = Store

    if (sideBarType !== null) {
      return (
        <div
          className={
            cx(isSideBarActive ? 'animate__slideInRight' : 'animate__slideOutRight',
            "animate__animated  bg-white h-full overflow-y-auto shadow-xl z-40")
          }>
          <div className="flex flex-col items-start px-4 mt-24">
            <Form />
          </div>
        </div>
      )
    } else {
      return (
        <div></div>
      )
    }
  }
}

export default observer(SideBar)

