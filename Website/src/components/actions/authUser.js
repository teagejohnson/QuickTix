import {getFirebase} from 'react-redux-firebase';

export const signIn = (credentials) => {
  return (dispatch) => {
    const firebase = getFirebase();

    firebase.auth().signInWithEmailAndPassword(
      credentials.email,
      credentials.password
    ).then(() => {
      dispatch({type: 'Login Successful'})
    }).catch((error) => {
      dispatch({type: 'Login Error', error})
    })
  }
};

export const signOut = () => {
  return (dispatch) => {
    const firebase = getFirebase();

    firebase.auth().signOut().then(() => {
      dispatch({type: 'Logout Successful'})
    }).catch((error) => {
      dispatch({type: 'Logout Error', error})
    })
  }
}
