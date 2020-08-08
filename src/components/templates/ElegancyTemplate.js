import React from 'react'
import { css } from 'emotion'
import { observer } from 'mobx-react'
import Store from '../../stores/Store'

function ElegancyTemplate() {
  const { colors } = Store

  const onHover = css`
    &:hover {
      border: 2px solid red;
    }
  `
  const firstColor = css`
    background-color: ${colors.first};
    ${onHover}
  `
  const secondColor = css`
    background-color: ${colors.second};
    ${onHover}
  `
  const thirdColor = css`
    background-color: ${colors.third};
    ${onHover}
  `
  function changeBackgroundColor(type) {
    let backgroundColor = ""
    switch (type) {
      case 'first':
        backgroundColor = {
          type: 'first',
          color: colors.first
        }
        break;
      case 'second':
        backgroundColor = {
          type: 'second',
          color: colors.second
        }
        break;
      case 'third':
        backgroundColor = {
          type: 'third',
          color: colors.third
        }
        break;
      default:
        break;
    }
    Store.setModalContents({
      title: "Change Color",
      type: 'input-background-color',
      values: backgroundColor
    }).then((e) => Store.setModalActivedStatus(true))
  }
  return (
    <div className="w-full flex relative">
      <div className="w-full grid grid-rows-2">
        <div
          className={secondColor}
          onClick={() => changeBackgroundColor('second')}
        ></div>
        <div
          className={thirdColor}
          onClick={() => changeBackgroundColor('third')}
        ></div>
      </div>
      <div
        className={firstColor + " absolute h-full w-64 ml-6"}
        onClick={() => changeBackgroundColor('first')}
      >

      </div>
    </div>
  )
}

export default observer(ElegancyTemplate)