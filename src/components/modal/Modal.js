import React, { Component } from 'react'
import { observer } from 'mobx-react'
import Store from '../../stores/Store'
import MdClose from 'react-ionicons/lib/MdClose'
import Form from '../forms/Form'

export class Modal extends Component {
  
  render() {
    const { isModalActive, modalContents } = Store

    if (modalContents) {
      return (
        <div className={`${isModalActive ? 'animate__slideInRight' : 'animate__slideOutRight'} animate__animated  bg-white rounded-lg`}>
          <div className="flex flex-col items-start p-4">
            <div className="flex flex-row items-center w-full">
              <div className="flex-grow text-gray-900 font-medium text-lg">{ modalContents.title }</div>
              <MdClose onClick={() => Store.setModalActivedStatus(false)} className="cursor-pointer" />
            </div>
            <hr/>
            <Form />
            <hr/>
          </div>
        </div>
      )
    } else {
      return (
        <div/>
      )
    }
  }
}

export default observer(Modal)

