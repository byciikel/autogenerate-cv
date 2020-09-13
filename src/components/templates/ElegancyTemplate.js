import React, { Component } from 'react'
import { observer } from 'mobx-react'
import { PDFViewer, Document, Page, StyleSheet, View, Text, Font, Link, Image } from '@react-pdf/renderer';
import * as _ from 'lodash'
import date from 'date-and-time';

import Store from '../../stores/Store'
import { lightOrDark } from '../CheckColor'
import PoppinsRegular from '../../fonts/poppins/Poppins-Regular.ttf'
import PoppinsBold from '../../fonts/poppins/Poppins-Bold.ttf'
import SvgIcon from '../svgs/SvgIcon'
import avatar from '../../images/avatar.png'

Font.register({ family: 'Poppins', fonts: [
  { src: PoppinsRegular, fontWeight: 400 },
  { src: PoppinsBold, fontWeight: 700 }
]})

const checkColor = (color) => {
  if (lightOrDark(color) === 'light') return '#000'
  return '#fff'
}

const styles = () => StyleSheet.create({
  page: {
    fontFamily: 'Poppins',
    flexDirection: 'row',
    backgroundColor: '#FFF'
  },
  firstSection: {
    flex: 'flex',
    alignItems: 'center',
    position: "absolute",
    width: '200px',
    height: '100vh',
    left: '23px',
    backgroundColor: Store.formDatas.colors[0],
    color: checkColor(Store.formDatas.colors[0]),
  },
  secondSection: {
    position: "relative",
    width: '100vw',
    height: '50vh',
    backgroundColor: Store.formDatas.colors[1],
    paddingLeft: '246pt',
    paddingRight: '24pt',
    paddingVertical: '24pt',
    color: checkColor(Store.formDatas.colors[1])
  },
  thirdSection: {
    position: "relative",
    width: '100vw',
    height: '50vh',
    backgroundColor: Store.formDatas.colors[2],
    paddingLeft: '246pt',
    paddingRight: '24pt',
    paddingVertical: '24pt',
    color: checkColor(Store.formDatas.colors[2])
  },
  leftPanel: {
    marginHorizontal: '24pt',
  },
  heading1: {
    fontWeight: 700,
    fontSize: '21pt',
    textTransform: "uppercase",
  },
  heading2: {
    fontWeight: 700,
    fontSize: '10.5pt',
    textTransform: 'uppercase',
    marginVertical: '7pt',
    letterSpacing: '1.8pt'
  },
  heading3: {
    fontSize: '10.5pt',
    textTransform: 'uppercase',
    marginVertical: '7pt',
    letterSpacing: '1.8pt'
  },
  subHeading: {
    alignSelf: 'flex-start',
    backgroundColor: Store.formDatas.colors[0],
    color: checkColor(Store.formDatas.colors[0]),
    paddingHorizontal: '10pt',
    paddingVertical: '3pt',
    marginVertical: '7pt',
    fontSize: '10.5pt',
    textTransform: 'uppercase'
  },
  paragraph: {
    fontSize: '10pt',
    textAlign: 'justify'
  },
  colWrap: {
    display: "flex",
    flexWrap: "wrap",
    flexDirection: "row",
    justifyContent: "space-between"
  },
  image: {
    width: '120pt',
    height: '120pt',
    borderRadius: '60pt',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: '24pt'
  },
  interest: {
    position: 'absolute',
    bottom: 0,
    left: '-0.5px',
    backgroundColor: Store.formDatas.colors[1],
    color: checkColor(Store.formDatas.colors[1]),
    width: '201px',
    height: '30%',
    padding: '24pt',
    paddingTop: '19pt'
  }
});

const FirstPage = observer(({ data }) => {
  const chunkOfExperiences = _.chunk(data.experiences, 6)

  return (
    <Page size="A4" style={styles().page}>
      <View>
        <View>
          <View style={ styles().secondSection }>
            <Text style={ styles().heading1 }>
              { data.bio.basic.name }
            </Text>
            <View style={ styles().subHeading }>
              <Text>{ data.bio.basic.position }</Text>
            </View>
            <Text style={ styles().heading2 }>about me</Text>
            <Text style={ styles().paragraph }>
              { data.bio.basic.about}
            </Text>
            <Text style={ styles().heading2 }>my skills</Text>
              <View style={ styles().colWrap }>
                { data.skills.skills.map((skill, index) => (
                  <SkillComponent key={ index } { ...skill } />
                )) }
              </View>
          </View>
          <View style={ styles().thirdSection }>
            <Text style={ styles().heading2 }>educations</Text>
            <View style={ styles().colWrap }>
              { data.educations.map((edu, index) => (
                <ExperienceComponent key={ index } { ...edu } />
              ) )}
            </View>
            <Text style={ styles().heading2 }>experiences</Text>
            <View style={ styles().colWrap }>
              { chunkOfExperiences[0].map((exp, index) => (
                <ExperienceComponent key={ index } { ...exp } />
              ) )}
            </View>
          </View>
        </View>
        <View style={ styles().firstSection }>
          <Image style={ styles().image } source={ data.image.file ? data.image.preview : avatar } />
          <View style={ styles().leftPanel }>
            { Object.entries(data.bio.specific).map(([name, value], index) => (
              <SpecificBioComponent key={ index } name={ name } value={ value } />
            )) }
            <Text style={ styles().heading2 }>social media</Text>
            { data.socials.map((social, index) => (
              <SocialMediaComponent key={ index } { ...social } />
            )) }
          </View>
          <View style={ styles().interest }>
            <Text style={ styles().heading3 }>interest</Text>
            <View style={ styles().colWrap }>
              { data.skills.interests.map((interest, index) => (
                <InterestComponent key={ index } { ...interest } />
              )) }
            </View>
          </View>
        </View>
      </View>
    </Page>
  )
})

