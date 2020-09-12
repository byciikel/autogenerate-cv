import React, { Component } from 'react'
import { observer } from 'mobx-react'
import Store from '../../stores/Store'
import { cx, css } from 'emotion'
import { SketchPicker } from 'react-color';

const ColorSelect = ({ color, setColor }) => {
  return (
    <div
      onClick={() => setColor(color)}
      className={cx(css`background-color: ${color}`, "w-12 h-6 shadow-sm rounded-lg border border-gray-500 m-3 cursor-pointer")}
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

  onColorChange = (color, index) => {
    this.setState({ selectedColor: color, colorIndex: index })
    Store.setColor(color, index)
  }

  onClose = () => {
    Store.setSideBarActivedStatus(false)
    setTimeout(function() { Store.setSideBarType(null) }, 1000);
  }

  render() {
    const { formDatas } = Store
    const { selectedColor, colorIndex } = this.state

    return(
      <div>
        <div className="flex items-center justify-between mb-5">
          <p className="text-xl">Generals Setting</p>
          <div className="text-2xl cursor-pointer flex items-center" onClick={() => this.onClose()}>
            <ion-icon name="close-circle-outline"></ion-icon>
          </div>
        </div>
        <SketchPicker color={ selectedColor } onChange={(color) => this.onColorChange(color.hex, colorIndex)} />
        <div className="flex items-center my-6">
          {formDatas.colors.map((color, index) => (
            <ColorSelect key={ index } color={ color } setColor={(selectedColor) => this.setSelectedColor(selectedColor, index)} />
          ))}
        </div>
        <div className="flex justify-between">
          <button
            onClick={() => Store.setColor()}
            className="focus:outline-none px-4 py-2 mt-2 text-sm bg-transparent rounded-lg text-white bg-red-700 cursor-pointer"
          >Reset</button>
          <button
            onClick={() => this.onClose()}
            className="focus:outline-none px-4 py-2 mt-2 text-sm bg-transparent rounded-lg text-white bg-gray-700 cursor-pointer"
          >Close</button>
        </div>
      </div>
    )
  }
}

export default observer(ColorPicker)