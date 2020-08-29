import React, { Component } from 'react'
import { observer } from 'mobx-react'
import { PDFViewer } from '@react-pdf/renderer';
import { Document, Page, StyleSheet, View, Text, Font, Image } from '@react-pdf/renderer';

import Store from '../../stores/Store'
import { lightOrDark } from '../CheckColor'
import PoppinsRegular from '../../fonts/poppins/Poppins-Regular.ttf'
import PoppinsBold from '../../fonts/poppins/Poppins-Bold.ttf'

Font.register({ family: 'Poppins', fonts: [
  { src: PoppinsRegular, fontWeight: 400 },
  { src: PoppinsBold, fontWeight: 700 }
]})

const checkColor = (color) => {
  if (lightOrDark(color) === 'light') return '#000'
  return '#fff'
}

class ElegancyTemplate extends Component {
  render() {

    const styles = StyleSheet.create({
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
        color: checkColor(Store.formDatas.colors[0])
      },
      secondSection: {
        position: "absolute",
        width: '100vw',
        height: '50vh',
        backgroundColor: Store.formDatas.colors[1],
        paddingLeft: '246pt',
        paddingRight: '24pt',
        paddingVertical: '24pt',
        color: checkColor(Store.formDatas.colors[1])
      },
      thirdSection: {
        position: "absolute",
        width: '100vw',
        height: '50vh',
        backgroundColor: Store.formDatas.colors[2]
      },
      leftPanel: {
        height: '100%',
        marginHorizontal: '24pt',
        marginBottom: '24pt'
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
      skillWrap: {
        display: "flex",
        flexWrap: "wrap",
        flexDirection: "row",
        justifyContent: "space-between"
      },
      image: {
        width: '120pt',
        height: '120pt',
        borderRadius: '60pt',
        backgroundColor: '#a0aec0',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        marginVertical: '24pt'
      }
    });

    const SkillComponent = (skill) => {
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
          <Text style={ styles.paragraph }>{ skill.name }</Text>
          <View style={ skillStyles.bar }>
            <View style={ skillStyles.barActive }></View>
          </View>
        </View>
      )
    }

    const SpecificBioComponent = ({ name, value }) => {
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
          textTransform: 'capitalize'
        }
      })
      const newName = name.split("_").join(" ")

      return (
        <View style={ bioStyles.wrap }>
          <Text style={ bioStyles.p1 }>{ newName }:</Text>
          <Text style={ bioStyles.p2 }>{ value }</Text>
        </View>
      )
    }

    const SocialMediaComponent = (social) => {
      const socialStyles = StyleSheet.create({
        wrap: {
          marginBottom: '15pt'
        },
        p1: {
          fontSize: '10pt',
          fontWeight: 700,
          textTransform: 'capitalize'
        }
      })
      return (
        <View style={ socialStyles.wrap }>
          <Text style={ socialStyles.p1 }>{ social.name }</Text>
        </View>
      )
    }

    const FirstPage = () => {
      return (
        <Page size="A4" style={styles.page}>
          <View>
            <View>
              <View style={ styles.secondSection }>
                <Text style={ styles.heading1 }>
                  { Store.formDatas.bio.basic.name }
                </Text>
                <View style={ styles.subHeading }>
                  <Text>{ Store.formDatas.bio.basic.position }</Text>
                </View>
                <Text style={ styles.heading2 }>about me</Text>
                <Text style={ styles.paragraph }>
                  { Store.formDatas.bio.basic.about}
                </Text>
                <Text style={ styles.heading2 }>my skills</Text>
                  <View style={ styles.skillWrap }>
                    { Store.formDatas.skills.skills.map((skill, index) => (
                      <SkillComponent key={ index } { ...skill } />
                    )) }
                  </View>
              </View>
              <View style={ styles.thirdSectiion }></View>
            </View>
            <View style={ styles.firstSection }>
              <View style={ styles.image }></View>
              <View style={ styles.leftPanel }>
                { Object.entries(Store.formDatas.bio.specific).map(([name, value], index) => (
                  <SpecificBioComponent key={ index } name={ name } value={ value } />
                )) }
                <Text style={ styles.heading2 }>social media</Text>
                { Store.formDatas.socials.map((social, index) => (
                  <SocialMediaComponent key={ index } { ...social } />
                )) }
              </View>
            </View>
          </View>
        </Page>
      )
    }
  
    return (
      <PDFViewer className="w-full h-screen">
        <Document title={ Store.formDatas.fileName }>
          <FirstPage />
        </Document>
      </PDFViewer>
    )
  }
}

export default observer(ElegancyTemplate)
