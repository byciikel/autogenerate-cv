import React, { Component } from 'react'
import SideBar from '../sideBar/SideBar'
import Navigation from '../navigation/Navigation'
import Page from '../page/Page'
import ElegancyTemplate from '../templates/ElegancyTemplate'

export class Index extends Component {
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
    return (
      <div className="bg-gray-100 py-12">
        <Navigation activeNav={activeNav} onNavigate={(nav) => this.onNavigateTo(nav)} />
        <Page>
          <ElegancyTemplate/>
        </Page>
        <div className="flex items-center fixed inset-y-0 right-0">
          <SideBar />
        </div>
      </div>
    )
  }
}

export default Index
