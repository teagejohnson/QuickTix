import React, {Component} from 'react';
import {Redirect} from 'react-router-dom';
import {connect} from 'react-redux';
import {firestoreConnect} from 'react-redux-firebase';
import {compose} from 'redux';

import Client from './Client.js';
import Master from './Master.js';
import {mapDispatchToProps, mapStateToProps} from '../actions/mapProps.js'

class PrivateRoute extends Component {
  render() {
    const {auth, users} = this.props;

    if (auth == null) return <Redirect to = '/login' />

    try {
      if (users[auth.email].type === 'Client') return <Client />

      else if (users[auth.email].type === 'Master') return <Master />
    }

    catch {
      return <div></div>
    }
  }
};

export default compose(connect(mapStateToProps, mapDispatchToProps), firestoreConnect([{collection: 'users'}, {collection: 'events', orderBy: ['dateSubmitted', 'desc']}, {collection: 'messages', orderBy: ['timeSubmitted', 'desc']}]))(PrivateRoute)
