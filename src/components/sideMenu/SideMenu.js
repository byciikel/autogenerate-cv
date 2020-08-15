import React from 'react'
import { observer } from 'mobx-react'
import Store from '../../stores/Store'

function onMenuClicked(name) {
  Store.setSideBarType(name)
  Store.setSideBarActivedStatus(true)
}

function SideMenu({ name, icon }) {

  return (
    <div onClick={() => onMenuClicked(name)} className="side-menu flex items-center capitalize rounded-l-full cursor-pointer p-5 my-2 bg-white h-12 w-40 shadow-xl text-gray-900 hover:bg-gray-200">
      <div className="text-2xl flex items-center mr-3 animate__animated animate__pulse animate__infinite">
        <ion-icon name={ icon }></ion-icon>
      </div>
      <p>{ name }</p>
    </div>
  )
}

export default observer(SideMenu)