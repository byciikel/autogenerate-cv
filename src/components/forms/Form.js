import React from 'react'
import { observer } from 'mobx-react'
import Store from '../../stores/Store'
import { SketchPicker } from 'react-color';

function Form() {
  const { modalContents } = Store

  if (modalContents) {
    switch (modalContents.type) {
      case 'input-background-color':
        return (
          <div className="items-center py-5">
            <SketchPicker
              color={ modalContents.values.color }
              // onChangeComplete={(color) => Store.setColors({ type: modalContents.values.type, color: color.hex })}
              onChange={(color) => Store.setColors({ type: modalContents.values.type, color: color.hex })}
            />
          </div>
        )
      default:
        return (
          <div />
        )
    }
  }
}

export default observer(Form)