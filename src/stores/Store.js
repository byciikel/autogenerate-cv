import { decorate, action, observable } from 'mobx'

class Store {
  iconList = [
    'logo-facebook',
    'logo-medium',
    'logo-pinterest',
    'logo-twitter',
    'logo-linkedin',
    'logo-github',
    'document-text-sharp',
    'barbell',
    'bicycle',
    'book',
    'briefcase',
    'brush',
    'camera',
    'desktop',
    'film',
    'game-controller',
    'headset'
  ]

  formDatas = {
    fileName: "AutoGenerateCV",
    colors: ['#FAF455', '#4B4B4B', '#FFF'],
    image: {},
    bio: {
      basic: {
        name: "your name",
        position: "desirable position",
        about: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean rutrum elit a interdum bibendum. Nunc id ultrices mi. Mauris at elit at ipsum tempus congue mattis vel neque. Maecenas tellus elit, placerat non odio sed, malesuada fermentum eros. Nam at ipsum nec mauris pellentesque ultricies. Sed laoreet ex metus, sit amet volutpat leo bibendum a. Vestibulum auctor ante eu risus mattis imperdiet. Morbi id fringilla metus. Sed quis fermentum magna. Praesent placerat, quam at mollis pharetra, magna arcu convallis libero, at rutrum tellus neque venenatis sapien. Nulla scelerisque congue metus, at egestas nisi. Aenean at porttitor purus. Phasellus at egestas.",
      },
      specific: {
        date_of_birth: new Date(),
        address: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
        phone: "+6285123456789",
        email: "examples@gmail.com",
        website: "www.examples.com",
      }
    },
    socials: [
      { name: "account name", icon: "logo-pinterest", link: "/https://www.google.com/" },
      { name: "account name", icon: "logo-twitter", link: "/https://www.google.com/" },
      { name: "account name", icon: "logo-linkedin", link: "/https://www.google.com/" },
    ],
    skills: {
      skills : [
        { name: "First Skill", amount: 4 },
        { name: "Second Skill", amount: 3 },
        { name: "Third Skill", amount: 4 },
        { name: "Fourth Skill", amount: 3 },
        { name: "Fifth Skill", amount: 2 },
        { name: "Sixth Skill", amount: 5 },
        { name: "Seventh Skill", amount: 2 },
        { name: "Eighth Skill", amount: 1 },
      ],
      interests : [
        { name: "Design", icon: "brush" },
        { name: "Computer", icon: "desktop" },
        { name: "Game", icon: "game-controller" },
        { name: "Design", icon: "brush" },
        { name: "Computer", icon: "desktop" },
        { name: "Game", icon: "game-controller" },
        { name: "Design", icon: "brush" },
        { name: "Computer", icon: "desktop" },
        { name: "Game", icon: "game-controller" },
        { name: "Design", icon: "brush" },
        { name: "Computer", icon: "desktop" },
        { name: "Game", icon: "game-controller" },
      ]
    },
    educations: [
      { start: '2013', end: '2016', type: 'senior high school', name: 'MAN Sidoarjo', majors: '' },
      { start: '2016', end: '2020', type: 'college', name: 'Universitas Islam Negeri Sunan Ampel Surabaya', majors: 'Information System' },
    ],
    experiences: [
      { start: '2018', end: '2019', type: 'crew', name: 'Big Bad Wolf Surabaya' },
      { start: '2018', end: '2019', type: 'crew', name: 'DBL Surabaya' },
      { start: '2019', end: '2020', type: 'internship', name: 'Kemenag Jawa Timur' },
      { start: '2019', end: '2020', type: 'data entry', name: 'Pakaidonk Startup' },
      { start: '2019', end: '2020', type: 'internship', name: 'Kemenag Jawa Timur' },
      { start: '2019', end: '2020', type: 'data entry', name: 'Pakaidonk Startup' },
      { start: '2019', end: '2020', type: 'data entry', name: 'Pakaidonk Startup' },
      { start: '2019', end: '2020', type: 'data entry', name: 'Pakaidonk Startup' },
    ],
    organizations: []
  }

  activeTemplate = "Elegancy"

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
  activeTemplate: observable,
  sideMenu: observable,
  setColor: action,
  isSideBarActive: observable,
  setSideBarActivedStatus: action,
  sideBarType: observable,
  setSideBarType: action,
  setFormData: action,
})

const NewStore = new Store()

export default NewStore