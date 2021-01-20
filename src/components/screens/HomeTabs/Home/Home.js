
import React, { useEffect, useRef, useState, useContext } from 'react';
import { StyleSheet, Text, View, FlatList, Image, ScrollView, TouchableOpacity } from "react-native";
//import {IMG_BACK, IMG_BACK_WHITE, IMG_BACK_BLACK} from '../../../utility/imageRes';
import { SliderBox } from "react-native-image-slider-box";




// import { Colors } from 'react-native/Libraries/NewAppScreen';
// import colors from '../../../../../../utility/Colors';

const TAG = 'HOME==> ';

const images = [
  "https://c.ndtvimg.com/2020-01/chqvbl6_darbar-movie-review-_625x300_10_January_20.jpg",
  "https://i.ytimg.com/vi/hH-_Ne5myEs/maxresdefault.jpg",
  "https://images.indianexpress.com/2020/01/Ala-Vaikunthapurramuloo-759.jpg",

]

const data1 = [
  {
    title: "Free Mask Senetizer",
    price: "रु 599",

    ima: "https://assets.thehansindia.com/h-upload/2020/07/10/982868-radhe-shyam.jpg"
  },
  {
    title: "Health Suppliment",
    price: "रु 1099",
    ima: "https://mir-s3-cdn-cf.behance.net/project_modules/max_1200/357af377209731.5c80f529123a4.jpg",


  },
  {
    title: "Diabitiese",
    price: "रु 6669",
    ima: "https://img.mobygeek.com/resize/730x-/2020/04/13/ryme-city-c47c.jpg",
  },

  {
    title: "Persona Care",
    price: "रु 1000",
    ima: "https://i.ytimg.com/vi/cHyfYSghbvE/maxresdefault.jpg",
  },
  {
    title: "Fittness & Suppliment",
    price: "रु 109",
    ima: "https://images-na.ssl-images-amazon.com/images/I/61fhQI78YpL._SY550_.jpg",
  }
]



