import React from 'react'
import { Svg, G, Path } from '@react-pdf/primitives';

const Desktop = ({ color, width, height }) => {
  return (
    <Svg xmlns="http://www.w3.org/2000/svg" width={ width } height={ height } viewBox="0 0 512 512">
      <G fill={ color } stroke={ color } strokeMiterlimit={10} strokeWidth={10} strokeLinecap="square">
        <Path d="M16,352a48.05,48.05,0,0,0,48,48H197.88l-4,32H144a16,16,0,0,0,0,32H368a16,16,0,0,0,0-32H318.12l-4-32H448a48.05,48.05,0,0,0,48-48V304H16Zm240-16a16,16,0,1,1-16,16A16,16,0,0,1,256,336Z"/>
        <Path d="M496,96a48.05,48.05,0,0,0-48-48H64A48.05,48.05,0,0,0,16,96V288H496Z"/>
      </G>
    </Svg>
  )
}

export default Desktop
