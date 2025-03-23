import {getFirebase} from 'react-redux-firebase';

import {signIn, signOut} from './authUser.js';
import {createEvent} from './createEvent.js';
import {createMessage} from './createMessage.js';
import {createReply} from './createReply.js';

export const mapStateToProps = (state) => {
  const auth = getFirebase().auth().currentUser

  if (auth != null) {
    return {
      auth: auth,
      authError: null,
      events: state.firestore.ordered.events,
      messages: state.firestore.ordered.messages,
      users: state.firestore.data.users
    }
  }

  else {
    return {
      auth: null,
      authError: state.auth.authError,
      events: null,
      messages: null,
      users: null
    }
  }
};

export const mapDispatchToProps = (dispatch) => {
  return {
    signIn: (credentials) => dispatch(signIn(credentials)),
    signOut: () => dispatch(signOut()),
    createEvent: (event) => dispatch(createEvent(event)),
    createMessage: (message) => dispatch(createMessage(message)),
    createReply: (reply) => dispatch(createReply(reply))
  }
}
