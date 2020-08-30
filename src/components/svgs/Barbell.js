import React from 'react'
import { Svg, G, Line, Rect } from '@react-pdf/primitives';

const Barbell = ({ color, width, height }) => {
  return (
    <Svg xmlns="http://www.w3.org/2000/svg" width={ width } height={ height } viewBox="0 0 512 512">
      <G fill={ color } stroke={ color } strokeMiterlimit={10} strokeWidth={50} strokeLinecap="square">
        <Line x1="48" y1="256" x2="464" y2="256"/>
        <Rect x="384" y="128" width="32" height="256" rx="16" ry="16"/>
        <Rect x="96" y="128" width="32" height="256" rx="16" ry="16"/>
        <Rect x="32" y="192" width="16" height="128" rx="8" ry="8"/>
        <Rect x="464" y="192" width="16" height="128" rx="8" ry="8"/>
      </G>
    </Svg>
  )
}

export default Barbell
