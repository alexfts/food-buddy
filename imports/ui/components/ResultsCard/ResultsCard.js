import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import styles from './styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';

function MediaCard(props) {
  const { classes } = props;
 
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
          component='img'
          src={'https://picsum.photos/200'}
          title="Restaurant Image"
        />
        <CardContent>
          <Typography component="h2">
            Pull restaurant name
          </Typography>
          <Typography component="p">
            Pull restaurant rating
          </Typography>
          <Typography component="p">
            Pull restaurant price_level
          </Typography>
          <Typography component="p">
            Pull restaurant distance
          </Typography>
          <Typography component="p">
            Pull restaurant formatted_address from details
          </Typography>
        </CardContent>
        </a>
      </CardActionArea>
    </Card>
  );
}

MediaCard.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(MediaCard);