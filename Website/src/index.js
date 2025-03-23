import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux'
import {ReactReduxFirebaseProvider} from 'react-redux-firebase';
import {applyMiddleware, compose, createStore} from 'redux';
import {createFirestoreInstance, getFirestore, reduxFirestore} from 'redux-firestore';
import thunk from 'redux-thunk';

import './index.css';

import App from './App.js';
import firebase from './firebase.js';
import firebaseConfig from './firebase.js';
import rootReducer from './components/reducers/rootReducer.js';

const store = createStore(rootReducer, compose(applyMiddleware(thunk.withExtraArgument({getFirestore})), reduxFirestore(firebaseConfig)));

const rrfConfig = {
  userProfile: 'users',
  useFirestoreForProfile: true
};

const rrfProps = {
  firebase,
  config: rrfConfig,
  dispatch: store.dispatch,
  createFirestoreInstance
};

ReactDOM.render(
  <Provider store = {store}>
    <ReactReduxFirebaseProvider {...rrfProps}>
      <App />
    </ReactReduxFirebaseProvider>
  </Provider>,
  document.getElementById('root')
);
