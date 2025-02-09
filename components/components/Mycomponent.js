import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function MyComponent({ text }) {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>{text}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { padding: 10, backgroundColor: '#f0f0f0', borderRadius: 5 },
  text: { fontSize: 16, fontWeight: 'bold' }
});
