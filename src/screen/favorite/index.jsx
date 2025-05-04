import React, { useRef, useEffect } from 'react';
import { View, Text, Animated, FlatList, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Home as HomeIcon, SearchNormal, Heart, User } from 'iconsax-react-native';
import { colors, fontType } from '../../theme';

const favoritePlaces = [
  {
    id: 1,
    title: 'Gunung Bromo',
    description: 'Gunung Bromo adalah gunung berapi aktif yang terkenal dengan pemandangan matahari terbit yang spektakuler...',
    image: { uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRVlIWuFFcbZciydI-PYVwHmh3h9xWLI9rvRQ&s' },
    rating: 4.8,
  },
  {
    id: 2,
    title: 'Taman Rekreasi Selecta',
    description: 'Taman Rekreasi Selecta menawarkan suasana alam yang sejuk dengan wahana kolam renang dan taman bunga...',
    image: { uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSOITNHzuAriRH478_KVQOZHt3DOuw61Q9k8Q&s' },
    rating: 4.5,
  },
  {
    id: 3,
    title: 'Jatim Park 2',
    description: 'Jatim Park 2 adalah taman hiburan dan edukasi yang memiliki wahana seperti Batu Secret Zoo...',
    image: { uri: 'https://bromomalangtour.com/wp-content/uploads/2013/06/jatim-park-2.jpg' },
    rating: 4.7,
  },
  {
    id: 4,
    title: 'Candi Singosari',
    description: 'Candi Singosari adalah situs sejarah peninggalan Kerajaan Singosari dengan arsitektur dan relief khas...',
    image: { uri: 'https://upload.wikimedia.org/wikipedia/commons/1/15/Candi_Singosari_B.JPG' },
    rating: 4.3,
  },
];

const FavoriteScreen = () => {
  const navigation = useNavigation();
  const animatedValues = useRef(favoritePlaces.map(() => new Animated.Value(0))).current;

  useEffect(() => {
    Animated.stagger(150,
      animatedValues.map((anim) =>
        Animated.timing(anim, {
          toValue: 1,
          duration: 500,
          useNativeDriver: true,
        })
      )
    ).start();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Favorit Anda</Text>
      <Animated.FlatList
        data={favoritePlaces}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={{ paddingBottom: 80 }}
        renderItem={({ item, index }) => (
          <Animated.View
            style={{
              opacity: animatedValues[index],
              transform: [
                {
                  translateY: animatedValues[index].interpolate({
                    inputRange: [0, 1],
                    outputRange: [20, 0],
                  }),
                },
              ],
            }}
          >
            <View style={styles.card}>
              <Image source={item.image} style={styles.image} />
              <View style={styles.textContainer}>
                <Text style={styles.name}>{item.title}</Text>
                <Text style={styles.description}>{item.description}</Text>
                <Text style={styles.rating}>⭐ {item.rating}</Text>
              </View>
            </View>
          </Animated.View>
        )}
      />

      {/* Navbar */}
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
          <Heart size={24} color={colors.blue()} />
          <Text style={[styles.tabTitle, styles.tabTitleActive]}>Favorite</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.tabButton} onPress={() => navigation.navigate('Profile')}>
          <User size={24} color={colors.grey()} />
          <Text style={styles.tabTitle}>Profile</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default FavoriteScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 12,
    marginTop: 30,
  },
  card: {
    flexDirection: 'row',
    marginBottom: 16,
    backgroundColor: '#f8f8f8',
    borderRadius: 12,
    overflow: 'hidden',
    elevation: 2,
  },
  image: {
    width: 120,
    height: 120,
    borderTopLeftRadius: 12,
    borderBottomLeftRadius: 12,
  },
  textContainer: {
    flex: 1,
    padding: 12,
    justifyContent: 'center',
  },
  name: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 6,
  },
  description: {
    fontSize: 14,
    color: '#555',
    marginBottom: 8,
  },
  rating: {
    fontSize: 13,
    color: '#888',
  },
  bottomBar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: colors.white(),
    paddingVertical: 10,
    borderTopWidth: 1,
    borderTopColor: colors.grey(0.3),
    position: 'absolute',
    bottom: 0,
    width: '100%',
  },
  tabButton: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  tabTitle: {
    fontSize: 12,
    fontFamily: fontType['Pjs-Regular'],
    color: colors.grey(),
    marginTop: 4,
  },
  tabTitleActive: {
    color: colors.blue(),
    fontFamily: fontType['Pjs-Medium'],
  },
});