const SkillComponent = observer((skill) => {
  const skillStyles = StyleSheet.create({
    wrap: {
      display: "flex",
      flexWrap: "wrap",
      flexDirection: 'row',
      justifyContent: "space-between",
      alignItems: "center",
      width: '45%',
      marginVertical: '3pt'
    },
    bar: {
      width: '72pt',
      height: '8pt',
      backgroundColor: '#a0aec0'
    },
    barActive: {
      width: `${ skill.amount * 20 }%`,
      height: '8pt',
      backgroundColor: Store.formDatas.colors[0]
    }
  })

  return (
    <View style={ skillStyles.wrap }>
      <Text style={ styles().paragraph }>{ skill.name }</Text>
      <View style={ skillStyles.bar }>
        <View style={ skillStyles.barActive }></View>
      </View>
    </View>
  )
})

const SpecificBioComponent = observer(({ name, value }) => {
  const textTransform = name === "email" || name === "website" ? 'normal' : 'capitalize'
  const bioStyles = StyleSheet.create({
    wrap: {
      marginBottom: '15pt'
    },
    p1: {
      fontSize: '10pt',
      fontWeight: 700,
      textTransform: 'capitalize'
    },
    p2: {
      fontSize: '10pt',
      textTransform: textTransform
    }
  })
  const newName = name.split("_").join(" ")
  const pattern = date.compile('MMMM DD YYYY');
  let newValue = value
  if (newName === "date of birth") newValue = date.format(value, pattern)

  if (value.length === 0) {
    return (
      <View/>
    )
  }
  return (
    <View style={ bioStyles.wrap }>
      <Text style={ bioStyles.p1 }>{ newName }:</Text>
      <Text style={ bioStyles.p2 }>{ newValue }</Text>
    </View>
  )
})

const SocialMediaComponent = observer((social) => {
  const socialStyles = StyleSheet.create({
    wrap: {
      display: "flex",
      flexWrap: "wrap",
      flexDirection: 'row',
      alignItems: "center",
      marginBottom: '15pt',
    },
    p1: {
      fontSize: '10pt',
      fontWeight: 700,
      textTransform: 'capitalize',
      marginLeft: '5pt',
      color: checkColor(Store.formDatas.colors[0]),
      textDecorationStyle: 'none'
    }
  })
  
  return (
    <View style={ socialStyles.wrap }>
      <SvgIcon
        name={ social.icon }
        color={ Store.formDatas.colors[1] }
        width="20pt"
        height="20pt"
      />
      <Link src={ social.link } style={ socialStyles.p1 }>{ social.name }</Link>
    </View>
  )
})

const InterestComponent = observer((interest) => {
  const interestStyles = StyleSheet.create({
    wrap: {
      display: "flex",
      flexWrap: "wrap",
      flexDirection: 'column',
      justifyContent: "space-between",
      alignContent: 'center',
      alignItems: "center",
      width: '30%',
      marginVertical: '10pt',
    },
    p1: {
      fontSize: '8pt',
      textTransform: 'capitalize',
      color: checkColor(Store.formDatas.colors[1])
    }
  })
  
  return (
    <View style={ interestStyles.wrap }>
      <SvgIcon
        name={ interest.icon }
        color={ Store.formDatas.colors[0] }
        width="15pt"
        height="15pt"
      />
      <Text style={ interestStyles.p1 }>{ interest.name }</Text>
    </View>
  )
})

const ExperienceComponent = observer((data) => {
  const expStyles = StyleSheet.create({
    wrap: {
      display: "flex",
      flexWrap: "wrap",
      flexDirection: 'column',
      justifyContent: "space-between",
      alignItems: "flex-start",
      width: '45%',
      marginVertical: '3pt',
      marginBottom: '10pt'
    },
    date: {
      fontSize: '10pt',
      fontWeight: 700,
      textTransform: 'capitalize',
      backgroundColor: Store.formDatas.colors[0],
      paddingHorizontal: '10pt',
      paddingVertical: '2pt',
      marginBottom: '6pt'
    },
    p1: {
      fontSize: '10pt',
      fontWeight: 700,
      textTransform: 'capitalize',
      marginBottom: '2pt'
    },
    p2: {
      fontSize: '10pt',
      textTransform: 'capitalize',
      marginBottom: '2pt'
    }
  })
  return (
    <View style={ expStyles.wrap }>
      <View style={ expStyles.date }>
        <Text>{ data.start }-{ data.end }</Text>
      </View>
      <Text style={ expStyles.p1 }>{ data.name }</Text>
      <Text style={ expStyles.p2 }>{ data.description }</Text>
    </View>
  )
})

class ElegancyTemplate extends Component {
  render() {
    return (
      <PDFViewer className="w-full h-screen">
        <Document title={ Store.formDatas.fileName }>
          <FirstPage data={ Store.formDatas } />
        </Document>
      </PDFViewer>
    )
  }
}

export default observer(ElegancyTemplate)
