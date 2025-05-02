import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';

const EditProfile = ({ route, navigation }) => {
  const { userData, setUserData } = route.params; 
  const [name, setName] = useState(userData.name);
  const [email, setEmail] = useState(userData.email);
  const [city, setCity] = useState(userData.city);
  const [interest, setInterest] = useState(userData.interest);
  const [gender, setGender] = useState(userData.gender);
  const [dob, setDob] = useState(userData.dob);
  const [phone, setPhone] = useState(userData.phone);

  const handleSave = () => {
    setUserData({ ...userData, name, email, city, interest, gender, dob, phone });
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Nama</Text>
      <TextInput
        style={styles.input}
        value={name}
        onChangeText={setName}
      />

      <Text style={styles.label}>Email</Text>
      <TextInput
        style={styles.input}
        value={email}
        onChangeText={setEmail}
      />

      <Text style={styles.label}>Kota</Text>
      <TextInput
        style={styles.input}
        value={city}
        onChangeText={setCity}
      />

      <Text style={styles.label}>Minat</Text>
      <TextInput
        style={styles.input}
        value={interest}
        onChangeText={setInterest}
      />

      <Text style={styles.label}>Jenis Kelamin</Text>
      <TextInput
        style={styles.input}
        value={gender}
        onChangeText={setGender}
      />

      <Text style={styles.label}>Tanggal Lahir</Text>
      <TextInput
        style={styles.input}
        value={dob}
        onChangeText={setDob}
      />

      <Text style={styles.label}>No. Telepon</Text>
      <TextInput
        style={styles.input}
        value={phone}
        onChangeText={setPhone}
      />

      <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
        <Text style={styles.saveButtonText}>Simpan</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  label: {
    fontSize: 16,
    marginVertical: 8,
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
    marginBottom: 20,
  },
  saveButton: {
    backgroundColor: '#8B4513',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  saveButtonText: {
    color: '#fff',
    fontSize: 16,
  },
});

export default EditProfile;
