import React, { Component } from 'react'
import { observer } from 'mobx-react'
import Store from '../../stores/Store'
import Form from '../forms/Form'

export class SideBar extends Component {
  
  render() {
    const { isSideBarActive } = Store

    return (
      <div className={`${isSideBarActive ? 'animate__slideInRight' : 'animate__slideOutRight'} animate__animated  bg-white h-full overflow-y-auto`}>
        <div className="flex flex-col items-start px-4 mt-24">
          <Form />
        </div>
      </div>
    )
  }
}

export default observer(SideBar)

