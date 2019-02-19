import React, { Component } from 'react';
import styles from './styles';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import Slider from '@material-ui/lab/Slider';
import { Typography } from '@material-ui/core';

class PriceSlider extends Component {
  constructor(props) {
    super(props);
    this.state = {
      price: 1
    };
  }

  handlePriceChange = (event, price) => {
    let dollars = '';
    for (let i = 0; i < price; i++) {
      dollars += '$';
    }
    this.setState({ price, dollars });
  };

  render() {
    const { classes } = this.props;
    const { price } = this.state;

    return (
      <div className={classes.root}>
        <Typography className={classes.title}>Price Range:</Typography>

        <div className={classes.sliderContainer}>
          <Slider
            className={classes.slider}
            min={1}
            max={4}
            step={1}
            value={price}
            onChange={this.handlePriceChange}
          />

          <ul className={classes.ul}>
            <Typography className={classes.dollars}>
              <li className={classes.dollar}>$</li>
              <li className={classes.dollar}>$$</li>
              <li className={classes.dollar}>$$$</li>
              <li className={classes.dollar}>$$$$</li>
            </Typography>
          </ul>
        </div>
      </div>
    );
  }
}

PriceSlider.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(PriceSlider);
