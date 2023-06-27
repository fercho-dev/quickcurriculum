import { Document, Page, Text, View, PDFDownloadLink, StyleSheet } from '@react-pdf/renderer';

// Create styles for PDF
const styles = StyleSheet.create({
  title: {
    fontSize: 24,
    textAlign: 'center',
    marginBottom: 20,
  },
  body: {
    fontSize: 14,
  },
  header: {
    fontSize: 12,
    marginBottom: 40,
    textAlign: 'center',
    color: 'grey',
  },
});

// Create Document Component
const MyDoc = ({ userData }) => (
  <Document>
    <Page size="A4" style={styles.page}>
      <Text style={styles.header} fixed>
        {userData.fullName}
      </Text>
      <Text style={styles.title}>{userData.currentPosition} ({userData.currentTechnologies})</Text>
      <Text style={styles.body}>{userData.currentLength} year(s) work experience</Text>
      
      <Text style={styles.title}>PROFILE SUMMARY</Text>
      {userData.objective.split("\n").map((line, i) => (
        <Text style={styles.body} key={i}>
          {line}
        </Text>
      ))}

      <Text style={styles.title}>WORK HISTORY</Text>
      {userData.workHistory.map((work, i) => (
        <Text key={i} style={styles.body}>
          {work.name} - {work.position}
        </Text>
      ))}

      <Text style={styles.title}>JOB PROFILE</Text>
      {userData.jobResponsibilities.split("\n").map((line, i) => (
        <Text style={styles.body} key={i}>
          {line}
        </Text>
      ))}

      <Text style={styles.title}>JOB RESPONSIBILITIES</Text>
      {userData.keypoints.split("\n").map((line, i) => (
        <Text style={styles.body} key={i}>
          {line}
        </Text>
      ))}
    </Page>
  </Document>
);

export default MyDoc;