import React, { Component } from 'react'
import { css } from 'emotion'
import { observer } from 'mobx-react'
import Store from '../../stores/Store'

class ElegancyTemplate extends Component {
  inputFile = React.createRef()
  state = {
    file: null
  }

  openFormUpload = () => {
    this.inputFile.current.click()
  }

  onUploadImage = (data) => {
    let reader = new FileReader()
    let file = data.target.files[0]
    reader.onloadend = () => {
      this.setState({
        file: {
          file, preview: reader.result
        }
      })
    }
    reader.readAsDataURL(file)
  }

  render() {
    const { formDatas } = Store
    const { file } = this.state
    const firstColor = css`
      background-color: ${formDatas.colors[0]};
    `
    const secondColor = css`
      background-color: ${formDatas.colors[1]};
    `
    const thirdColor = css`
      background-color: ${formDatas.colors[2]};
    `

    return (
      <div className="w-full flex relative">
        <div className="w-full grid grid-rows-2">
          <div className={secondColor}></div>
          <div className={thirdColor}></div>
        </div>
        <div className={firstColor + " absolute h-full w-64 ml-6 flex justify-center"}>
          <img alt=""
            src={file ? file.preview : ""}
            onClick={ this.openFormUpload }
            className="my-8 w-40 h-40 rounded-full block bg-gray-500 border-0 flex justify-center items-center cursor-pointer"
          />
          <input className="hidden" type="file" ref={ this.inputFile } onChange={(data) => this.onUploadImage(data)} />
        </div>
      </div>
    )
  }
}

export default observer(ElegancyTemplate)