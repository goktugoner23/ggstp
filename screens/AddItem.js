import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  Image,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import ImagePicker from 'react-native-image-crop-picker';
import styles from '../styles/styles_addItemScreen';
import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore'; // import any other Firebase services that you need
import firebaseConfig from '../firebaseConfig'; // import your Firebase config file

firebase.initializeApp(firebaseConfig);

const AddItem = () => {
  const [type, setType] = useState('silver');
  const [name, setName] = useState('');
  const [weight, setWeight] = useState('0');
  const [buyPrice, setBuyPrice] = useState('0');
  const [sellPrice, setSellPrice] = useState('0');
  const [quantity, setQuantity] = useState('1');
  const [image, setImage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleAddItem = async () => {
    try {
      if (!name.trim() || !quantity.trim()) {
        Alert.alert('Please fill in all the required fields.');
        return;
      }
  
      setIsLoading(true); // set loading to true before starting image upload
  
      const itemsRef = firebase.firestore().collection('items');
      let downloadURL = null;
  
      if (image) {
        const imageName = image.substring(image.lastIndexOf('/') + 1);
        const response = await fetch(image);
        const blob = await response.blob();
        const storageRef = firebase.storage().ref().child(`images/${imageName}`);
        await storageRef.put(blob);
        downloadURL = await storageRef.getDownloadURL();
      }
  
      await itemsRef.add({
        type,
        name,
        weight,
        buyPrice,
        sellPrice,
        quantity,
        image: downloadURL,
      });
  
      setType('silver');
      setName('');
      setWeight('0');
      setBuyPrice('0');
      setSellPrice('0');
      setQuantity('1');
      setImage(null);
      setIsLoading(false); // set loading to false after image upload is complete
      Alert.alert('Item added successfully!');
    } catch (error) {
      console.error(error);
      setIsLoading(false); // set loading to false if an error occurs during image upload
      Alert.alert(`Error adding item: ${error.message}`);
    }
  };
  

  const handleSelectImage = async () => {
    try {
      Alert.alert(
        'Add Photo',
        'Select an option:',
        [
          {
            text: 'Camera',
            onPress: () => openCamera(),
            style: 'default',
          },
          {
            text: 'Gallery',
            onPress: () => openGallery(),
            style: 'default',
          },
          {
            text: 'Cancel',
            style: 'cancel',
          },
        ],
        { cancelable: true },
      );
    } catch (error) {
      console.error(error);
    }
  };

  const openCamera = async () => {
    try {
      const response = await ImagePicker.openCamera({
        mediaType: 'photo',
        includeBase64: false,
        maxHeight: 500,
        maxWidth: 500,
      });
      if (!response.didCancel && !response.error) {
        setImage(response.path);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const openGallery = async () => {
    try {
      const response = await ImagePicker.openPicker({
        mediaType: 'photo',
        includeBase64: false,
        maxHeight: 500,
        maxWidth: 500,
      });
      if (!response.didCancel && !response.error) {
        setImage(response.path);
      }
    } catch (error) {
      console.error(error);
    }
  };
  
  
  const photoButtonLabel = image ? 'Change Photo' : 'Add Photo';

  return (
    <ScrollView style={styles.container}>
        <Text style={styles.label}>Type</Text>
        <View style={styles.radioContainer}>
        <TouchableOpacity
          style={[
            styles.radio,
            { backgroundColor: type === 'silver' ? '#fff' : '#f2f2f2' },
          ]}
          onPress={() => setType('silver')}
        >
          {type === 'silver' && <View style={styles.selected} />}
        </TouchableOpacity>
        <Text style={styles.radioLabel}>Silver</Text>

        <TouchableOpacity
          style={[
            styles.radio,
            { backgroundColor: type === 'other' ? '#fff' : '#f2f2f2' },
            { marginLeft: 10 },
          ]}
          onPress={() => setType('other')}
        >
          {type === 'other' && <View style={styles.selected} />}
        </TouchableOpacity>
        <Text style={styles.radioLabel}>Other</Text>
      </View>

      <Text style={styles.label}>Name</Text>
      <TextInput
        style={styles.input}
        onChangeText={(text) => setName(text)}
        value={name}
      />

      <Text style={styles.label}>Weight</Text>
      <TextInput
        style={styles.input}
        onChangeText={(text) => setWeight(text)}
        value={weight}
      />

      <Text style={styles.label}>Buy Price</Text>
      <TextInput
        style={styles.input}
        onChangeText={(text) => setBuyPrice(text)}
        value={buyPrice}
      />

      <Text style={styles.label}>Sell Price</Text>
      <TextInput
        style={styles.input}
        onChangeText={(text) => setSellPrice(text)}
        value={sellPrice}
      />

      <Text style={styles.label}>Quantity</Text>
      <TextInput
        style={styles.input}
        onChangeText={(text) => setQuantity(text)}
        value={quantity}
      />

      <Text style={styles.label}>Photo</Text>

      {image && (
      <View style={styles.imageContainer}>
        <Image source={{ uri: image }} style={styles.image} />
        <TouchableOpacity style={styles.deleteButton} onPress={() => setImage(null)}>
          <Text style={styles.deleteButtonText}>X</Text>
        </TouchableOpacity>
      </View>
      )}

      {isLoading ? (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <ActivityIndicator size="large" color="#0000ff" style={{marginBottom: 40}} />
        </View>
      ) : (
      <>
      <TouchableOpacity style={styles.photoButton} onPress={handleSelectImage}>
        <Text style={styles.photoButtonText}>{photoButtonLabel}</Text>
      </TouchableOpacity>

      <View style={{ marginBottom: 40, marginTop: 20 }}>
        <TouchableOpacity style={styles.button} onPress={handleAddItem}>
          <Text style={styles.buttonText}>Add Item</Text>
        </TouchableOpacity>
      </View>
      </>
      )}
    </ScrollView>
  );
};
export default AddItem;