const Home = (props) => {
  // const { navigation } = useContext(BookContext);


  return (

    <View style={{ flex: 1, backgroundColor: 'black' }}>
      <View
        style={{
          flexDirection: 'row',

          height: 50,
          alignItems: 'center',

          backgroundColor: 'black',
          justifyContent: 'space-between',


        }}>

        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <TouchableOpacity style={{ marginLeft: 5, height: 40, width: 40, }}>

            <Image
              style={{ height: 30, width: 30, margin: 5 }}

              source={{
                uri: "https://i.pinimg.com/736x/ee/c0/71/eec071442e9a1b8e017c5a7c1853b880.jpg",
              }}
            />
          </TouchableOpacity>
          <Text style={{ marginLeft: 10, color: 'white', fontWeight: 'bold', fontSize: 20 }}>LOGO</Text>


        </View>

        <TouchableOpacity style={{ marginRight: 5, height: 40, width: 40, }}>

          <Image
            style={{ height: 20, width: 20, margin: 10 }}

            source={{
              uri: "https://applets.imgix.net/https%3A%2F%2Fassets.ifttt.com%2Fimages%2Fchannels%2F651849913%2Ficons%2Fmonochrome_large.png%3Fversion%3D0?ixlib=rails-2.1.3&w=240&h=240&auto=compress&s=90b5e39c14c0d722a3f65d635b32a0f3",
            }}
          />
        </TouchableOpacity>


      </View>

      <ScrollView>

        <View style={styles.container} >
          <View style={{ margin: 10, borderRadius: 10 }}>
            <SliderBox
              images={images}
              sliderBoxHeight={150}
              //width={550}
              // onCurrentImagePressed={index => console.warn(`image ${index} pressed`)}
              dotColor="#FFEE58"
              inactiveDotColor="#90A4AE"
              // paginationBoxVerticalPadding={20}
              autoplay
              circleLoop
              resizeMethod={'resize'}
              resizeMode={'cover'}
              paginationBoxStyle={{
                borderRadius: 10,

                margin: 10,
                alignItems: "center",
                alignSelf: "center",

              }}
              dotStyle={{
                width: 10,
                height: 10,
                borderRadius: 5,
                marginHorizontal: 0,
                padding: 0,
                margin: 0,
                backgroundColor: "rgba(128, 128, 128, 0.92)"
              }} />

          </View>



          <View style={{ backgroundColor: "black", flex: 1, marginTop: 10, }} >

            <View style={{ flex: 1, }} >
              <View style={{ flexDirection: "row", justifyContent: "space-between", margin: 10, alignItems: 'center' }}>
                <Text style={{ fontSize: 14, color: 'white', fontWeight: 'bold' }}>Top Picks For You</Text>
                <TouchableOpacity style={{ marginLeft: 5, flexDirection: "row" }}>
                  <Text style={{ marginRight: 5, color: 'white', }}>See all</Text>
                  <Image
                    style={{ color: "red", marginTop: 6 }}
                  // source={require('../../../../../../../assets/images/see_all.png')}
                  />
                </TouchableOpacity>
              </View>

              <View style={{ marginBottom: 2 }}>
                <FlatList
                  showsHorizontalScrollIndicator={false}
                  //showsVerticalScrollIndicator={false}
                  showIndicator={false}
                  scrollEnabled
                  horizontal={true}
                  data={data1}
                  renderItem={({ item, index }) => (

                    <TouchableOpacity>

                      <Image source={{ uri: item.ima }}// Use item to set the image source
                        key={index} // Important to set a key for list items
                        style={{
                          width: 100,
                          height: 125,
                          borderRadius: 5,
                          //   borderWidth:2,
                          // borderColor:'#d35647',
                          //resizeMode:'contain',
                          backgroundColor: 'red',
                          margin: 6
                        }}
                      />
                    </TouchableOpacity>
                  )}
                />
              </View>
            </View>




            <View style={{ flex: 1, }} >
              <View style={{ flexDirection: "row", justifyContent: "space-between", margin: 10, alignItems: 'center' }}>
                <Text style={{ fontSize: 14, color: 'white', fontWeight: 'bold' }}>HollyWood Movies</Text>
                <TouchableOpacity style={{ marginLeft: 5, flexDirection: "row" }}>
                  <Text style={{ color: 'white', marginRight: 5 }}>See all</Text>
                  <Image
                    style={{ color: "red", marginTop: 6 }}
                  // source={require('../../../../../../../assets/images/see_all.png')}
                  />
                </TouchableOpacity>
              </View>

              <View style={{ marginBottom: 2 }}>
                <FlatList
                  showsHorizontalScrollIndicator={false}
                  //showsVerticalScrollIndicator={false}
                  showIndicator={false}
                  scrollEnabled
                  horizontal={true}
                  data={data1}
                  renderItem={({ item, index }) => (

                    <TouchableOpacity>

                      <Image source={{ uri: item.ima }}// Use item to set the image source
                        key={index} // Important to set a key for list items
                        style={{
                          width: 100,
                          height: 125,
                          borderRadius: 5,
                          //   borderWidth:2,
                          // borderColor:'#d35647',
                          //resizeMode:'contain',
                          backgroundColor: 'red',
                          margin: 6
                        }}
                      />
                    </TouchableOpacity>
                  )}
                />
              </View>
            </View>



            <View style={{ flex: 1, }} >
              <View style={{ flexDirection: "row", justifyContent: "space-between", margin: 10, alignItems: 'center' }}>
                <Text style={{ fontSize: 14, color: 'white', fontWeight: 'bold' }}>Tv Action & Adventure</Text>
                <TouchableOpacity style={{ marginLeft: 5, flexDirection: "row" }}>
                  <Text style={{ color: "white", marginRight: 5 }}>See all</Text>
                  <Image
                    style={{ color: "white", marginTop: 6 }}
                  // source={require('../../../../../../../assets/images/see_all.png')}
                  />
                </TouchableOpacity>
              </View>

              <View style={{ marginBottom: 10 }}>
                <FlatList
                  showsHorizontalScrollIndicator={false}
                  //showsVerticalScrollIndicator={false}
                  showIndicator={false}
                  scrollEnabled
                  horizontal={true}
                  data={data1}
                  renderItem={({ item, index }) => (
                    <TouchableOpacity>

                      <Image source={{ uri: item.ima }}// Use item to set the image source
                        key={index} // Important to set a key for list items
                        style={{
                          width: 100,
                          height: 125,
                          borderRadius: 5,
                          //   borderWidth:2,
                          // borderColor:'#d35647',
                          //resizeMode:'contain',
                          backgroundColor: 'red',
                          margin: 6
                        }}
                      />
                    </TouchableOpacity>
                  )}
                />
              </View>
            </View>







          </View>
        </View>
      </ScrollView>
    </View>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
  }
});



export default Home;


