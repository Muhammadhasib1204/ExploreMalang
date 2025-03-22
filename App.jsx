import React, { useState, useEffect, useRef } from 'react';
import { ScrollView, StyleSheet, Text, View, Image, TextInput, Pressable, Modal, Button, StatusBar, TouchableOpacity } from 'react-native';
import { SearchNormal } from 'iconsax-react-native';
import { fontType, colors } from './src/theme'; 
import { destinations, carouselImages } from './component/destinasi'; 

export default function App() {
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedPlace, setSelectedPlace] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [searchQuery, setSearchQuery] = useState(''); 
  const carouselRef = useRef(null); 
  const [currentIndex, setCurrentIndex] = useState(0);

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

 
  useEffect(() => {
    const intervalId = setInterval(() => {
      const nextIndex = (currentIndex + 1) % carouselImages.length;
      setCurrentIndex(nextIndex); 

      if (carouselRef.current) {
        carouselRef.current.scrollTo({ x: nextIndex * 300, animated: true }); 
      }
    }, 3000); 

    return () => clearInterval(intervalId); 
  }, [currentIndex]);

  const filteredDestinations = destinations.filter((place) =>
    place.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
    place.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" />
      
      <View style={styles.header}>
        <Image source={require('./src/logo/newlogo.png')} style={styles.logo} />
        <View style={styles.searchBarContainer}>
          <TextInput 
            style={styles.input} 
            placeholder="Cari Destinasi" 
            value={searchQuery} 
            onChangeText={(text) => setSearchQuery(text)} 
          />
          <Pressable style={styles.button}>
            <SearchNormal size={20} color={colors.white()} />
          </Pressable>
        </View>
      </View>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.carousel}
        ref={carouselRef}
        scrollEventThrottle={16}
      >
        {carouselImages.map((image, index) => (
          <Image 
            key={index} 
            source={image} 
            style={styles.carouselImage} 
          />
        ))}
      </ScrollView>

      <View style={styles.listCategory}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <TouchableOpacity 
            style={[category.item, selectedCategory === 'Destinasi Alam' && category.selectedItem]} 
            onPress={() => handleCategorySelect('Destinasi Alam')}
          >
            <Text style={[category.title, selectedCategory === 'Destinasi Alam' && category.selectedTitle]} >
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
        {filteredDestinations.map((place) => (
          <Pressable key={place.id} style={styles.blogItem} onPress={() => handlePlaceClick(place)}>
            <Image source={place.image} style={styles.blogImage} />
            <View style={styles.blogContent}>
              <Text style={styles.blogTitle}>{place.title}</Text>
              <Text style={styles.blogDescription}>{place.description}</Text>
              <Text style={styles.blogRating}>{renderRating(place.rating)}</Text>
            </View>
          </Pressable>
        ))}
      </ScrollView>

      <Modal animationType="slide" transparent={true} visible={modalVisible} onRequestClose={closeModal}>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            {selectedPlace && (
              <>
                <Image source={selectedPlace.image} style={styles.modalImage} />
                <Text style={styles.modalTitle}>{selectedPlace.title}</Text>
                <Text style={styles.modalDescription}>{selectedPlace.description}</Text>
                <Text style={styles.modalRating}>{renderRating(selectedPlace.rating)}</Text>
                <Button title="Close" onPress={closeModal} color="#7A4B29" style={styles.modalButton} />
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
  innerContainer: {
    flex: 1,
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
    marginBottom: 10,
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
    marginBottom: 10,
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
    marginBottom: 10,
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
