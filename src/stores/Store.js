import { decorate, action, observable } from 'mobx'

class Store {
  formDatas = {
    colors: ['#FAF455', '#4B4B4B', '#FFF'],
    image: {},
    bio: {
      basic: {
        name: "your name",
        position: "desirable position",
        about: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
      },
      specific: {
        date_of_birth: "10 December 1998",
        address: "Taman Puspa Sari F-20, Waru, Sidoarjo",
        phone: "085791506780",
        email: "examples@gmail.com",
        website: "www.examples.com",
      }
    },
    socials: [
      { name: "Fawwaz Afif Alvian", icon: "logo-facebook", link: "https://www.google.com/" },
      { name: "Fawwaz Afif Alvian", icon: "logo-twitter", link: "https://www.google.com/" },
      { name: "Fawwaz Afif Alvian", icon: "logo-linkedin", link: "https://www.google.com/" },
    ],
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

  sideMenu = [
    { name: "general", icon: "cog-outline" },
    { name: "biography", icon: "person-circle-outline" },
    { name: "skills", icon: "star-half-outline" },
    { name: "interests", icon: "american-football-outline" },
    { name: "educations", icon: "school-outline" },
    { name: "experiences", icon: "document-text-outline" },
    { name: "socials", icon: "at-outline" },
  ]

  isSideBarActive = false
  sideBarType = null

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
  sideMenu: observable,
  setColor: action,
  isSideBarActive: observable,
  setSideBarActivedStatus: action,
  sideBarType: observable,
  setSideBarType: action,
  setFormData: action
})

const NewStore = new Store()

export default NewStore