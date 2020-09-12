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

const SkillItems = ({ name, amount, setSkill }) => {
  const skillNameRef = useRef(), skillAmountRef = useRef()
  
  const saveSkill = () => {
    const skill = {
      name: skillNameRef.current.value,
      amount: skillAmountRef.current.value,
    }
    setSkill(skill, "update")
  }
  
  const deleteSkill = () => {
    const skill = {
      name: skillNameRef.current.value,
      amount: skillAmountRef.current.value,
    }
    setSkill(skill, "delete")
  }

  return (
    <AccordionItem className="mt-3">
      <AccordionItemHeading>
        <AccordionItemButton className="p-5 bg-gray-200 outline-none text-gray-700 hover:bg-green-500 hover:text-white">
            { name }
        </AccordionItemButton>
      </AccordionItemHeading>
      <AccordionItemPanel className="border-l-2 border-r-2 border-b-2 p-5">
        <input
          ref={ skillNameRef }
          className="appearance-none border-2 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none"
          maxLength="25"
          type="text"
          placeholder="Skill name"
          defaultValue={ name }
        />
        <div className="flex justify-between items-center my-3">
          <p className="text-lg text-black">Proficiency</p>
          <select className="border-2 rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none"
            ref={ skillAmountRef }
            defaultValue={ amount }
          >
            { [1, 2, 3, 4, 5].map((number, index) => (
              <option key={ index }
                value={ number }
              >{ number }</option>
            )) }
          </select>
        </div>
        <div className="flex justify-between items-center text-2xl">
          <div className="cursor-pointer text-green-700"
            onClick={ () => saveSkill()}
          >
            <ion-icon name="checkmark-outline"></ion-icon>
          </div>
          <div className="cursor-pointer text-red-500"
            onClick={ () => deleteSkill()}
          >
            <ion-icon name="trash-outline"></ion-icon>
          </div>
        </div>
      </AccordionItemPanel>
    </AccordionItem>
  )
}

class Skills extends Component {
  state = {
    formDatas: {
      skills: {
        skills: [ ...Store.formDatas.skills.skills ],
        interests: [ ...Store.formDatas.skills.interests ],
      },
    }
  }

  onSkillChange = (skill, method, index) => {
    let skills = { ...this.state.formDatas.skills }
    switch (method) {
      case "update":
        skills["skills"][index] = skill
        this.setState({ formDatas: { skills } })
        Store.setFormData({
          type: "skills",
          value: skills
        })
        break;
      case "delete":
        skills["skills"].splice(index, 1)
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

  addNewSkill = () => {
    let skills = { ...this.state.formDatas.skills }
    skills["skills"].push({
      name: "New Skill",
      amount: 1
    })
    this.setState({ formDatas: { skills } })
  }

  onClose = () => {
    Store.setSideBarActivedStatus(false)
    setTimeout(function() { Store.setSideBarType(null) }, 1000);
  }

  render() {
    return(
      <div className="w-64">
        <div className="flex items-center justify-between mb-5">
          <p className="text-xl">Skills</p>
          <div className="text-2xl cursor-pointer flex items-center" onClick={() => this.onClose()}>
            <ion-icon name="close-circle-outline"></ion-icon>
          </div>
        </div>

        <Accordion
          allowMultipleExpanded={ true }
          allowZeroExpanded={ true }
          className="border-0"
        >
          { this.state.formDatas.skills.skills.map(({ name, amount }, index) => (
            <SkillItems key={ index }
              name={ name }
              amount={ amount }
              setSkill={ (skill, method) => this.onSkillChange(skill, method, index) }
            />
          )) }
        </Accordion>

        <div className="flex justify-center my-5">
          <div className="w-10 h-10 rounded-full bg-green-500 flex items-center justify-center text-white text-2xl cursor-pointer hover:bg-green-700"
            onClick={ () => this.addNewSkill() }
          >
            <ion-icon name="add-outline"></ion-icon>
          </div>
        </div>
      </div>
    )
  }
}

export default observer(Skills)