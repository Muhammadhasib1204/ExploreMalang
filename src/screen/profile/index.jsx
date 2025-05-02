import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';

const ProfileScreen = () => {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Image
        source={{
          uri: 'https://www.w3schools.com/howto/img_avatar.png',
        }}
        style={styles.avatar}
      />
      <Text style={styles.name}>Nama Pengguna</Text>
      <Text style={styles.email}>pengguna@email.com</Text>

      <TouchableOpacity style={styles.editButton}>
        <Text style={styles.editButtonText}>Edit Profil</Text>
      </TouchableOpacity>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Informasi Pribadi</Text>

        <View style={styles.infoBox}>
          <Text style={styles.label}>Kota</Text>
          <Text style={styles.value}>Malang</Text>
        </View>

        <View style={styles.infoBox}>
          <Text style={styles.label}>Minat</Text>
          <Text style={styles.value}>Wisata Alam, Kuliner</Text>
        </View>

        <View style={styles.infoBox}>
          <Text style={styles.label}>Jenis Kelamin</Text>
          <Text style={styles.value}>Laki-laki</Text>
        </View>

        <View style={styles.infoBox}>
          <Text style={styles.label}>Tanggal Lahir</Text>
          <Text style={styles.value}>12 Agustus 2000</Text>
        </View>

        <View style={styles.infoBox}>
          <Text style={styles.label}>No. Telepon</Text>
          <Text style={styles.value}>0812-3456-7890</Text>
        </View>
      </View>
    </ScrollView>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    paddingTop: 40,
    paddingBottom: 20,
    backgroundColor: '#fff',
  },
  avatar: {
    width: 120,
    height: 120,
    borderRadius: 60,
    marginBottom: 20,
  },
  name: {
    fontSize: 22,
    fontWeight: 'bold',
  },
  email: {
    fontSize: 16,
    color: 'gray',
    marginBottom: 20,
  },
  editButton: {
    backgroundColor: '#007AFF',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
    marginBottom: 30,
  },
  editButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
  },
  section: {
    width: '85%',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  infoBox: {
    backgroundColor: '#f5f5f5',
    padding: 12,
    borderRadius: 10,
    marginBottom: 10,
  },
  label: {
    fontSize: 14,
    color: 'gray',
  },
  value: {
    fontSize: 16,
    fontWeight: '500',
  },
});
