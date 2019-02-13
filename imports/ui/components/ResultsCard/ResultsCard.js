import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import styles from './styles';
import {
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Typography,
  Grid,
  Drawer,
  Button
} from '@material-ui/core/';

class MediaCard extends React.Component {
  state = {
    right: false
  };

  toggleDrawer = (side, open) => () => {
    this.setState({
      [side]: open
    });
  };

  render() {
    const { classes, places } = this.props;

    return (
      <div>
        <Button onClick={this.toggleDrawer('right', true)}>Open Right</Button>

        <Drawer
          anchor="right"
          open={this.state.right}
          onClose={this.toggleDrawer('right', false)}
        >
          <div
            tabIndex={0}
            role="button"
            onClick={this.toggleDrawer('right', false)}
            onKeyDown={this.toggleDrawer('right', false)}
          >
            {places.map(place => {
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
                        <Typography component="p">
                          Rating: {place.rating}
                        </Typography>
                        <Typography component="p">
                          Price Level: {place.price_level}
                        </Typography>
                        <Typography component="p">{place.vicinity}</Typography>
                      </CardContent>
                    </a>
                  </CardActionArea>
                </Card>
              );
            })}
          </div>
        </Drawer>
      </div>
    );
  }
}

MediaCard.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(MediaCard);
