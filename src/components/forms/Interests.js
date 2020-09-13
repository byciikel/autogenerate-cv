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

const IntrerestItems = ({ name, icon, setInterest }) => {
  const interestNameRef = useRef(), interestIconRef = useRef()
  
  const saveInterest = () => {
    const interest = {
      name: interestNameRef.current.value,
      icon: interestIconRef.current.value,
    }
    setInterest(interest, "update")
  }
  
  const deleteInterest = () => {
    const interest = {
      name: interestNameRef.current.value,
      icon: interestIconRef.current.value,
    }
    setInterest(interest, "delete")
  }

  const saveInterestToState = () => {
    const interest = {
      name: interestNameRef.current.value,
      icon: interestIconRef.current.value,
    }
    setInterest(interest, "update-to-state")
  }

  return (
    <AccordionItem className="mt-3">
      <AccordionItemHeading>
        <AccordionItemButton className="p-5 bg-gray-200 outline-none text-gray-700 hover:bg-green-500 hover:text-white capitalize">
            { name }
        </AccordionItemButton>
      </AccordionItemHeading>
      <AccordionItemPanel className="border-l-2 border-r-2 border-b-2 p-5">
        <p className="text-sm text-black my-3">Field Name</p>
        <input
          ref={ interestNameRef }
          className="appearance-none border-2 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none"
          maxLength="25"
          type="text"
          placeholder="field name"
          defaultValue={ name }
        />
        <p className="text-sm text-black my-3">Icon</p>
        <div className="flex justify-between items-center mb-3">
          <select className="border-2 rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none truncate w-32"
            ref={ interestIconRef }
            defaultValue={ icon }
            onChange={ () => saveInterestToState() }
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
        <div className="flex justify-between items-center text-2xl">
          <div className="cursor-pointer text-green-700"
            onClick={ () => saveInterest()}
          >
            <ion-icon name="checkmark-outline"></ion-icon>
          </div>
          <div className="cursor-pointer text-red-500"
            onClick={ () => deleteInterest()}
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
      skills: {
        skills: [ ...Store.formDatas.skills.skills ],
        interests: [ ...Store.formDatas.skills.interests ],
      },
    }
  }

  onInterestChange = (interest, method, index) => {
    let skills = { ...this.state.formDatas.skills }
    switch (method) {
      case "update":
        skills["interests"][index] = interest
        this.setState({ formDatas: { skills } })
        Store.setFormData({
          type: "skills",
          value: skills
        })
        break;
      case "update-to-state":
        skills["interests"][index] = interest
        this.setState({ formDatas: { skills } })
        break;
      case "delete":
        skills["interests"].splice(index, 1)
        this.setState({ formDatas: { skills } })
        Store.setFormData({
          type: "skills",
          value: skills
        })
        break;
      default:
        break;
    }
  }

  addNewInterest = () => {
    let skills = { ...this.state.formDatas.skills }
    skills["interests"].push({
      name: "New Interest",
      icon: "desktop"
    })
    this.setState({ formDatas: { skills } })
    Store.setFormData({
      type: "skills",
      value: skills
    })
  }

  onClose = () => {
    Store.setSideBarActivedStatus(false)
    setTimeout(function() { Store.setSideBarType(null) }, 1000);
  }

  render() {
    return(
      <div className="w-64">
        <div className="flex items-center justify-between mb-5">
          <p className="text-xl">Your Interest</p>
          <div className="text-2xl cursor-pointer flex items-center" onClick={() => this.onClose()}>
            <ion-icon name="close-circle-outline"></ion-icon>
          </div>
        </div>

        <Accordion
          allowMultipleExpanded={ true }
          allowZeroExpanded={ true }
          className="border-0"
        >
          { this.state.formDatas.skills.interests.map(({ name, icon }, index) => (
            <IntrerestItems key={ index }
              name={ name }
              icon={ icon }
              setInterest={ (interest, method) => this.onInterestChange(interest, method, index) }
            />
          )) }
        </Accordion>

        { this.state.formDatas.skills.interests.length === 12 ?
          <p className="my-5 text-sm text-center text-red-500">You hit the limit for interests</p>
        :
          <div className="flex justify-center my-5">
            <div className="w-10 h-10 rounded-full bg-green-500 flex items-center justify-center text-white text-2xl cursor-pointer hover:bg-green-700"
              onClick={ () => this.addNewInterest() }
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