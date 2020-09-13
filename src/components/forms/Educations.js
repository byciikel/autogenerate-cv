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

const EducaitonItem = ({ name, description, start, end, setEducation }) => {
  const educaitonNameRef = useRef(), educaitonDescriptionRef = useRef(), educationStartRef = useRef(), educationEndRef = useRef()
  
  const saveEducation = () => {
    const education = {
      name: educaitonNameRef.current.value,
      description: educaitonDescriptionRef.current.value,
      start: educationStartRef.current.value,
      end: educationEndRef.current.value
    }
    setEducation(education, "update")
  }
  
  const deleteEducation = () => {
    const education = {
      name: educaitonNameRef.current.value,
      description: educaitonDescriptionRef.current.value,
      start: educationStartRef.current.value,
      end: educationEndRef.current.value
    }
    setEducation(education, "delete")
  }

  return (
    <AccordionItem className="mt-3">
      <AccordionItemHeading>
        <AccordionItemButton className="p-5 bg-gray-200 outline-none text-gray-700 hover:bg-green-500 hover:text-white capitalize">
            { name }
        </AccordionItemButton>
      </AccordionItemHeading>
      <AccordionItemPanel className="border-l-2 border-r-2 border-b-2 p-5">
        <p className="text-sm text-black my-3">Education Name</p>
        <input
          ref={ educaitonNameRef }
          className="appearance-none border-2 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none"
          maxLength="25"
          type="text"
          placeholder="education name"
          defaultValue={ name }
        />
        <p className="text-sm text-black my-3">Description</p>
        <textarea
          ref={ educaitonDescriptionRef }
          className="appearance-none border-2 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none"
          maxLength="200"
          rows="5"
          placeholder="description"
          defaultValue={ description }
        ></textarea>
        <div className="flex justify-between items-center mb-3">
          <p className="text-sm text-black my-3">Start Date</p>
          <p className="text-sm text-black my-3">End Date</p>
        </div>
        <div className="flex justify-between items-center mb-3">
          <input
            ref={ educationStartRef }
            className="appearance-none border-2 rounded w-24 py-2 px-3 text-gray-700 leading-tight focus:outline-none"
            maxLength="10"
            type="text"
            placeholder="start"
            defaultValue={ start }
          />
          <input
            ref={ educationEndRef }
            className="appearance-none border-2 rounded w-24 py-2 px-3 text-gray-700 leading-tight focus:outline-none"
            maxLength="10"
            type="text"
            placeholder="end"
            defaultValue={ end }
          />
        </div>
        <div className="flex justify-between items-center text-2xl">
          <div className="cursor-pointer text-green-700"
            onClick={ () => saveEducation()}
          >
            <ion-icon name="checkmark-outline"></ion-icon>
          </div>
          <div className="cursor-pointer text-red-500"
            onClick={ () => deleteEducation()}
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
      educations: [ ...Store.formDatas.educations ]
    }
  }

  onEducationChange = (education, method, index) => {
    let formDatas = { ...this.state.formDatas }
    switch (method) {
      case "update":
        formDatas["educations"][index] = education
        this.setState({ formDatas })
        Store.setFormData({
          type: "educations",
          value: formDatas["educations"]
        })
        break;
      case "delete":
        formDatas["educations"].splice(index, 1)
        this.setState({ formDatas })
        Store.setFormData({
          type: "educations",
          value: formDatas["educations"]
        })
        break;
      default:
        break;
    }
  }

  addNewEducaiton = () => {
    let formDatas = { ...this.state.formDatas }
    formDatas["educations"].push({
      start: new Date().getFullYear().toString(),
      end: new Date().getFullYear().toString(),
      name: 'New Education',
      description: 'This is a description'
    })
    this.setState({ formDatas })
    Store.setFormData({
      type: "educations",
      value: formDatas["educations"]
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
          <p className="text-xl">Your Education</p>
          <div className="text-2xl cursor-pointer flex items-center" onClick={() => this.onClose()}>
            <ion-icon name="close-circle-outline"></ion-icon>
          </div>
        </div>

        <Accordion
          allowMultipleExpanded={ true }
          allowZeroExpanded={ true }
          className="border-0"
        >
          { this.state.formDatas.educations.map(({ start, end, name, description }, index) => (
            <EducaitonItem key={ index }
              start={ start }
              end={ end }
              name={ name }
              description={ description }
              setEducation={ (education, method) => this.onEducationChange(education, method, index) }
            />
          )) }
        </Accordion>

        <div className="flex justify-center my-5">
          <div className="w-10 h-10 rounded-full bg-green-500 flex items-center justify-center text-white text-2xl cursor-pointer hover:bg-green-700"
            onClick={ () => this.addNewEducaiton() }
          >
            <ion-icon name="add-outline"></ion-icon>
          </div>
        </div>
      </div>
    )
  }
}

export default observer(Interest)