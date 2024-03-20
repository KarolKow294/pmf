import React from 'react';
import { Document, Page, Text, View, StyleSheet, Image } from '@react-pdf/renderer';

const styles = StyleSheet.create({
  page: {
    flexDirection: 'row',
    padding: 10,
  },
  section: {
    margin: 10,
    padding: 10,
    flexGrow: 1,
  },
  title: {
    fontSize: 24,
    marginBottom: 10,
    textAlign: 'center',
  },
  content: {
    fontSize: 16,
  },
});

export default function PdfLabel(props) {
  return (
    <Document>
        <Page size="A7" style={styles.page}>
        <View style={styles.section}>
            <Text style={styles.title}>Etykieta</Text>
            <Text style={styles.content}>{`Nazwa: ${props.part.name}`}</Text>
            <Text style={styles.content}>{`Kod: ${props.part.code}`}</Text>
            <Text style={styles.content}>{`Sztuk: ${props.part.quantity}`}</Text>
            <Image src={`data:image/png;base64, ${props.part.qrDataImage}`} alt="QrCode" />
        </View>
        </Page>
    </Document>
  );
}