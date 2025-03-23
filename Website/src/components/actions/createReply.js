import {getFirebase} from 'react-redux-firebase';

export const createReply = (reply) => {
  return (dispatch) => {
    const firebase = getFirebase();

    firebase.firestore().collection('messages').add({
      from: reply.from,
      to: reply.replyTo,
      message: reply.replyMessage,
      read: reply.replyRead,
      thread: reply.replyThread,
      timeSubmitted: new Date().getTime()
    }).then(() => {
      dispatch({type: 'Create Reply Successful'})
    }).catch((error) => {
      dispatch({type: 'Create Reply Error', error})
    })
  }
}
