import { decorate, action, observable } from 'mobx'

class Store {
  formDatas = {
    colors: ['#FAF455', '#4B4B4B', '#FFF'],
    name: "",
    date_of_birth: "",
    address: "",
    phone: "",
    email: "",
    website: "",
    socials: [],
    position: "",
    about: "",
    skills: [],
    educations: [],
    experiences: [],
    organizations: []
  }

  isSideBarActive = true
  sideBarType = "color-picker"

  setColor(color, index) {
    if (color) {
      this.formDatas.colors[index] = color
    } else {
      this.formDatas.colors = ['#FAF455', '#4B4B4B', '#FFF']
    }
  }

  setSideBarActivedStatus(active) {
    this.isSideBarActive = active
  }

  setSideBarType(type) {
    this.sideBarType = type
  }
  
}

decorate(Store, {
  formDatas: observable,
  setColor: action,
  isSideBarActive: observable,
  setSideBarActivedStatus: action,
  sideBarType: observable,
  setSideBarType: action
})

const NewStore = new Store()

export default NewStore