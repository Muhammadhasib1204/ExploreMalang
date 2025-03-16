import React, { useState } from 'react';
import { ScrollView, StyleSheet, Text, View, Image, TextInput, Pressable, Modal, Button, StatusBar, TouchableOpacity } from 'react-native';
import { SearchNormal } from 'iconsax-react-native';
import { fontType, colors } from './src/theme'; 

const blogList = [
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
  {
    id: 5,
    title: 'Pantai Balekambang',
    description: 'Pantai Balekambang menawarkan pemandangan indah dengan pasir putih dan batu karang yang menakjubkan. Pantai ini juga dikenal dengan adanya pura yang berada di tengah laut.',
    image: { uri: 'https://nagantour.com/wp-content/uploads/2023/12/pantai-balekambang-1.webp' },
    rating: 4.6,
  },
  {
    id: 7,
    title: 'Museum Angkut',
    description: 'Museum Angkut menyimpan koleksi berbagai kendaraan dari seluruh dunia, mulai dari mobil antik hingga kendaraan modern. Tempat ini memberikan pengalaman belajar yang menyenangkan.',
    image: { uri: 'https://osccdn.medcom.id/images/content/2021/12/29/c1ac85317e780cbd31f4b5e1b30b562f.jpg' },
    rating: 4.7,
  },
  
];

