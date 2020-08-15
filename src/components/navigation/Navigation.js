import React, { Component } from 'react'
import { cx } from 'emotion'
import { observer } from 'mobx-react'
import Store from '../../stores/Store'

class Navigation extends Component {
  navigate = (nav) => {
    if (nav ==='editor') {
      Store.setSideBarActivedStatus(true)
    }
    this.props.onNavigate(nav)
  }

  render() {
    let { activeNav } = this.props

    return (
      <div className="w-full text-gray-700 bg-white shadow-lg fixed z-50 top-0">
        <div className="flex flex-col max-w-screen-xl px-4 mx-auto md:items-center md:justify-between md:flex-row md:px-6 lg:px-8">
          <div className="p-4 flex flex-row items-center justify-between">
            <div className="text-lg font-semibold tracking-widest text-gray-900 uppercase rounded-lg focus:outline-none focus:shadow-outline">Autogenerate CV</div>
          </div>
          <nav className="flex-col flex-grow pb-4 md:pb-0 md:flex md:justify-end md:flex-row">
            <div onClick={() => this.navigate("editor")}
              className={
                cx(activeNav === 'editor' ? "bg-gray-200" : "",
                "px-4 py-2 mt-2 text-sm font-semibold bg-transparent rounded-lg md:mt-0 md:ml-4 hover:text-gray-900 focus:text-gray-900 hover:bg-gray-200 focus:bg-gray-200 focus:outline-none focus:shadow-outline cursor-pointer")
              }
            >
              Editor
            </div>
            <div onClick={() => this.navigate("preview")}
              className={
                cx(activeNav === 'preview' ? "bg-gray-200" : "",
                "px-4 py-2 mt-2 text-sm font-semibold bg-transparent rounded-lg md:mt-0 md:ml-4 hover:text-gray-900 focus:text-gray-900 hover:bg-gray-200 focus:bg-gray-200 focus:outline-none focus:shadow-outline cursor-pointer")
              }
            >
              Preview
            </div>
          </nav>
        </div>
      </div>
    )
  }
}

export default observer(Navigation)
