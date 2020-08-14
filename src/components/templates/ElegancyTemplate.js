import React from 'react'
import { css } from 'emotion'
import { observer } from 'mobx-react'
import Store from '../../stores/Store'

function ElegancyTemplate() {
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
        <div className={secondColor}></div>
        <div className={thirdColor}></div>
      </div>
      <div className={firstColor + " absolute h-full w-64 ml-6"}></div>
    </div>
  )
}

export default observer(ElegancyTemplate)