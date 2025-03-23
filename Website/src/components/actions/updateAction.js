import {getFirebase} from 'react-redux-firebase';

export const updateAction = (doc, action, detail) => {
  return (dispatch) => {
    const firebase = getFirebase();

    firebase.firestore().collection('events').doc(doc).update({
      action: action,
      result: action,
      detail: detail
    }).then(() => {
      console.log('Update Action Successful')
    }).catch((error) => {
      console.log('Update Action Error', error)
    })
  }
}
