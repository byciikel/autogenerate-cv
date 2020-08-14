import React, { Component } from 'react'
import { observer } from 'mobx-react'
import Store from '../../stores/Store'
import { css } from 'emotion'
import { SketchPicker } from 'react-color';

function ColorSelect({ color, setColor }) {
  return (
    <div
      onClick={() => setColor(color)}
      className={css`background-color: ${color}` + " w-12 h-6 shadow-sm rounded-lg border border-gray-500 m-3 cursor-pointer"}
    />
  )
}

class ColorPicker extends Component {
  state = {
    selectedColor: Store.formDatas.colors[0],
    colorIndex: 0
  }

  setSelectedColor = (selectedColor, index) => {
    this.setState({ selectedColor, colorIndex: index })
  }

  render() {
    const { formDatas } = Store
    const { selectedColor, colorIndex } = this.state

    return(
      <div>
        <p className="bold mb-5">Colors Setting</p>
        <SketchPicker color={ selectedColor } onChange={(color) => Store.setColor(color.hex, colorIndex)} />
        <div className="flex items-center my-6">
          {formDatas.colors.map((color, index) => (
            <ColorSelect key={ index } color={ color } setColor={(selectedColor) => this.setSelectedColor(selectedColor, index)} />
          ))}
        </div>
        <button
          onClick={() => Store.setColor()}
          className="focus:outline-none px-4 py-2 mt-2 text-sm font-semibold bg-transparent rounded-lg text-gray-900 bg-red-200 cursor-pointer"
        >Reset</button>
      </div>
    )
  }
}

export default observer(ColorPicker)