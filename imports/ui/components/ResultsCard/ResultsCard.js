import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import styles from './styles';
import {
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Typography,
  Drawer,
  List,
  ListItem
} from '@material-ui/core/';
function MediaCard(props) {
  const { classes, places } = props;
  console.log(places);
  return (
    <div className={classes.root}>
      <Drawer
        className={classes.drawer}
        variant="permanent"
        classes={{
          paper: classes.drawerPaper
        }}
        anchor="right"
      >
        <List>
          {places.map(place => {
            const placeid = place.place_id;
            Meteor.call('googleMapsWebsite.geocode', placeid);
            return (
              <ListItem>
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
                        <Typography component="p">
                          {place.rating ? `Rating: ${place.rating}` : ''}
                        </Typography>
                        <Typography component="p">
                          {place.price_level
                            ? `Price Level: ${place.price_level}`
                            : ''}
                        </Typography>
                        <Typography component="p">{place.vicinity}</Typography>
                      </CardContent>
                    </a>
                  </CardActionArea>
                </Card>
              </ListItem>
            );
          })}
        </List>
      </Drawer>
    </div>
  );
}
MediaCard.propTypes = {
  classes: PropTypes.object.isRequired
};
export default withStyles(styles)(MediaCard);
