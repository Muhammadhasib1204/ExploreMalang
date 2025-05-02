import React, { useState } from 'react';
import { View, TextInput, StyleSheet, ScrollView, Image, Text, Pressable, TouchableOpacity } from 'react-native';
import { SearchNormal, Heart, User, Home as HomeIcon } from 'iconsax-react-native';
import { destinations } from '../../../component';
import { colors, fontType } from '../../theme';
import { useNavigation } from '@react-navigation/native';

export default function SearchScreen() {
    const navigation = useNavigation();
  const [query, setQuery] = useState('');
  const [searchHistory, setSearchHistory] = useState([]);

  const filteredResults = destinations.filter((place) =>
    place.title.toLowerCase().includes(query.toLowerCase()) ||
    place.description.toLowerCase().includes(query.toLowerCase())
  );

  const handleSearch = () => {
    if (query.trim() !== '') {
      const newResults = filteredResults.filter(
        (item) => !searchHistory.some((hist) => hist.id === item.id)
      );
      setSearchHistory([...newResults, ...searchHistory]);
    }
  };

  const handleDeleteHistory = (id) => {
    setSearchHistory(searchHistory.filter(item => item.id !== id));
  };

  return (
    <View style={styles.container}>
      <View style={styles.searchBarContainer}>
        <TextInput
          style={styles.input}
          placeholder="Cari Destinasi"
          value={query}
          onChangeText={setQuery}
          onSubmitEditing={handleSearch}
        />
        <Pressable style={styles.button} onPress={handleSearch}>
          <SearchNormal size={20} color={colors.white()} />
        </Pressable>
      </View>

      <ScrollView>
        {query.trim() !== '' ? (
          filteredResults.length > 0 ? (
            filteredResults.map((place) => (
              <View key={place.id} style={styles.item}>
                <Image source={place.image} style={styles.image} />
                <View style={styles.content}>
                  <Text style={styles.title}>{place.title}</Text>
                  <Text style={styles.description}>{place.description}</Text>
                </View>
              </View>
            ))
          ) : (
            <Text style={styles.noResultText}>Tidak ada hasil ditemukan.</Text>
          )
        ) : (
          <>
            <Text style={styles.historyTitle}>Riwayat Pencarian</Text>
            {searchHistory.map((place) => (
              <View key={place.id} style={styles.historyItem}>
                <View style={styles.item}>
                  <Image source={place.image} style={styles.image} />
                  <View style={styles.content}>
                    <Text style={styles.title}>{place.title}</Text>
                    <Text style={styles.description}>{place.description}</Text>
                  </View>
                </View>
                <TouchableOpacity onPress={() => handleDeleteHistory(place.id)} style={styles.deleteBtn}>
                  <Text style={styles.deleteText}>✕</Text>
                </TouchableOpacity>
              </View>
            ))}
          </>
        )}
      </ScrollView>

      <View style={styles.bottomBar}>
        <TouchableOpacity style={styles.tabButton} onPress={() => navigation.navigate('Home')}>
          <HomeIcon size={24} color={colors.blue()} />
          <Text style={[styles.tabTitle, styles.tabTitleActive]}>Home</Text>
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
          <User size={24} color={colors.grey()} />
          <Text style={styles.tabTitle}>Profile</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.white(), padding: 16 },
  searchBarContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.white(),
    borderColor: colors.blue(),
    borderRadius: 30,
    borderWidth: 2,
    paddingHorizontal: 15,
    marginBottom: 16,
    marginTop: 30,
    elevation: 3,
  },
  input: {
    flex: 1,
    height: 40,
    fontSize: 16,
    fontFamily: fontType['Pjs-Regular'],
    color: colors.black(),
  },
  button: {
    backgroundColor: colors.blue(),
    alignItems: 'center',
    justifyContent: 'center',
    height: 35,
    width: 35,
    borderRadius: 20,
  },
  item: {
    flexDirection: 'row',
    marginBottom: 8,
    backgroundColor: colors.grey(0.1),
    borderRadius: 10,
    overflow: 'hidden',
  },
  image: { width: 100, height: 100 },
  content: { flex: 1, paddingHorizontal: 10, justifyContent: 'center' },
  title: { fontSize: 16, fontFamily: fontType['Pjs-SemiBold'], color: colors.black() },
  description: { fontSize: 14, color: colors.grey() },
  noResultText: { textAlign: 'center', color: colors.grey(), marginTop: 20, fontFamily: fontType['Pjs-Regular'] },
  historyTitle: { fontSize: 16, fontFamily: fontType['Pjs-SemiBold'], marginBottom: 10 },
  historyItem: {
    marginBottom: 12,
  },
  deleteBtn: {
    position: 'absolute',
    top: 5,
    right: 5,
    backgroundColor: colors.grey(0.2),
    borderRadius: 20,
    padding: 4,
    zIndex: 1,
  },
  deleteText: {
    fontSize: 14,
    color: colors.red ? colors.red() : 'red',
    fontWeight: 'bold',
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