const carouselImages = [
  { uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRupoVN9oKhIcstb0H1BTYwZvcIRBoa3GV8oQ&s' },
  { uri: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/96/Tugu_Malang.jpg/800px-Tugu_Malang.jpg' },
  { uri: 'https://kabarmalang.com/wp-content/uploads/2024/09/IMG_20240904_170706.jpg' },
];

export default function App() {
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedPlace, setSelectedPlace] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const handleCategorySelect = (category) => {
    setSelectedCategory(category); 
  };
  const handlePlaceClick = (place) => {
    setSelectedPlace(place);
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
    setSelectedPlace(null);
  };

  const renderRating = (rating) => {
    const fullStars = Math.floor(rating);
    const halfStar = rating % 1 !== 0;
    const stars = [];
    
    for (let i = 0; i < fullStars; i++) {
      stars.push('★');
    }
    if (halfStar) {
      stars.push('☆'); 
    }
    return stars.join(' '); 
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" />
      
      <View style={styles.header}>
  <Image
    source={require('./src/logo/newlogo.png')}  
    style={styles.logo}
  />
  <View style={styles.searchBarContainer}>
    <TextInput
      style={styles.input}
      placeholder="Cari Destinasi"
    />
    <Pressable style={styles.button}>
      <SearchNormal size={20} color={colors.white()} />
    </Pressable>
  </View>
</View>


      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.carousel}>
        {carouselImages.map((image, index) => (
          <Image key={index} source={image} style={styles.carouselImage} />
        ))}
      </ScrollView>

      
      <View style={styles.listCategory}>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        <TouchableOpacity 
          style={[category.item, selectedCategory === 'Destinasi Alam' && category.selectedItem]} 
          onPress={() => handleCategorySelect('Destinasi Alam')}
        >
          <Text style={[category.title, selectedCategory === 'Destinasi Alam' && category.selectedTitle]}>
            Destinasi Alam
          </Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={[category.item, selectedCategory === 'Pantai' && category.selectedItem]} 
          onPress={() => handleCategorySelect('Pantai')}
        >
          <Text style={[category.title, selectedCategory === 'Pantai' && category.selectedTitle]}>
            Pantai
          </Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={[category.item, selectedCategory === 'Gunung & Pendakian' && category.selectedItem]} 
          onPress={() => handleCategorySelect('Gunung & Pendakian')}
        >
          <Text style={[category.title, selectedCategory === 'Gunung & Pendakian' && category.selectedTitle]}>
            Gunung & Pendakian
          </Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={[category.item, selectedCategory === 'Wisata Budaya' && category.selectedItem]} 
          onPress={() => handleCategorySelect('Wisata Budaya')}
        >
          <Text style={[category.title, selectedCategory === 'Wisata Budaya' && category.selectedTitle]}>
            Wisata Budaya
          </Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={[category.item, selectedCategory === 'Taman Hiburan' && category.selectedItem]} 
          onPress={() => handleCategorySelect('Taman Hiburan')}
        >
          <Text style={[category.title, selectedCategory === 'Taman Hiburan' && category.selectedTitle]}>
            Taman Hiburan
          </Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={[category.item, selectedCategory === 'Wisata Keluarga' && category.selectedItem]} 
          onPress={() => handleCategorySelect('Wisata Keluarga')}
        >
          <Text style={[category.title, selectedCategory === 'Wisata Keluarga' && category.selectedTitle]}>
            Wisata Keluarga
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </View>

      
      <ScrollView style={styles.listBlog}>
        {blogList.map((place) => (
          <Pressable
            key={place.id}
            style={styles.blogItem}
            onPress={() => handlePlaceClick(place)}
          >
            <Image source={place.image} style={styles.blogImage} />
            <View style={styles.blogContent}>
              <Text style={styles.blogTitle}>{place.title}</Text>
              <Text style={styles.blogDescription}>{place.description}</Text>
              <Text style={styles.blogRating}>{renderRating(place.rating)}</Text>
            </View>
          </Pressable>
        ))}
      </ScrollView>

      
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={closeModal}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            {selectedPlace && (
              <>
                <Image source={selectedPlace.image} style={styles.modalImage} />
                <Text style={styles.modalTitle}>{selectedPlace.title}</Text>
                <Text style={styles.modalDescription}>{selectedPlace.description}</Text>
                <Text style={styles.modalRating}>{renderRating(selectedPlace.rating)}</Text>
                <Button
                  title="Close"
                  onPress={closeModal}
                  color="#7A4B29"
                  style={styles.modalButton}
                />
              </>
            )}
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white(),
  },
  header: {
    paddingHorizontal: 24,
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
    height: 60,
    elevation: 8,
    paddingTop: 60,
    paddingBottom: 40,
  },
  logo: {
    width: 130,
    height: 130,
    marginBottom : 10,
    resizeMode: 'contain',
  },
  searchBarContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.white(), 
    borderColor: colors.blue(), 
    borderRadius: 30, 
    borderWidth: 2, 
    paddingHorizontal: 15, 
    elevation: 4, 
    marginLeft: 10,
    flex: 1,
  },
  input: {
    height: 40,
    paddingLeft: 40, 
    paddingRight: 10,
    width: '100%', 
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
    position: 'absolute', 
    right: 5, 
  },
  listCategory: {
    marginTop: -15,
    paddingVertical: 10,
    marginBottom : 10,
  },
  carousel: {
    marginBottom: 15,  
  paddingBottom: 110, 
  },
  carouselImage: {
    width: 300, 
    height: 180,
    borderRadius: 10,
    marginHorizontal: 8,
    resizeMode: 'cover', 
    marginBottom: 10, 
  },
  listBlog: {
    paddingVertical: 10,
  },
  blogItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
    paddingHorizontal: 24,
  },
  blogImage: {
    width: 120,  
    height: 120,
    borderRadius: 10,
  },
  blogContent: {
    marginLeft: 15,
    flex: 1,
  },
  blogTitle: {
    fontSize: 18,
    fontFamily: fontType['Pjs-SemiBold'],
    color: colors.black(),
  },
  blogDescription: {
    fontSize: 14,
    color: colors.grey(),
    marginTop: 5,
    numberOfLines: 3, 
  },
  blogRating: {
    fontSize: 14,
    color: colors.gold(),
    marginTop: 5,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalContent: {
    backgroundColor: colors.white(),
    padding: 20,
    borderRadius: 10,
    width: '80%',
    alignItems: 'center',
  },
  modalImage: {
    width: 200,
    height: 200,
    borderRadius: 10,
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 15,
  },
  modalDescription: {
    fontSize: 16,
    marginTop: 10,
    textAlign: 'center',
  },
  modalRating: {
    fontSize: 18,
    color: colors.gold(),
    marginTop: 10,
    marginBottom : 10,
  },
  modalButton: {
    marginTop: 20,
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 10,
  }
  
});

const category = StyleSheet.create({
  item: {
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderRadius: 25,
    alignItems: 'center',
    backgroundColor: colors.grey(0.08),
    marginHorizontal: 5,
  },
  title: {
    fontFamily: fontType['Pjs-SemiBold'],
    fontSize: 14,
    lineHeight: 18,
    color: colors.grey(),
  },
});
