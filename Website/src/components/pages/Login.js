import React, {Component} from 'react';
import {Redirect} from 'react-router-dom';
import {connect} from 'react-redux';
import {firestoreConnect} from 'react-redux-firebase';
import {compose} from 'redux';

import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';

import Logo from '../logos/QuickTixMultiColor.png';
import {mapDispatchToProps, mapStateToProps} from '../actions/mapProps.js';

class Login extends Component {
  state = {
    email: '',
    password: '',
  };

  handleChange = (event) => {
    this.setState({[event.target.id]: event.target.value})
  };

  handleSignIn = (event) => {
    event.preventDefault();
    this.props.signIn(this.state)
  };

  render() {
    if (this.props.auth != null) return <Redirect to = '/' />

    return (
      <div>
        <Box m = {10}>
          <Grid container direction = 'column' alignItems = 'center' alignContent = 'center' spacing = {5} >
            <Grid item>
              <div style = {{display: 'flex', justifyContent: 'center', marginBottom: 20}}>
                <img src = {Logo} alt = 'logo' style = {{width: '50%'}} align = 'center' />
              </div>
            </Grid>
            <Grid item>
              <TextField placeholder = 'Email...' id = 'email' type = 'email' onChange = {this.handleChange} error = {this.props.authError} />
            </Grid>
            <Grid item>
              <TextField placeholder = 'Password...' id = 'password' type = 'password' onChange = {this.handleChange} error = {this.props.authError} />
            </Grid>
            <Grid item>
              <Button variant = 'outlined' onClick = {this.handleSignIn}> Sign In </Button>
            </Grid>
            {this.props.authError ? <Typography style = {{color: 'red'}} variant = 'h6' align = 'center'> Incorrect Email or Password </Typography> : null}
          </Grid>
        </Box>
      </div>
    )
  }
};

export default compose(connect(mapStateToProps, mapDispatchToProps), firestoreConnect([{collection: 'users'}, {collection: 'events', orderBy: ['dateSubmitted', 'desc']}, {collection: 'messages', orderBy: ['timeSubmitted', 'desc']}]))(Login)
