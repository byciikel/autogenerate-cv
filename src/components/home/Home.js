import React, { Component } from 'react'
import { observer } from 'mobx-react'
import Store from '../../stores/Store'
import SideBar from '../sideBar/SideBar'
import SideMenu from '../sideMenu/SideMenu'
import Navigation from '../navigation/Navigation'
import Page from '../page/Page'
import ElegancyTemplate from '../templates/ElegancyTemplate'

class Index extends Component {
  state = {
    activeNav: "editor",
  }
  onNavigateTo = (nav) => {
    this.setState({
      activeNav: nav
    })
  }

  render() {
    let { activeNav } = this.state
    const { sideMenu } = Store
    return (
      <div className="bg-gray-100 py-12">
        <Navigation activeNav={activeNav} onNavigate={(nav) => this.onNavigateTo(nav)} />
        <Page>
          <ElegancyTemplate/>
        </Page>
        <div className="flex items-center fixed inset-y-0 right-0">
          <div className="flex flex-col">
            { sideMenu.map((menu, index) => (
              <SideMenu key={ index } { ...menu } />
            ))}
          </div>
        </div>
        <div className="flex items-center fixed inset-y-0 right-0">
          <SideBar />
        </div>
      </div>
    )
  }
}

export default observer(Index)
