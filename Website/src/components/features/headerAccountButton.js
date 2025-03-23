import React, {Component} from 'react';
import {connect} from 'react-redux';
import {firestoreConnect} from 'react-redux-firebase';
import {compose} from 'redux';

import AccountCircle from '@material-ui/icons/AccountCircle';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import Popover from '@material-ui/core/Popover';
import Typography from '@material-ui/core/Typography';

import {mapDispatchToProps, mapStateToProps} from '../actions/mapProps.js';

class AccountButton extends Component {
  state = {
    anchorEl: null
  };

  handleClick = (event) => {
    this.setState({anchorEl: event.currentTarget})
  };

  handleClose = () => {
    this.setState({anchorEl: null})
  };

  handleSignOut = () => {
    this.props.signOut()
  };

  render() {
    return (
      <div>
        <IconButton onClick = {this.handleClick}>
          <AccountCircle style = {{color: 'white'}} />
        </IconButton>
        <Popover
          id = {Boolean(this.state.anchorEl) ? 'simple-popover' : undefined}
          anchorEl = {this.state.anchorEl}
          open = {Boolean(this.state.anchorEl)}
          onClose = {this.handleClose}
          anchorOrigin = {{vertical: 'bottom', horizontal: 'center'}}
          transformOrigin = {{vertical: 'top', horizontal: 'center'}}
        >
          <Box ml = {5} mr = {5} mt = {3} mb = {3}>
            <Grid container direction = 'column' alignItems = 'center' spacing = {2}>
              <Grid item>
                <Typography variant = 'h6'> {this.props.users[this.props.auth.email].name} </Typography>
              </Grid>
              <Grid item>
                <Typography style = {{fontStyle: 'italic'}}> {this.props.users[this.props.auth.email].type} </Typography>
              </Grid>
              <Grid item>
                <Button variant = 'outlined' onClick = {this.handleSignOut}> Sign Out </Button>
              </Grid>
            </Grid>
          </Box>
        </Popover>
      </div>
    )
  }
};

export default compose(connect(mapStateToProps, mapDispatchToProps), firestoreConnect([{collection: 'users'}, {collection: 'events', orderBy: ['dateSubmitted', 'desc']}, {collection: 'messages', orderBy: ['timeSubmitted', 'desc']}]))(AccountButton)
