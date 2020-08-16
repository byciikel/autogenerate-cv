import React, { Component } from 'react'
import { cx, css } from 'emotion'
import { observer } from 'mobx-react'
import FitText from '@kennethormandy/react-fittext'
import Store from '../../stores/Store'
import { lightOrDark } from '../CheckColor'

import './index.css'


function checkColor(color) {
  if (lightOrDark(color) === 'light') {
    return 'text-black'
  } else {
    return 'text-white'
  }
}

function SkillComponent(skill) {
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
        <div className={ cx(backgroundColor, scaleUpWidth, "z-10") } />
      </div>
    </div>
  )
}

function SpecificBioComponent({ name, value }) {
  const newName = name.split("_").join(" ")
  return (
    <div className="mb-5">
      <div className="capitalize font-poppins header-bold mb-1">{ newName }:</div>
      <div className="capitalize font-poppins text-sm">{ value }</div>
    </div>
  )
}

function SocialMediaComponent(social) {
  const { formDatas } = Store
  return (
    <a href={ social.link } className="flex items-center mb-3">
      <div className={cx(css`background-color: ${formDatas.colors[1]}`, checkColor(formDatas.colors[1]), "flex items-center p-2 rounded-full mr-5")}>
        <ion-icon name={ social.icon }></ion-icon>
      </div>
      <p className="font-poppins header-bold text-sm">{ social.name }</p>
    </a>
  )
}

class ElegancyTemplate extends Component {
  inputFile = React.createRef()

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

  render() {
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
          <div className={ cx(secondColor, checkColor(formDatas.colors[1])) }>
            <div className="biography-section">
              <div className="font-poppins header-1 header-bold">
                <FitText compressor={1.5}>
                  { formDatas.bio.basic.name }
                </FitText>
              </div>
              <div className={cx(firstColor, checkColor(formDatas.colors[0]), "text-black w-auto inline-block font-poppins header-2 py-1 px-5 my-5")}>
                { formDatas.bio.basic.position }
              </div>
              <div className="font-poppins header-2 header-bold tracking-widest my-3">about me</div>
              <div className="font-poppins text-justify">
                <FitText compressor={3.5} maxFontSize={14}>
                  { formDatas.bio.basic.about }
                </FitText>
              </div>
            </div>

            <div className="skills-section">
              <div className="font-poppins header-2 header-bold tracking-widest my-3">my skills</div>
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
        <div className={cx(firstColor, checkColor(formDatas.colors[0]), "absolute h-full w-64 ml-6 flex flex-col items-center")}>
          <img alt=""
            src={formDatas.image.file ? formDatas.image.preview : ""}
            onClick={ this.openFormUpload }
            className="my-8 w-40 h-40 rounded-full block bg-gray-500 border-0 flex justify-center items-center cursor-pointer"
          />
          <input className="hidden" type="file" ref={ this.inputFile } onChange={(data) => this.onUploadImage(data)} />
          <div className={cx(css`height: 60%`, "w-full py-2 px-6")}>
            <div className="mb-10">
              { Object.entries(formDatas.bio.specific).map(([name, value], index) => (
                <SpecificBioComponent key={ index } name={ name } value={ value } />
              )) }
            </div>
            <div className="font-poppins header-2 header-bold tracking-widest mt-y mb-3">social media</div>
            { formDatas.socials.map((social, index) => (
              <SocialMediaComponent key={ index } { ...social } />
            )) }
          </div>
        </div>
      </div>
    )
  }
}

export default observer(ElegancyTemplate)