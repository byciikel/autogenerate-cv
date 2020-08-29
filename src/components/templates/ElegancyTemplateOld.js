import React, { Component } from 'react'
import { cx, css } from 'emotion'
import * as _ from 'lodash'
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

function ExperienceComponent(data) {
  const { formDatas } = Store
  const firstColor = css`
    background-color: ${formDatas.colors[0]};
  `
  return (
    <div className="w-1/2 text-sm my-1 font-poppins flex flex-col items-start">
      <div className={cx(firstColor, checkColor(formDatas.colors[0]), "w-auto inline-block header-bold py-1 px-3 mb-2")}>
        { data.start }-{ data.end }
      </div>
      <div className="capitalize header-bold mb-1">{ data.type }</div>
      <div className="italic mb-1">{ data.name }</div>
    </div>
  )
}

function InterestComponent(interest) {
  const { formDatas } = Store
  return (
    <div className={ cx(css`color: ${formDatas.colors[0]}`, "w-1/3 text-sm font-poppins flex flex-col mb-5") }>
      <div className="text-2xl text-center flex items-center justify-center">
        <ion-icon name={ interest.icon }></ion-icon>
      </div>
      <p className={ cx(css`font-size: .7rem`, "text-center") }>{ interest.name }</p>
    </div>
  )
}

class ElegancyTemplate extends Component {
  inputFile = React.createRef()
  eduRef = React.createRef()
  expRef = React.createRef()

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
    const chunkOfExperiences = _.chunk(formDatas.experiences, 6)

    return (
      <div className="w-full flex relative">
        <div className="w-full grid grid-rows-2">
          <div className={ cx(secondColor, checkColor(formDatas.colors[1]), css`padding-left: 20.5rem;`, "p-12") }>
            <div className="font-poppins header-1 header-bold">
              <FitText compressor={1.5}>
                { formDatas.bio.basic.name }
              </FitText>
            </div>
            <div className={cx(firstColor, checkColor(formDatas.colors[0]), "w-auto inline-block font-poppins header-2 py-1 px-5 my-5")}>
              { formDatas.bio.basic.position }
            </div>
            <div className="font-poppins header-2 header-bold tracking-widest my-3">about me</div>
            <div className={ cx(css`max-height: 10rem;`, "font-poppins text-justify overflow-hidden") }>
              <FitText compressor={3.5} maxFontSize={14}>
                { formDatas.bio.basic.about }
              </FitText>
            </div>

            <div className="font-poppins header-2 header-bold tracking-widest my-3 mt-5">my skills</div>
            <div className={ cx(css`max-height: 6rem;`, "px-2 overflow-hidden") }>
              <div className="flex flex-wrap my-3 -mx-4">
                { formDatas.skills.skills.map((skill, index) => (
                  <SkillComponent key={ index } { ...skill } />
                )) }
              </div>
            </div>
          </div>
          <div className={ cx(thirdColor, checkColor(formDatas.colors[2]), css`padding-left: 20.5rem;`, "px-12 py-8") }>
            <div className="font-poppins header-2 header-bold tracking-widest my-3">educations</div>
            <div className="flex flex-wrap">
              { formDatas.educations.map((edu, index) => (
                <ExperienceComponent key={ index } { ...edu } />
              ) )}
            </div>
          
            <div className="font-poppins header-2 header-bold tracking-widest my-3">experiences</div>
            <div className="flex flex-wrap">
              { chunkOfExperiences[0].map((exp, index) => (
                <ExperienceComponent key={ index } { ...exp } />
              ) )}
            </div>
          </div>
        </div>
        <div className={cx(firstColor, checkColor(formDatas.colors[0]), "absolute h-full w-64 ml-6 flex flex-col items-center font-poppins")}>
          <div>
            <img alt=""
              src={formDatas.image.file ? formDatas.image.preview : ""}
              onClick={ this.openFormUpload }
              className="my-8 w-40 h-40 rounded-full block bg-gray-500 border-0 flex justify-center items-center cursor-pointer"
            />
            <input className="hidden" type="file" ref={ this.inputFile } onChange={(data) => this.onUploadImage(data)} />
          </div>
          <div className="w-full py-2 px-6 mb-5">
            <div className="mb-10">
              { Object.entries(formDatas.bio.specific).map(([name, value], index) => (
                <SpecificBioComponent key={ index } name={ name } value={ value } />
              )) }
            </div>
            
            <div className="header-2 header-bold tracking-widest mt-y mb-3">social media</div>
            { formDatas.socials.map((social, index) => (
              <SocialMediaComponent key={ index } { ...social } />
            )) }
          </div>

          <div className={ cx(secondColor, checkColor(formDatas.colors[1]), "w-full h-full bg-green-500 py-2 px-6") }>
            <p className="uppercase tracking-widest mb-3">interest</p>
            <div className="flex flex-wrap">
              { formDatas.skills.interests.map((interest, index) => (
                <InterestComponent key={ index } { ...interest } />
              )) }
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default observer(ElegancyTemplate)