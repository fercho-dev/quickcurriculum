import React from 'react';
import { Page, Text, View, Document, StyleSheet } from '@react-pdf/renderer';

// Create styles
const styles = StyleSheet.create({
  page: {
    height: '100%',
    width: '100%',
    padding: 32,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 12,
    borderWidth: 1,
    borderColor: '#D3D3D3',
    borderStyle: 'solid'
  },
  name: {
    fontSize: 28,
    fontWeight: 'bold'
  },
  email: {
    fontSize: 12,
    fontStyle: 'italic',
    marginTop: 8
  },
  container: {
    flexDirection: 'column',
  },
  innerContainer: {
    flexDirection: 'column',
    borderWidth: 1,
    borderColor: '#D3D3D3',
    borderStyle: 'solid',
    padding: 24,
  },
  section: {
    marginBottom: 6,
    marginLeft: 10,
  },
  title: {
    fontSize: 16,
    marginBottom: 4,
  },
  subheading: {
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 2,
    textTransform: 'capitalize'
  },
  content: {
    fontSize: 12,
    marginBottom: 1,
    textTransform: 'capitalize',
  },
  bulletPoint: {
    fontSize: 10,
  },
  listItem: {
    fontSize: 12,
    marginLeft: 8,
  },
  article: {
    marginBottom: 14,
  }
});

const MyDoc = ({ userData, workExperience, projectsExperience }) => {
  userData = userData || {};
  userData.technologiesList = userData.technologiesList || '';
  userData.languagesList = userData.languagesList || '';
  workExperience = workExperience || [];
  projectsExperience = projectsExperience || [];

  return (
  <Document>
    <Page size="A4" style={styles.page}>
      <View style={styles.header}>
        <Text style={styles.name}>{userData.fullName}</Text>
        <Text style={styles.email}>{userData.currentEmail}</Text>
      </View>

      <View style={styles.container}>
        <View style={styles.innerContainer}>

          <View style={styles.article}>
            <Text style={styles.title}>• Work Experience</Text>
            {workExperience && workExperience.length > 0
              ? workExperience.map((item, index) => (
                  <View key={index} style={styles.section}>
                    <Text style={styles.subheading}>{item.name}</Text>
                    <Text style={styles.content}>{item.position}</Text>
                    {item.achivementsAndResponsabilites && item.achivementsAndResponsabilites.length > 0
                      ? item.achivementsAndResponsabilites.map((achievement, achievementIndex) => (
                          <Text key={achievementIndex} style={styles.bulletPoint}>• {achievement}</Text>
                        ))
                      : <Text style={styles.bulletPoint}>• No achievements and responsibilities listed.</Text>
                    }
                  </View>
                ))
              : <Text>No work experience listed.</Text>
            }
          </View>

          <View style={styles.article}>
            <Text style={styles.title}>• Projects</Text>
            {projectsExperience && projectsExperience.length > 0
              ? projectsExperience.map((item, index) => (
                  <View key={index} style={styles.section}>
                    <Text style={styles.subheading}>{item.name}</Text>
                    <Text style={styles.content}>{item.position}</Text>
                    {item.achivementsAndResponsabilites && item.achivementsAndResponsabilites.length > 0
                      ? item.achivementsAndResponsabilites.map((achievement, achievementIndex) => (
                          <Text key={achievementIndex} style={styles.bulletPoint}>• {achievement}</Text>
                        ))
                      : <Text style={styles.bulletPoint}>• No achievements and responsibilities listed.</Text>
                    }
                  </View>
                ))
              : <Text>No project experience listed.</Text>
            }
          </View>

          <View style={styles.article}>
            <Text style={styles.title}>• Technical Skills</Text>
            <View style={styles.section}>
              {userData.technologiesList.split(', ').map((skill, index) => (
                <Text key={index} style={styles.listItem}>• {skill}</Text>
              ))}
            </View>
          </View>

          <View style={styles.article}>
            <Text style={styles.title}>• Languages</Text>
            <View style={styles.section}>
              {userData.languagesList.split(', ').map((language, index) => (
                <Text key={index} style={styles.listItem}>• {language}</Text>
              ))}
            </View>
          </View>

        </View>
      </View>

    </Page>
  </Document>
  )
};

export default MyDoc;
