import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  FlatList,
  ActivityIndicator,
  TextInput,
  Alert,
} from 'react-native';
import {
  SearchNormal,
  Heart,
  User,
  Home as HomeIcon,
  Add,
} from 'iconsax-react-native';
import {colors, fontType} from '../../theme';
import {useNavigation} from '@react-navigation/native';
import ImagePicker from 'react-native-image-crop-picker';
import firestore from '@react-native-firebase/firestore';
import notifee, {AndroidImportance} from '@notifee/react-native';

const brownTheme = {
  primary: '#8B4513',
  light: '#D2B48C',
  dark: '#5C3317',
};

const ProfileScreen = () => {
  const navigation = useNavigation();
  const [selectedTab, setSelectedTab] = useState('User');
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [formVisible, setFormVisible] = useState(false);
  const [editingPost, setEditingPost] = useState(null);
  const [image, setImage] = useState('');
  const [postForm, setPostForm] = useState({
    title: '',
    image: '',
    description: '',
  });

  const [userData, setUserData] = useState({
    name: 'Ravensky',
    email: 'Raven@email.com',
    city: 'Malang',
    interest: 'Wisata Alam, Kuliner',
    gender: 'Laki-laki',
    dob: '12 Agustus 2000',
    phone: '0812-3456-7890',
  });

  useEffect(() => {
    if (selectedTab === 'Postingan') {
      fetchPosts();
    }
  }, [selectedTab]);

  const fetchPosts = async () => {
    try {
      setLoading(true);
      const snapshot = await firestore().collection('posts').get();
      const fetchedPosts = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
      }));
      setPosts(fetchedPosts);
    } catch (error) {
      console.error('Error fetching posts:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleEditProfile = () => {
    navigation.navigate('EditProfil', {userData, setUserData});
  };

  const handleImagePick = async () => {
    try {
      const image = await ImagePicker.openPicker({
        width: 1920,
        height: 1080,
        cropping: true,
      });
      setImage(image.path);
    } catch (error) {
      console.log(error);
      Alert.alert('Error', 'Gagal memilih gambar');
    }
  };

  const handleUploadImage = async () => {
    if (!image) return '';

    let filename = image.substring(image.lastIndexOf('/') + 1);
    const extension = filename.split('.').pop();
    const name = filename.split('.').slice(0, -1).join('.');
    filename = name + '_' + Date.now() + '.' + extension;

    const imageFormData = new FormData();
    imageFormData.append('file', {
      uri: image,
      type: `image/${extension}`,
      name: filename,
    });

    try {
      const response = await fetch(
        'https://backend-file-praktikum.vercel.app/upload/',
        {
          method: 'POST',
          body: imageFormData,
        },
      );

      if (response.status !== 200) {
        throw new Error('Gagal upload gambar');
      }

      const {url} = await response.json();
      return url;
    } catch (error) {
      console.error('🔥 Upload error:', error);
      Alert.alert('Upload Error', 'Gagal upload gambar');
      return '';
    }
  };

  const handleNotification = async () => {
    await notifee.requestPermission();

    const channelId = await notifee.createChannel({
      id: 'default',
      name: 'Default Channel',
      importance: AndroidImportance.HIGH,
    });

    await notifee.displayNotification({
      title: 'Berhasil!',
      body: 'Review berhasil diupload',
      android: {
        channelId,
        smallIcon: 'ic_launcher',
        pressAction: {
          id: 'default',
        },
      },
    });
  };

  const handleSavePost = async () => {
    if (!postForm.title || !image || !postForm.description) {
      Alert.alert('Validasi', 'Judul, gambar, dan deskripsi harus diisi!');
      return;
    }

    try {
      setLoading(true);

      const imageUrl = await handleUploadImage();
      if (!imageUrl) return;

      const newPost = {
        title: postForm.title,
        image: imageUrl,
        description: postForm.description,
      };

      if (editingPost) {
        await firestore()
          .collection('posts')
          .doc(editingPost.id)
          .update(newPost);
      } else {
        await firestore().collection('posts').add(newPost);
      }
      await handleNotification();

      fetchPosts();
      setFormVisible(false);
      setEditingPost(null);
      setPostForm({title: '', image: '', description: ''});
      setImage('');
    } catch (error) {
      console.error('🔥 Error saving post:', error);
      Alert.alert('Error', 'Gagal menyimpan postingan.');
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = post => {
    setEditingPost(post);
    setPostForm({
      title: post.title,
      image: post.image,
      description: post.description,
    });
    setImage(post.image);
    setFormVisible(true);
  };

  const handleDelete = async id => {
    Alert.alert('Konfirmasi', 'Yakin ingin menghapus postingan ini?', [
      {text: 'Batal', style: 'cancel'},
      {
        text: 'Hapus',
        style: 'destructive',
        onPress: async () => {
          try {
            await firestore().collection('posts').doc(id).delete();
            setPosts(posts.filter(p => p.id !== id));
          } catch (error) {
            console.error('Error deleting post:', error);
          }
        },
      },
    ]);
  };

  const renderPostItem = ({item}) => (
    <View style={styles.card}>
      {item.title && <Text style={styles.cardTitle}>{item.title}</Text>}
      {item.image && (
        <Image source={{uri: item.image}} style={styles.postImage} />
      )}
      {item.description && <Text>{item.description}</Text>}
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'flex-end',
          marginTop: 8,
        }}>
        <TouchableOpacity
          onPress={() => handleEdit(item)}
          style={{marginRight: 10}}>
          <Text style={{color: brownTheme.primary}}>Edit</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => handleDelete(item.id)}>
          <Text style={{color: 'red'}}>Hapus</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={{flex: 1, backgroundColor: '#fff'}}>
      <View style={styles.tabContainer}>
        <TouchableOpacity
          style={[
            styles.tabButtonTop,
            selectedTab === 'User' && styles.activeTab,
          ]}
          onPress={() => setSelectedTab('User')}>
          <Text
            style={[
              styles.tabText,
              selectedTab === 'User' && styles.activeTabText,
            ]}>
            User
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.tabButtonTop,
            selectedTab === 'Postingan' && styles.activeTab,
          ]}
          onPress={() => setSelectedTab('Postingan')}>
          <Text
            style={[
              styles.tabText,
              selectedTab === 'Postingan' && styles.activeTabText,
            ]}>
            Review
          </Text>
        </TouchableOpacity>
      </View>
      {selectedTab === 'User' ? (
        <ScrollView contentContainerStyle={styles.container}>
          <Image
            source={{uri: 'https://www.w3schools.com/howto/img_avatar.png'}}
            style={styles.avatar}
          />
          <Text style={styles.name}>{userData.name}</Text>
          <Text style={styles.email}>{userData.email}</Text>
          <TouchableOpacity
            style={styles.editButton}
            onPress={handleEditProfile}>
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
      ) : (
        <View style={{flex: 1, padding: 16}}>
          <TouchableOpacity
            style={styles.floatingAddButton}
            onPress={() => setFormVisible(true)}>
            <Add size={24} color="white" />
          </TouchableOpacity>

          {formVisible && (
            <View style={styles.formContainer}>
              <TextInput
                placeholder="Judul"
                value={postForm.title}
                onChangeText={text => setPostForm({...postForm, title: text})}
                style={styles.input}
              />

              <TouchableOpacity
                style={styles.imagePickerButton}
                onPress={handleImagePick}>
                <Text style={styles.imagePickerButtonText}>
                  Pilih Gambar dari Galeri
                </Text>
              </TouchableOpacity>

              {image && (
                <Image
                  source={{uri: image}}
                  style={{height: 100, marginVertical: 8}}
                />
              )}

              <TextInput
                placeholder="Deskripsi"
                value={postForm.description}
                onChangeText={text =>
                  setPostForm({...postForm, description: text})
                }
                multiline
                numberOfLines={4}
                style={[styles.input, {height: 80}]}
              />

              <View
                style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                <TouchableOpacity
                  onPress={() => {
                    setFormVisible(false);
                    setEditingPost(null);
                    setPostForm({title: '', image: '', description: ''});
                    setImage('');
                  }}>
                  <Text style={{color: 'red'}}>Batal</Text>
                </TouchableOpacity>

                <TouchableOpacity onPress={handleSavePost}>
                  <Text style={{color: brownTheme.primary}}>Simpan</Text>
                </TouchableOpacity>
              </View>
            </View>
          )}

          {loading ? (
            <ActivityIndicator size="large" color={brownTheme.primary} />
          ) : (
            <FlatList
              data={posts}
              keyExtractor={item => item.id}
              renderItem={renderPostItem}
            />
          )}
        </View>
      )}
      <View style={styles.bottomBar}>
        <TouchableOpacity
          style={styles.tabButton}
          onPress={() => navigation.navigate('Home')}>
          <HomeIcon size={24} color={colors.blue()} />
          <Text style={[styles.tabTitle, styles.tabTitleActive]}>Home</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.tabButton}
          onPress={() => navigation.navigate('Pencarian')}>
          <SearchNormal size={24} color={colors.grey()} />
          <Text style={styles.tabTitle}>Search</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.tabButton}
          onPress={() => navigation.navigate('Favorite')}>
          <Heart size={24} color={colors.grey()} />
          <Text style={styles.tabTitle}>Favorite</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.tabButton}
          onPress={() => navigation.navigate('Profile')}>
          <User size={24} color={colors.grey()} />
          <Text style={styles.tabTitle}>Profile</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  floatingAddButton: {
    position: 'absolute',
    bottom: 20,
    right: 16,
    backgroundColor: brownTheme.primary,
    padding: 10,
    borderRadius: 8,
    zIndex: 10,
  },
  container: {
    alignItems: 'center',
    paddingTop: 80,
    paddingBottom: 20,
    backgroundColor: '#fff',
  },
  avatar: {width: 120, height: 120, borderRadius: 60, marginBottom: 20},
  name: {fontSize: 22, fontWeight: 'bold'},
  email: {fontSize: 16, color: 'gray', marginBottom: 20},
  editButton: {
    backgroundColor: brownTheme.primary,
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
    marginBottom: 30,
  },
  editButtonText: {color: '#fff', fontSize: 14, fontWeight: '600'},
  section: {width: '85%'},
  sectionTitle: {fontSize: 18, fontWeight: 'bold', marginBottom: 10},
  infoBox: {
    backgroundColor: '#f5f5f5',
    padding: 12,
    borderRadius: 10,
    marginBottom: 10,
  },
  label: {fontSize: 14, color: 'gray'},
  value: {fontSize: 16, fontWeight: '500'},
  bottomBar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingVertical: 10,
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: '#ccc',
  },
  tabButton: {alignItems: 'center'},
  tabTitle: {fontSize: 12, color: '#999', marginTop: 4},
  tabTitleActive: {
    color: brownTheme.primary,
    fontFamily: fontType['Pjs-SemiBold'],
  },
  tabContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 30,
    borderBottomWidth: 1,
    borderColor: '#ccc',
  },
  tabButtonTop: {
    paddingVertical: 10,
    width: '50%',
    alignItems: 'center',
  },
  activeTab: {
    borderBottomWidth: 2,
    borderBottomColor: brownTheme.primary,
  },
  tabText: {fontSize: 16, color: '#999'},
  activeTabText: {
    fontWeight: 'bold',
    color: brownTheme.primary,
  },
  addButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: brownTheme.primary,
    padding: 10,
    borderRadius: 8,
    marginBottom: 10,
    alignSelf: 'flex-start',
  },
  addText: {color: 'white', marginLeft: 6},
  card: {
    backgroundColor: '#f1f1f1',
    padding: 12,
    borderRadius: 8,
    marginBottom: 10,
  },
  cardTitle: {fontWeight: 'bold'},
  postImage: {
    width: '100%',
    height: 200,
    borderRadius: 8,
    marginVertical: 10,
  },
  formContainer: {
    backgroundColor: '#fafafa',
    padding: 16,
    borderRadius: 12,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 3,
  },
  input: {
    backgroundColor: '#fff',
    paddingHorizontal: 14,
    paddingVertical: 12,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#ddd',
    marginBottom: 14,
    fontSize: 16,
    color: '#333',
  },
  imagePickerText: {
    color: brownTheme.primary,
    fontWeight: '600',
    marginBottom: 12,
    fontSize: 16,
  },
  buttonsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 8,
  },
  cancelText: {
    color: 'red',
    fontWeight: '600',
    fontSize: 16,
  },
  saveText: {
    color: brownTheme.primary,
    fontWeight: '600',
    fontSize: 16,
  },
  imagePickerButton: {
    backgroundColor: brownTheme.primary,
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  imagePickerButtonText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 16,
  },
});
