import React, { Component, useRef } from 'react'
import { observer } from 'mobx-react'
import {
  Accordion,
  AccordionItem,
  AccordionItemHeading,
  AccordionItemButton,
  AccordionItemPanel,
} from 'react-accessible-accordion';

import Store from '../../stores/Store'

const SocialItems = ({ name, icon, link, setSocial }) => {
  const socialNameRef = useRef(), socialIconRef = useRef(), socialLinkRef = useRef()
  
  const saveSocial = () => {
    const social = {
      name: socialNameRef.current.value,
      icon: socialIconRef.current.value,
      link: "/" + socialLinkRef.current.value
    }
    setSocial(social, "update")
  }
  
  const deleteSocial = () => {
    const social = {
      name: socialNameRef.current.value,
      icon: socialIconRef.current.value,
      link: "/" + socialLinkRef.current.value
    }
    setSocial(social, "delete")
  }

  const saveSocialToState = () => {
    const social = {
      name: socialNameRef.current.value,
      icon: socialIconRef.current.value,
      link: "/" + socialLinkRef.current.value
    }
    setSocial(social, "update-to-state")
  }

  return (
    <AccordionItem className="mt-3">
      <AccordionItemHeading>
        <AccordionItemButton className="p-5 bg-gray-200 outline-none text-gray-700 hover:bg-green-500 hover:text-white capitalize">
            { name }
        </AccordionItemButton>
      </AccordionItemHeading>
      <AccordionItemPanel className="border-l-2 border-r-2 border-b-2 p-5">
        <p className="text-sm text-black my-3">Account Name</p>
        <input
          ref={ socialNameRef }
          className="appearance-none border-2 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none"
          maxLength="25"
          type="text"
          placeholder="account name"
          defaultValue={ name }
        />
        <p className="text-sm text-black my-3">Icon</p>
        <div className="flex justify-between items-center">
          <select className="border-2 rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none truncate w-32"
            ref={ socialIconRef }
            defaultValue={ icon }
            onChange={ () => saveSocialToState() }
          >
            { Store.iconList.map((iconName, index) => (
              <option key={ index }
                value={ iconName }
              >{ iconName }</option>
            )) }
          </select>
          <div className="text-2xl text-black">
            <ion-icon name={ icon }></ion-icon>
          </div>
        </div>
        <p className="text-sm text-black my-3">Icon</p>
        <input
          ref={ socialLinkRef }
          className="appearance-none border-2 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none mb-3"
          type="text"
          placeholder="social link"
          defaultValue={ link.slice(1) }
        />
        <div className="flex justify-between items-center text-2xl">
          <div className="cursor-pointer text-green-700"
            onClick={ () => saveSocial()}
          >
            <ion-icon name="checkmark-outline"></ion-icon>
          </div>
          <div className="cursor-pointer text-red-500"
            onClick={ () => deleteSocial()}
          >
            <ion-icon name="trash-outline"></ion-icon>
          </div>
        </div>
      </AccordionItemPanel>
    </AccordionItem>
  )
}

class Interest extends Component {
  state = {
    formDatas: {
      socials: [ ...Store.formDatas.socials ]
    }
  }

  onSocialChange = (social, method, index) => {
    let formDatas = { ...this.state.formDatas }
    switch (method) {
      case "update":
        formDatas["socials"][index] = social
        this.setState({ formDatas })
        Store.setFormData({
          type: "socials",
          value: formDatas["socials"]
        })
        break;
      case "update-to-state":
        formDatas["socials"][index] = social
        this.setState({ formDatas })
        break;
      case "delete":
        formDatas["socials"].splice(index, 1)
        this.setState({ formDatas })
        Store.setFormData({
          type: "socials",
          value: formDatas["socials"]
        })
        break;
      default:
        break;
    }
  }

  addNewSocial = () => {
    let formDatas = { ...this.state.formDatas }
    formDatas["socials"].push({
      name: "New Social",
      icon: "logo-facebook",
      link: ""
    })
    this.setState({ formDatas })
  }

  onClose = () => {
    Store.setSideBarActivedStatus(false)
    setTimeout(function() { Store.setSideBarType(null) }, 1000);
  }
  
  render() {
    return(
      <div className="w-64">
        <div className="flex items-center justify-between mb-5">
          <p className="text-xl">Your Social</p>
          <div className="text-2xl cursor-pointer flex items-center" onClick={() => this.onClose()}>
            <ion-icon name="close-circle-outline"></ion-icon>
          </div>
        </div>

        <Accordion
          allowMultipleExpanded={ true }
          allowZeroExpanded={ true }
          className="border-0"
        >
          { this.state.formDatas.socials.map(({ name, icon, link }, index) => (
            <SocialItems key={ index }
              name={ name }
              icon={ icon }
              link={ link }
              setSocial={ (social, method) => this.onSocialChange(social, method, index) }
            />
          )) }
        </Accordion>

        { this.state.formDatas.socials.length === 4 ?
          <p className="my-5 text-sm text-center text-red-500">You hit the limit for social media</p>
        :
          <div className="flex justify-center my-5">
            <div className="w-10 h-10 rounded-full bg-green-500 flex items-center justify-center text-white text-2xl cursor-pointer hover:bg-green-700"
              onClick={ () => this.addNewSocial() }
            >
              <ion-icon name="add-outline"></ion-icon>
            </div>
          </div>
        }
      </div>
    )
  }
}

export default observer(Interest)