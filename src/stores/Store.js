import { decorate, action, observable } from 'mobx'

class Store {
  colors = {
    first: '#FAF455',
    second: '#4B4B4B',
    third: '#FFF'
  }

  isModalActive = false
  modalContents = null

  setColors(colors) {
    this.modalContents.values.color = colors.color
    switch (colors.type) {
      case 'first':
        this.colors.first = colors.color
        break;
      case 'second':
        this.colors.second = colors.color
        break;
      case 'third':
        this.colors.third = colors.color
        break;
      default:
        break;
    }
  }

  setModalActivedStatus(active) {
    this.isModalActive = active
  }

  setModalContents(contents) {
    return new Promise((resolve, reject) => {
      this.modalContents = contents
      if (this.modalContents) {
        resolve(true)
      } else {
        reject(false)
      }
    })
  }
  
}

decorate(Store, {
  colors: observable,
  setColors: action,
  isModalActive: observable,
  setModalActivedStatus: action,
  modalContents: observable,
  setModalContents: action
})

const NewStore = new Store()

export default NewStore