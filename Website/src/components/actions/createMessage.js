import {getFirebase} from 'react-redux-firebase';

export const createMessage = (message) => {
  return (dispatch) => {
    const firebase = getFirebase();

    firebase.firestore().collection('messages').add({
      from: message.from,
      to: message.to,
      message: message.message,
      read: message.read,
      thread: message.thread,
      timeSubmitted: new Date().getTime()
    }).then(() => {
      dispatch({type: 'Create Message Successful'})
    }).catch((error) => {
      dispatch({type: 'Create Message Error', error})
    })
  }
}
