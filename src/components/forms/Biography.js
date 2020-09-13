import React, { Component } from 'react'
import { observer } from 'mobx-react'
import DatePicker from 'react-datepicker'
import "react-datepicker/dist/react-datepicker.css";
import PhoneInput from 'react-phone-number-input'
import 'react-phone-number-input/style.css'

import Store from '../../stores/Store'
import avatar from '../../images/avatar.png'

const Input = ({ name, value, onTextChange }) => {
  if (name !== "about" && name !== "date_of_birth" && name !== "address" && name !== "phone") {
    return (
      <div className="mb-4">
        <label className="block text-gray-700 text-sm mb-2 capitalize" htmlFor={ name }>
          { name }
        </label>
        <input
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none"
          maxLength={ name === "name" ? '25' : '30' }
          value={ value }
          onChange={ (data) => onTextChange(data) }
          type="text"
          placeholder={ name }
        />
      </div>
    )
  }
  else {
    return (
      <div/>
    )
  }
}

class Biography extends Component {
  inputFile = React.createRef()
  state = {
    formDatas: {
      bio: {
        basic: { ...Store.formDatas.bio.basic },
        specific: { ...Store.formDatas.bio.specific }
      },
    }
  }

  onInputChange = (key, value, type) => {
    let bio = { ...this.state.formDatas.bio }
    bio[type][key] = value
    this.setState({ formDatas: { bio } })
  }

  openFormUpload = () => {
    this.inputFile.current.click()
  }

  onUploadImage = (data) => {
    let reader = new FileReader()
    let file = data.target.files[0]
    reader.onloadend = () => {
      Store.setFormData({
        type: "image",
        value: {
          file, preview: reader.result
        }
      })
    }
    reader.readAsDataURL(file)
  }

  onClose = () => {
    Store.setSideBarActivedStatus(false)
    setTimeout(function() { Store.setSideBarType(null) }, 1000);
  }

  render() {
    return(
      <div className="w-64">
        <div className="flex items-center justify-between mb-5">
          <p className="text-xl">About You</p>
          <div className="text-2xl cursor-pointer flex items-center" onClick={() => this.onClose()}>
            <ion-icon name="close-circle-outline"></ion-icon>
          </div>
        </div>

        <div className="flex justify-center">
          <div onClick={ this.openFormUpload }
            className="avatar-wrapper flex justify-center items-center hover:bg-gray-800 w-40 h-40 rounded-full cursor-pointer"
          >
            <img alt=""
              src={ Store.formDatas.image.file ? Store.formDatas.image.preview : avatar }
              className="my-8 w-40 h-40 rounded-full block border-0 flex justify-center items-center shadow"
            />
            <p className="avatar-text text-lg text-white absolute">Change Image</p>
          </div>
          <input
            className="hidden"
            type="file"
            accept="image/x-png,image/jpeg"
            ref={ this.inputFile }
            onChange={(data) => this.onUploadImage(data)}
          />
        </div>
        
        { Object.entries(this.state.formDatas.bio.basic).map(([name, value], index) => (
          <Input
            key={ index }
            name={ name }
            value={ value }
            onTextChange={ (data) => this.onInputChange(name, data.target.value, "basic") }
          />
        )) }

        <div className="mb-4">
          <label className="block text-gray-700 text-sm mb-2" htmlFor="about">
            About
          </label>
          <textarea
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none resize-none"
            maxLength="650"
            rows="7"
            placeholder="about"
            value={ this.state.formDatas.bio.basic.about }
            onChange={ (data) => this.onInputChange("about", data.target.value, "basic") }
          ></textarea>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm mb-2" htmlFor="birth">
            Date of Birth
          </label>
          <DatePicker
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none resize-none"
            selected={ this.state.formDatas.bio.specific.date_of_birth }
            onChange={ (data) => this.onInputChange("date_of_birth", data, "specific") }
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm mb-2" htmlFor="address">
            Address
          </label>
          <textarea
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none resize-none"
            maxLength="200"
            rows="5"
            placeholder="address"
            value={ this.state.formDatas.bio.specific.address }
            onChange={ (data) => this.onInputChange("address", data.target.value, "specific") }
          ></textarea>
        </div>

        <div className="mb-4">
          <PhoneInput
            className="focus:outline-none shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none"
            defaultCountry="ID"
            placeholder="Enter phone number"
            value={ this.state.formDatas.bio.specific.phone }
            onChange={ (data) => this.onInputChange("phone", data, "specific") }
          />
        </div>

        { Object.entries(this.state.formDatas.bio.specific).map(([name, value], index) => (
          <Input
            key={ index }
            name={ name }
            value={ value }
            onTextChange={ (data) => this.onInputChange(name, data.target.value, "specific") }
          />
          )) }

        <div className="flex justify-between">
          <button
            onClick={ () => Store.setFormData({
              type: "bio",
              value: this.state.formDatas.bio
            })}
            className="focus:outline-none px-4 py-2 mt-2 text-sm bg-transparent rounded-lg text-white bg-green-700 cursor-pointer"
          >Save</button>
          <button
            onClick={() => this.onClose()}
            className="focus:outline-none px-4 py-2 mt-2 text-sm bg-transparent rounded-lg text-white bg-gray-700 cursor-pointer"
          >Close</button>
        </div>
      </div>
    )
  }
}

export default observer(Biography)