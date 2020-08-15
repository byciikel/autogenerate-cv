import React, { Component } from 'react'
import { css } from 'emotion'
import { observer } from 'mobx-react'
import FitText from '@kennethormandy/react-fittext'
import Store from '../../stores/Store'
import { lightOrDark } from '../CheckColor'

import './index.css'

function SkillComponent(skill, color) {
  const { formDatas } = Store
  const scaleUpWidth = css`
    width: ${skill.amount*20}%;
    height: inherit;
  `
  const backgroundColor = css`
    background-color: ${formDatas.colors[0]};
  `
  return (
    <div className="w-1/2 text-sm my-1 px-2 font-poppins flex flex-wrap justify-between items-center">
      <div>{ skill.name }</div>
      <div className="w-24 h-3 bg-gray-500">
        <div className={ backgroundColor + " " + scaleUpWidth + " z-10" } />
      </div>
    </div>
  )
}

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

  checkColor = (color) => {
    if (lightOrDark(color) === 'light') {
      return 'text-black'
    } else {
      return 'text-white'
    }
  }

  render() {
    const { file } = this.state
    const { formDatas } = Store

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
          <div className={ secondColor + " " + this.checkColor(formDatas.colors[1]) }>
            <div className="biography-section">
              <div className="font-poppins header-1 header-bold">
                <FitText compressor={1.5}>
                  { formDatas.name }
                </FitText>
              </div>
              <div className={firstColor + " " + this.checkColor(formDatas.colors[0]) + " text-black w-auto inline-block font-poppins header-2 py-1 px-5 my-5"}>
                { formDatas.position }
              </div>
              <div className="font-poppins header-2 header-bold tracking-widest">about me</div>
              <div className="font-poppins text-white my-3 text-justify">
                <FitText compressor={3.5} maxFontSize={14}>
                  { formDatas.about }
                </FitText>
              </div>
            </div>

            <div className="skills-section">
              <div className="font-poppins header-2 header-bold tracking-widest">my skills</div>
              <div className="px-2">
                <div className="flex flex-wrap my-3 -mx-4">
                  { formDatas.skills.map((skill, index) => (
                    <SkillComponent key={ index } { ...skill } />
                  )) }
                </div>
              </div>
            </div>
          </div>
          <div className={ thirdColor }></div>
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