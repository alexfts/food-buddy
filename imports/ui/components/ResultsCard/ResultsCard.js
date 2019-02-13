import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import styles from './styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';

function MediaCard(props) {
  const { classes, places } = props;
  console.log('CARD PLACES', places);

  return places.map(place => {
    return (
      <Card className={classes.card}>
        <CardActionArea>
          {/* Link to website from api details */}
          <a
            href="https://google.com"
            target="_blank"
            rel="noopener noreferrer"
            className={classes.hrefLink}
          >
            {/* image from photo details */}
            <CardMedia
              className={classes.media}
              component="img"
              src={'https://picsum.photos/200'}
              title="Restaurant Image"
            />
            <CardContent>
              <Typography component="h2">{place.name}</Typography>
              <Typography component="p">{place.website}</Typography>
              <Typography component="p">Pull restaurant price_level</Typography>
              <Typography component="p">Pull restaurant formatted_address from details</Typography>
            </CardContent>
          </a>
        </CardActionArea>
      </Card>
    );
  });
}

MediaCard.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(MediaCard);

// React Native version with edits to convert to react

// import React, { Component } from 'react';
// import {
//   Text,
//   View,
//   List,
//   ListItem,
//   FlatList,
//   ActivityIndicator
// } from 'react';

// var _ = require('lodash');

// export default class RestaurantList extends Component {
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
//     const urlFirst = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${latitude},${longitude}&radius=500&type=restaurant&key=AIzaSyCsLQmoYlsOqd5yWQpnkbwbpa76UmYwz8E
//     `
//     const urlNext = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${latitude},${longitude}&radius=500&type=restaurant&key=AIzaSyCsLQmoYlsOqd5yWQpnkbwbpa76UmYwz8E&pagetoken=${pageToken}`;

//     let url = pageToken === '' ? urlFirst : urlNext

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

// Edited Version of React Native

// import {
//   Text,
//   View,
//   FlatList,
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
//     const url = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=49.2632597,-123.138&radius=1500&type=restaurant&keyword=indian&key=AIzaSyCsLQmoYlsOqd5yWQpnkbwbpa76UmYwz8E`

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
//
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
//            </View>
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
