import React from 'react'
import { observer } from 'mobx-react'
import Store from '../../stores/Store'

const onMenuClicked = async (name) => {
  Store.setSideBarActivedStatus(false)
  if (Store.sideBarType === null) {
    Store.setSideBarType(name)
    Store.setSideBarActivedStatus(true)
  }
  setTimeout(() => {
    Store.setSideBarType(name)
    Store.setSideBarActivedStatus(true)
  }, 700)
}

const SideMenu = ({ name, icon }) => {

  return (
    <div
      onClick={ () => onMenuClicked(name) }
      className="side-menu flex items-center capitalize rounded-r-full cursor-pointer p-5 my-2 bg-white h-12 w-40 shadow-xl text-gray-900 hover:bg-gray-200"
    >
      <p className="flex-1 text-center mr-3 text-sm">{ name }</p>
      <div className="text-2xl flex items-center animate__animated animate__pulse animate__infinite">
        <ion-icon name={ icon }></ion-icon>
      </div>
    </div>
  )
}

export default observer(SideMenu)