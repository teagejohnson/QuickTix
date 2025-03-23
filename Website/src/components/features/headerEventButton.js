import React, {Component} from 'react';
import {connect} from 'react-redux';
import {firestoreConnect} from 'react-redux-firebase';
import {compose} from 'redux';

import AddIcon from '@material-ui/icons/Add';
import Box from '@material-ui/core/Box'
import Button from '@material-ui/core/Button';
import CloseIcon from '@material-ui/icons/Close';
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import InputAdornment from '@material-ui/core/InputAdornment';
import Popover from '@material-ui/core/Popover';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';

import {mapDispatchToProps, mapStateToProps} from '../actions/mapProps.js';

class EventButton extends Component {
  state = {
    anchorEl: null,
    dateError: false,
    eventError: false,
    venueError: false,
    sectionError: false,
    rowError: false,
    seatsError: false,
    quantityError: false,
    priceError: false,
    date: '',
    event: '',
    venue: '',
    section: '',
    row: '',
    seats: '',
    quantity: '',
    price: ''
  };

  handleClick = (event) => {
    this.setState({anchorEl: event.currentTarget})
  };

  handleClose = () => {
    this.setState({anchorEl: null})
  };

  handleChange = (event) => {
    this.setState({[event.target.id]: event.target.value, [[event.target.id][0].concat('Error')]: false})
  };

  handleCreateEvent = (event) => {
    event.preventDefault();

    if (this.state.date === '') {
      this.setState({dateError: true})
    };

    if (this.state.event === '') {
      this.setState({eventError: true})
    };

    if (this.state.venue === '') {
      this.setState({venueError: true})
    };

    if (this.state.section === '') {
      this.setState({sectionError: true})
    };

    if (this.state.row === '') {
      this.setState({rowError: true})
    };

    if (this.state.seats === '') {
      this.setState({seatsError: true})
    };

    if (this.state.quantity === '') {
      this.setState({quantityError: true})
    };

    if (this.state.price === '') {
      this.setState({priceError: true})
    };

    if (this.state.date && this.state.event && this.state.venue && this.state.section && this.state.row && this.state.seats && this.state.quantity && this.state.price) {
      this.props.createEvent(this.state)

      this.setState({
        date: '',
        event: '',
        venue: '',
        section: '',
        row: '',
        seats: '',
        quantity: '',
        price: ''
      })
    }
  };

  render() {
    return (
      <div>
        <IconButton onClick = {this.handleClick}>
          <AddIcon style = {{color: 'white'}} />
        </IconButton>
        <Popover
          id = {Boolean(this.state.anchorEl) ? 'simple-popover' : undefined}
          anchorEl = {this.state.anchorEl}
          open = {Boolean(this.state.anchorEl)}
          onClose = {this.handleClose}
          anchorOrigin = {{vertical: 'bottom', horizontal: 'center'}}
          transformOrigin = {{vertical: 'top', horizontal: 'right'}}
        >
          <Box ml = {3} mr = {0} mt = {3} mb = {0}>
            <Button onClick = {this.handleClose}>
              <CloseIcon />
            </Button>
          </Box>
          <Box ml = {5} mr = {5} mt = {0} mb = {3}>
            <Grid container direction = 'column' alignItems = 'center' spacing = {4}>
              <Grid item>
                <Typography variant = 'h5' align = 'center'> Add Tickets </Typography>
              </Grid>
              <Grid item>
                <TextField required label = 'Event Date' value = {this.state.date} id = 'date' type = 'date' style = {{margin: 10}} onChange = {this.handleChange} error = {this.state.dateError} InputLabelProps = {{shrink: true}} />
                <TextField required label = 'Event Name' value = {this.state.event} id = 'event' style = {{margin: 10}} onChange = {this.handleChange} error = {this.state.eventError} InputLabelProps = {{shrink: true}} />
                <TextField required label = 'Venue' value = {this.state.venue} id = 'venue' style = {{margin: 10}} onChange = {this.handleChange} error = {this.state.venueError} InputLabelProps = {{shrink: true}} />
              </Grid>
              <Grid item>
                <TextField required label = 'Section' value = {this.state.section} id = 'section' style = {{margin: 10}} onChange = {this.handleChange} error = {this.state.sectionError} InputLabelProps = {{shrink: true}} />
                <TextField required label = 'Row' value = {this.state.row} id = 'row' style = {{margin: 10}} onChange = {this.handleChange} error = {this.state.rowError} InputLabelProps = {{shrink: true}} />
                <TextField required label = 'Seats' value = {this.state.seats} id = 'seats' style = {{margin: 10}} onChange = {this.handleChange} error = {this.state.seatsError} InputLabelProps = {{shrink: true}} />
              </Grid>
              <Grid item>
                <TextField required label = 'Quantity' value = {this.state.quantity} id = 'quantity' type = 'number' style = {{margin: 10}} onChange = {this.handleChange} error = {this.state.quantityError} InputLabelProps = {{shrink: true}} />
                <TextField required label = 'Total Price' value = {this.state.price} id = 'price' type = 'number' style = {{margin: 10}} onChange = {this.handleChange} error = {this.state.priceError} InputProps = {{startAdornment: <InputAdornment position = 'start'> $ </InputAdornment>}} InputLabelProps = {{shrink: true}} />
              </Grid>
              <Grid item>
                <Button variant = 'outlined' onClick = {this.handleCreateEvent}> Submit </Button>
              </Grid>
            </Grid>
          </Box>
        </Popover>
      </div>
    )
  }
};

export default compose(connect(mapStateToProps, mapDispatchToProps), firestoreConnect([{collection: 'users'}, {collection: 'events', orderBy: ['dateSubmitted', 'desc']}, {collection: 'messages', orderBy: ['timeSubmitted', 'desc']}]))(EventButton)
