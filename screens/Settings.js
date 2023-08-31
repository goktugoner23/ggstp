import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Modal, Alert } from 'react-native';

const SettingsScreen = () => {
  const [language, setLanguage] = useState('English');
  const [modalVisible, setModalVisible] = useState(false);

  const handleClearDatabase = () => {
    // your code to clear database
    Alert.alert('Database Cleared');
  }

  const handleLanguageChange = (selectedLanguage) => {
    setLanguage(selectedLanguage);
    setModalVisible(false);
  }

  return (
    <View style={styles.container}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Choose Language</Text>
            <TouchableOpacity style={styles.languageButton} onPress={() => handleLanguageChange('English')}>
              <Text style={styles.languageText}>English</Text>
              {language === 'English' && <Text style={styles.selectedLanguage}>Selected</Text>}
            </TouchableOpacity>
            <TouchableOpacity style={styles.languageButton} onPress={() => handleLanguageChange('Turkish')}>
              <Text style={styles.languageText}>Turkish</Text>
              {language === 'Turkish' && <Text style={styles.selectedLanguage}>Selected</Text>}
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
      <TouchableOpacity style={styles.clearButton} onPress={handleClearDatabase}>
        <Text style={styles.clearButtonText}>Clear Database</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.languageButton} onPress={() => setModalVisible(true)}>
        <Text style={styles.languageText}>{language}</Text>
        <Text style={styles.languageArrow}>▼</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
  },
  clearButton: {
    backgroundColor: '#f00',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginBottom: 10,
  },
  clearButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  languageButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#ccc',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginBottom: 10,
  },
  languageText: {
    color: '#000',
    fontWeight: 'bold',
  },
  languageArrow: {
    color: '#000',
    fontWeight: 'bold',
    fontSize: 20,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
    elevation: 5,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  selectedLanguage: {
    color: '#00f',
    fontWeight: 'bold',
  },
});

export default SettingsScreen;
