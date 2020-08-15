import { decorate, action, observable } from 'mobx'

class Store {
  formDatas = {
    colors: ['#FAF455', '#4B4B4B', '#FFF'],
    name: "your name",
    date_of_birth: "",
    address: "",
    phone: "",
    email: "",
    website: "",
    socials: [],
    position: "desirable position",
    about: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
    skills: [
      { name: "Microsoft", amount: 4 },
      { name: "Photoshop", amount: 3.5 },
      { name: "Illustrator", amount: 4 },
      { name: "Indesign", amount: 3 },
      { name: "Coreldraw", amount: 2 },
      { name: "Premiere", amount: 5 },
    ],
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

  setFormData(data) {
    this.formDatas[data.type] = data.value
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
  setSideBarType: action,
  setFormData: action
})

const NewStore = new Store()

export default NewStore