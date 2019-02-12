import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import styles from './styles';
import { compose, withProps } from 'recompose';
import {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  Marker
} from 'react-google-maps';

const MapComponent = compose(
  withProps({
    googleMapURL:
      'https://maps.googleapis.com/maps/api/js?key=AIzaSyCsLQmoYlsOqd5yWQpnkbwbpa76UmYwz8E&v=3.exp&libraries=geometry,drawing,places',
    loadingElement: <div style={{ height: `100%` }} />,
    containerElement: <div style={{ height: `400px`, width: `500px` }} />,
    mapElement: <div style={{ height: `100%` }} />
  }),
  withScriptjs,
  withGoogleMap
)(props => (
  <GoogleMap
    defaultZoom={15}
    defaultCenter={{ lat: 49.2632597, lng: -123.138 }}
  >
    {props.isMarkerShown && (
      <Marker
        position={{ lat: 49.2632597, lng: -123.138 }}
        onClick={props.onMarkerClick}
      />
    )}
  </GoogleMap>
));

class Maps extends React.Component {
  state = {
    isMarkerShown: false
  };

  componentDidMount() {
    this.delayedShowMarker();
  }

  delayedShowMarker = () => {
    setTimeout(() => {
      this.setState({ isMarkerShown: true });
    }, 3000);
  };

  handleMarkerClick = () => {
    this.setState({ isMarkerShown: false });
    this.delayedShowMarker();
  };

  render() {
    return (
      <MapComponent
        isMarkerShown={this.state.isMarkerShown}
        onMarkerClick={this.handleMarkerClick}
      />
    );
  }
}

export default withStyles(styles)(Maps);

// import {
//   Text,
//   View,
//   FlatList,
//   ActivityIndicator,
//   AppRegistry
// } from 'react-native';

// import { List, ListItem } from "react-native-elements";
// var _ = require('lodash');

// export default class ResturnatList extends Component {
//   constructor(props) {
//     super(props);

//     this.state = {
//       loading: false,
//       data: [],
//       pageToken: '',
//       refreshing: false,
//       siteTitle: ''
//     };
//   }

//   componentDidMount() {

//     this.fetchData();
//   }

//   fetchData = () => {

//     navigator.geolocation.getCurrentPosition(
//             (position) => {
//     const latitude = Number(position.coords.latitude.toFixed(6));
//     const longitude = Number(position.coords.longitude.toFixed(6));
//     const { pageToken } = this.state;
//     const urlFirst = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${latitude},${longitude}&radius=500&type=restaurant&key=Your_Api_Key
//     `
//     const urlNext = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${latitude},${longitude}&radius=500&type=restaurant&key=Your_Api_Key&pagetoken=${pageToken}`;

//     let url = pageToken === '' ? urlFirst : urlNext
//     console.log(url);
//     console.log("url");
//     this.setState({ loading: true });
//     fetch(url)
//       .then(res => {
//         return res.json()
//       })
//       .then(res => {

//         const arrayData = _.uniqBy( [...this.state.data, ...res.results] , 'id' )

//         this.setState({
//           siteTitle: "Resturants Near By",
//           data: pageToken === '' ? res.results : arrayData,
//           loading: false,
//           refreshing: false,
//           pageToken: res.next_page_token
//         });

//       })
//       .catch(error => {
//         console.log(error);
//         this.setState({ loading: false });
//       });
//     })
//   };
//   renderSeparator = () => {
//    return (
//      <View
//        style={{
//          height: 1,
//          width: "86%",
//          backgroundColor: "#CED0CE",
//          marginLeft: "14%"
//        }}
//      />
//    );
//   };
//   renderHeader = () => {
//     return (<Text style={{ alignSelf: "center", fontWeight: "bold", fontSize: 20, marginBottom: 10}}>{this.state.siteTitle}</Text>)
//   };
//   renderFooter = () => {

//     if (this.state.pageToken === undefined) return null;

//     return (
//       <View
//         style={{
//           paddingVertical: 20,
//           borderTopWidth: 1,
//           borderColor: "#CED0CE"
//         }}
//       >
//         <ActivityIndicator animating size="large" />
//       </View>
//     );
//   };

//   handleRefresh = () => {
//     this.setState(
//       {
//         pageToken: '',
//         refreshing: true
//       },
//       () => {
//         this.fetchData();
//       }
//     );
//   };

//   handleLoadMore = () => {
//     this.fetchData();
//   };
//   render() {

//     return (
//       <View>
//       <List containerStyle={{ borderTopWidth: 0, borderBottomWidth: 0 }} >
//       <FlatList
//         data={this.state.data}
//         keyExtractor={item => item.id}
//         ListHeaderComponent={this.renderHeader}
//         ListFooterComponent={this.renderFooter}
//         renderItem={({ item }) =>{

//           const rating = item.rating ? item.rating : 'na'

//           return (<View><ListItem
//               roundAvatar
//               title={`${item.name}`+" ("+`${rating}`+")"}
//               subtitle={`${item.vicinity}` }
//               avatar={{ uri: item.icon }}
//               containerStyle={{ borderBottomWidth: 0 }}
//             />
//             <View
//               style={{
//                 height: 1,
//                 width: "86%",
//                 backgroundColor: "#CED0CE",
//                 marginLeft: "14%"
//               }}
//             /></View>
//           )
//         }}
//         onRefresh={this.handleRefresh}
//         refreshing={this.state.refreshing}
//         onEndReached={this.handleLoadMore}
//         onEndReachedThreshold={50}
//       />
//       </List>
//       </View>
//     );
//   }
// }
