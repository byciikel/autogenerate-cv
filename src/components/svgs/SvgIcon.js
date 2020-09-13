import React from 'react'
import { View } from '@react-pdf/renderer';

import FacebookIcon from './Facebook'
import TwitterIcon from './Twitter'
import LinkedinIcon from './Linkedin'
import DocumentIcon from './Document'
import BarbellIcon from './Barbell'
import BicycleIcon from './Bicycle'
import BookIcon from './Book'
import BriefcaseIcon from './Briefcase'
import BrushIcon from './Brush'
import CameraIcon from './Camera'
import DesktopIcon from './Desktop'
import FilmIcon from './Film'
import GameIcon from './Game'
import HeadsetIcon from './Headset'
import GithubIcon from './Github'
import MediumIcon from './Medium'
import PinterestIcon from './Pinterest'

const SvgIcon = ({ name, color, width, height }) => {
  switch (name) {
    case 'logo-facebook':
      return (
        <FacebookIcon color={ color } width={ width } height={ height } />
      )
    case 'logo-twitter':
      return (
        <TwitterIcon color={ color } width={ width } height={ height } />
      )
    case 'logo-linkedin':
      return (
        <LinkedinIcon color={ color } width={ width } height={ height } />
      )
    case 'document-text-sharp':
      return (
        <DocumentIcon color={ color } width={ width } height={ height } />
      )
    case 'barbell':
      return (
        <BarbellIcon color={ color } width={ width } height={ height } />
      )
    case 'bicycle':
      return (
        <BicycleIcon color={ color } width={ width } height={ height } />
      )
    case 'book':
      return (
        <BookIcon color={ color } width={ width } height={ height } />
      )
    case 'briefcase':
      return (
        <BriefcaseIcon color={ color } width={ width } height={ height } />
      )
    case 'brush':
      return (
        <BrushIcon color={ color } width={ width } height={ height } />
      )
    case 'camera':
      return (
        <CameraIcon color={ color } width={ width } height={ height } />
      )
    case 'desktop':
      return (
        <DesktopIcon color={ color } width={ width } height={ height } />
      )
    case 'film':
      return (
        <FilmIcon color={ color } width={ width } height={ height } />
      )
    case 'game-controller':
      return (
        <GameIcon color={ color } width={ width } height={ height } />
      )
    case 'headset':
      return (
        <HeadsetIcon color={ color } width={ width } height={ height } />
      )
    case 'logo-github':
      return (
        <GithubIcon color={ color } width={ width } height={ height } />
      )
    case 'logo-medium':
      return (
        <MediumIcon color={ color } width={ width } height={ height } />
      )
    case 'logo-pinterest':
      return (
        <PinterestIcon color={ color } width={ width } height={ height } />
      )
    default:
      return (
        <View />
      )
  }
}

export default SvgIcon
