import React from 'react';
import { View, Text, FlatList, Image, StyleSheet } from 'react-native';

const favoritePlaces = [
  {
    id: 1,
    title: 'Gunung Bromo',
    description: 'Gunung Bromo adalah gunung berapi aktif yang terkenal dengan pemandangan matahari terbit yang spektakuler. Wisatawan bisa menikmati pemandangan indah dengan kendaraan 4WD atau berjalan kaki.',
    image: { uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRVlIWuFFcbZciydI-PYVwHmh3h9xWLI9rvRQ&s' },
    rating: 4.8,
  },
  {
    id: 2,
    title: 'Taman Rekreasi Selecta',
    description: 'Taman Rekreasi Selecta menawarkan suasana alam yang sejuk dengan wahana kolam renang air panas dan taman bunga yang indah. Pemandangan pegunungan juga menambah kenyamanan.',
    image: { uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSOITNHzuAriRH478_KVQOZHt3DOuw61Q9k8Q&s' },
    rating: 4.5,
  },
  {
    id: 3,
    title: 'Jatim Park 2',
    description: 'Jatim Park 2 adalah taman hiburan dan edukasi yang memiliki wahana seperti Predator Fun Park dan Batu Secret Zoo. Tempat ini cocok untuk liburan keluarga sambil belajar tentang satwa.',
    image: { uri: 'https://bromomalangtour.com/wp-content/uploads/2013/06/jatim-park-2.jpg' },
    rating: 4.7,
  },
  {
    id: 4,
    title: 'Candi Singosari',
    description: 'Candi Singosari adalah situs sejarah peninggalan Kerajaan Singosari yang memiliki arsitektur indah dan relief-relief yang menggambarkan kejayaan kerajaan Jawa Timur.',
    image: { uri: 'https://upload.wikimedia.org/wikipedia/commons/1/15/Candi_Singosari_B.JPG' },
    rating: 4.3,
  },
];

const FavoriteScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Favorit Anda</Text>
      <FlatList
        data={favoritePlaces}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Image source={item.image} style={styles.image} />
            <View style={styles.textContainer}>
              <Text style={styles.name}>{item.title}</Text>
              <Text style={styles.description}>{item.description}</Text>
              <Text style={styles.rating}>⭐ {item.rating}</Text>
            </View>
          </View>
        )}
      />
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
});