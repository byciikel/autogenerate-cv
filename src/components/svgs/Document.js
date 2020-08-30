import React from 'react'
import { Svg, G, Path } from '@react-pdf/primitives';

const Document = ({ color, width, height }) => {
  return (
    <Svg xmlns="http://www.w3.org/2000/svg" width={ width } height={ height } viewBox="0 0 512 512">
      <G fill={ color } stroke={ color } strokeMiterlimit={10} strokeWidth={10} strokeLinecap="square">
        <Path d="M272,41.69V188a4,4,0,0,0,4,4H422.31a2,2,0,0,0,1.42-3.41L275.41,40.27A2,2,0,0,0,272,41.69Z"/>
        <Path d="M248,224a8,8,0,0,1-8-8V32H92A12,12,0,0,0,80,44V468a12,12,0,0,0,12,12H420a12,12,0,0,0,12-12V224ZM352,384H160V352H352Zm0-80H160V272H352Z"/>
      </G>
    </Svg>
  )
}

export default Document
