import React, { useState } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { SearchNormal, Heart, User, Home as HomeIcon } from 'iconsax-react-native';
import { colors, fontType } from '../../theme';
import { useNavigation } from '@react-navigation/native';

const ProfileScreen = () => {
  const navigation = useNavigation();

  const [userData, setUserData] = useState({
    name: 'Nama Pengguna',
    email: 'pengguna@email.com',
    city: 'Malang',
    interest: 'Wisata Alam, Kuliner',
    gender: 'Laki-laki',
    dob: '12 Agustus 2000',
    phone: '0812-3456-7890',
  });

  const handleEditProfile = () => {
    navigation.navigate('EditProfil', { userData, setUserData });
  };

  return (
    <View style={{ flex: 1, backgroundColor: '#fff' }}>
      <ScrollView contentContainerStyle={styles.container}>
        <Image
          source={{ uri: 'https://www.w3schools.com/howto/img_avatar.png' }}
          style={styles.avatar}
        />
        <Text style={styles.name}>{userData.name}</Text>
        <Text style={styles.email}>{userData.email}</Text>

        <TouchableOpacity style={styles.editButton} onPress={handleEditProfile}>
          <Text style={styles.editButtonText}>Edit Profil</Text>
        </TouchableOpacity>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Informasi Pribadi</Text>

          <View style={styles.infoBox}>
            <Text style={styles.label}>Kota</Text>
            <Text style={styles.value}>{userData.city}</Text>
          </View>

          <View style={styles.infoBox}>
            <Text style={styles.label}>Minat</Text>
            <Text style={styles.value}>{userData.interest}</Text>
          </View>

          <View style={styles.infoBox}>
            <Text style={styles.label}>Jenis Kelamin</Text>
            <Text style={styles.value}>{userData.gender}</Text>
          </View>

          <View style={styles.infoBox}>
            <Text style={styles.label}>Tanggal Lahir</Text>
            <Text style={styles.value}>{userData.dob}</Text>
          </View>

          <View style={styles.infoBox}>
            <Text style={styles.label}>No. Telepon</Text>
            <Text style={styles.value}>{userData.phone}</Text>
          </View>
        </View>
      </ScrollView>

      <View style={styles.bottomBar}>
        <TouchableOpacity style={styles.tabButton} onPress={() => navigation.navigate('Home')}>
          <HomeIcon size={24} color={colors.grey()} />
          <Text style={styles.tabTitle}>Home</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.tabButton} onPress={() => navigation.navigate('Pencarian')}>
          <SearchNormal size={24} color={colors.grey()} />
          <Text style={styles.tabTitle}>Search</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.tabButton} onPress={() => navigation.navigate('Favorite')}>
          <Heart size={24} color={colors.grey()} />
          <Text style={styles.tabTitle}>Favorite</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.tabButton} onPress={() => navigation.navigate('Profile')}>
          <User size={24} color={colors.blue()} />
          <Text style={[styles.tabTitle, styles.tabTitleActive]}>Profile</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default ProfileScreen;


const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    paddingTop: 80,
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
    backgroundColor: '#8B4513',
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
  bottomBar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingVertical: 10,
    backgroundColor: colors.white(),
    borderTopWidth: 1,
    borderTopColor: colors.grey(0.2),
  },
  tabButton: {
    alignItems: 'center',
  },
  tabTitle: {
    fontSize: 12,
    color: colors.grey(),
    marginTop: 4,
  },
  tabTitleActive: {
    color: colors.blue(),
    fontFamily: fontType['Pjs-SemiBold'],
  },
});
