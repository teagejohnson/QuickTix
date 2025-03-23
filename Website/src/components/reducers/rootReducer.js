import {firebaseReducer} from 'react-redux-firebase';
import {combineReducers} from 'redux';
import {firestoreReducer} from 'redux-firestore';

import authReducer from './authReducer.js';
import eventReducer from './eventReducer.js';
import messageReducer from './messageReducer.js';
import replyReducer from './replyReducer.js';

const rootReducer = combineReducers({
  auth: authReducer,
  event: eventReducer,
  message: messageReducer,
  reply: replyReducer,
  firesbase: firebaseReducer,
  firestore: firestoreReducer
});

export default rootReducer
