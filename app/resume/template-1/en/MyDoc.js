import React from 'react';
import { Page, Text, View, Document, StyleSheet } from '@react-pdf/renderer';

// Create styles
const styles = StyleSheet.create({
  header: {
    width: '100%',
    minHeight: 72,
    backgroundColor: '#4D7CF0',
    padding: 32,
    flexDirection: 'column',
    alignItems: 'flex-start',
    justifyContent: 'space-between'
  },
  page: {
    height: '100%',
    width: '100%',
    padding: 32,
  },
  title: {
    textTransform: 'uppercase',
    fontWeight: 'bold',
    color: '#ffffff', 
    fontSize: 24,
    marginBottom: 5
  },
  fullname: {
    textTransform: 'uppercase',
    fontSize: 18,
    fontWeight: 'normal',
    color: '#ffffff',
    marginBottom: 16,
  },
  yearsofexperience: {
    fontSize: 12,
    color: '#D1D5DB',
  },
  infocontainer: {
    width: '100%',
    padding: 32,
    minHeight: 576,
    borderStyle: 'solid',
    borderWidth: 1,
    borderColor: '#e0e0ea',
  },
  aboutcontainer: {
    marginLeft: 24,
    marginRight: 24,
  },
  about: {
    marginBottom: 8,
    fontSize: 18,
  },
  abouttext: {
    textAlign: 'justify',
    marginBottom: 32,
    fontSize: 13,
  },
  twoColumn: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginLeft: 48,
    marginRight: 48,
  },
  column1: {
    marginBottom: 48,
  },
  column2: {
    maxWidth: '60%',
  },
  sectionleft: {
    marginBottom: 48,
  },
  subTitle: {
    marginBottom: 8,
    fontSize: 15,
  },
  list: {
    marginLeft: 28,
  },
  listItem: {
    textTransform: 'capitalize',
    fontSize: 10,
    marginLeft: 0
  },
  companycontainer: {
    marginBottom: 24,
  },
  companyname: {
    fontWeight: 'bold',
    textTransform: 'capitalize',
    fontSize: 14,
  },
  companyrole: {
    fontWeight: '500',
    textTransform: 'capitalize',
    fontSize: 12,
  },
  companydescription: {
    fontSize: 10,
  }
});

const MyDoc = ({ userData, workExperience }) => {
  userData = userData || {};
  userData.technologiesList = userData.technologiesList || '';
  userData.softSkillsList = userData.softSkillsList || '';
  userData.languagesList = userData.languagesList || '';
  workExperience = workExperience || [];

  return (
  <Document>
    <Page size="A4" style={styles.page}>
      <View style={styles.header}>
        <Text style={styles.title}>{userData.currentPosition}</Text>
        <Text style={styles.fullname}>{userData.fullName}</Text>
        <Text style={styles.yearsofexperience}>{`${userData.yearsOfExperience} year(s) work experience`}</Text>
      </View>

      <View style={styles.infocontainer}>
        <View style={styles.aboutcontainer}>
          <Text style={styles.about}>• About</Text>
          <Text style={styles.abouttext}>{userData.bio}</Text>
        </View>

        <View style={styles.twoColumn}>
          <View style={styles.column1}>
            <View style={styles.sectionleft}>
              <Text style={styles.subTitle}>• Technical Skills</Text>
              <View style={styles.list}>
                {userData.technologiesList.split(', ').map((skill, index) => (
                  <Text style={styles.listItem} key={index}>• {skill}</Text>
                ))}
              </View>
            </View>

            <View style={styles.sectionleft}>
              <Text style={styles.subTitle}>• Soft Skills</Text>
              <View style={styles.list}>
                {userData.softSkillsList.split(', ').map((skill, index) => (
                  <Text style={styles.listItem} key={index}>• {skill}</Text>
                ))}
              </View>
            </View>

            <View style={styles.sectionleft}>
              <Text style={styles.subTitle}>• Languages</Text>
              <View style={styles.list}>
                {userData.languagesList.split(', ').map((skill, index) => (
                  <Text style={styles.listItem} key={index}>• {skill}</Text>
                ))}
              </View>
            </View>
          </View>

          <View style={styles.column2}>
            <Text style={styles.subTitle}>• Work Experience</Text>
            {workExperience.map((item, index) => (
              <View key={index} style={styles.companycontainer}>
                <Text style={styles.companyname}>{item.name}</Text>
                <Text style={styles.companyrole}>{item.position}</Text>
                <View>
                  {item.achievementsAndResponsibilities && item.achievementsAndResponsibilities.map((achievement, achievementIndex) => (
                    <Text style={styles.companydescription} key={achievementIndex}>• {achievement}</Text>
                  ))}
                </View>
              </View>
            ))}
          </View>
        </View>
      </View>
    </Page>
  </Document>
  )
};

export default MyDoc;
