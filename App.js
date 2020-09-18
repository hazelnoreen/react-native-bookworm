import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { 
  StyleSheet, 
  Text, 
  View, 
  SafeAreaView, 
  TouchableOpacity,
  TextInput, 
  FlatList } from 'react-native';
import BookCount from './components/BookCount'
import CustomActionButton from './components/CustomActionButton'
import { Ionicons } from '@expo/vector-icons'

export default function App() {
    this.state = {
      totalCount: 0,
      readingCount: 0,
      readCount: 0,
      isAddNewBookVisible: true,
      textInputData: '',
      books: []
    }

    showAddNewBook = () => {
      this.setState({ isAddNewBookVisible: true })
    }

    hideAddNewBook = () => {
      this.setState({ isAddNewBookVisible: false })
    }

    addBook = (book) => {
      this.setState((state, props) => ({
        books: [...state.books, book],
        totalCount: state.totalCount + 1,
        readingCount: state.readingCount + 1
      }))
    }

    markAsRead = (selectedBook, index) => {
      let newList = this.state.books.filter(book => book !== selectedBook)

      this.setState(prevState => ({
        books: newList,
        readingCount: prevState.readingCount - 1,
        readCount: prevState.readCount + 1
      }))
    }

    renderItem = (item, index) => (
      <View style={{ height: 50, flexDirection: 'row' }}>
        <View style={{ flex: 1, justifyContent: 'center', paddingLeft: 5 }}>
          <Text>{item}</Text>
        </View>
        <TouchableOpacity onPress={()=> markAsRead(item, index)}>
            <View style={{ 
              width: 100, 
              height: 50,
              backgroundColor: '#a5deba', 
              alignItems:'center', 
              justifyContent: 'center' }}>
              <Text style={{ fontweight: 'bold', color: 'white' }}>Mark as Read</Text>
            </View>
          </TouchableOpacity>
      </View>
    )
  
  return (
    <View style={{ flex: 1 }}>
      <SafeAreaView />
        <View style={{ 
          height: 70, 
          borderBottomWidth: 1, 
          borderBottomColor: '#E9E9E9',
          alignItems: 'center',
          justifyContent: 'center',
          marginTop: 30
        }}> 
        <Text style={{ fontSize: 24}}>BOOK WORM</Text>
        </View>
        <View style={{ flex: 1,  }}>
          {this.state.isAddNewBookVisible && (
          <View style={{ height: 50, flexDirection: 'row' }}>
            <TextInput 
              onChangeText={(text) => this.setState({textInputData:text})} 
              style={{ flex: 1, backgroundColor: '#ececec', paddingLeft: 5 }}
              placeholder='Enter Book Name'
              placeholderTextColor='grey'
            />

            <CustomActionButton style={{ backgroundColor:'#a5deba' }} 
              onPress={this.addBook(this.state.textInputData)}>
              <Ionicons name='ios-checkmark' color='white' size={50} />
            </CustomActionButton>
            <CustomActionButton>
              <Ionicons name='ios-close' color='white' size={50} />
            </CustomActionButton>

          {/* <TouchableOpacity onPress={()=>this.addBook(this.state.textInputData)}>
            <View style={{ 
              width: 50, 
              height: 50,
              backgroundColor: '#a5deba', 
              alignItems:'center', 
              justifyContent: 'center' }}>
              <Ionicons name='ios-checkmark' color='white' size={50} />
            </View>
          </TouchableOpacity>
           */}
          </View>
          )}
          <FlatList 
            data={this.state.books}
            renderItem={({ item }, index) => this.renderItem(item, index)}
            keyExtractor={(item, index) => index.toString()}
            ListEmptyComponent={
              <View style={{ marginTop: 50, alignItems: 'center' }}>
                <Text style={{ fontWeight: 'bold' }}>Not Reading Any Books.
                </Text>
              </View>
            }
          />
          <TouchableOpacity 
            onPress={this.showAddNewBook}
            style={{ position: 'absolute', bottom: 20, right: 20 }}>
            <View style={{ 
              width: 50, 
              height: 50, 
              borderRadius: 25, 
              backgroundColor: '#AAD1E6',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <Text style={{ color: 'white', fontSize: 30}}>+</Text>
            </View>
          </TouchableOpacity>
        </View>
        <View style={{ 
          height: 70, 
          borderTopWidth: 1, 
          borderTopColor: '#E9E9E9',
          flexDirection: 'row'
        }}>
          <BookCount title="TITLE" count={this.state.totalCount} />
          <BookCount title='READING' count={this.state.readingCount} />
          <BookCount title='READ' count={this.state.readCount} />
        </View>
      <SafeAreaView />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  box: {
    height: 50,
    width: 50,
    backgroundColor: 'red'
  }
});
