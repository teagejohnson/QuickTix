import {getFirebase} from 'react-redux-firebase';

export const updateResult = (doc, result, detail) => {
  return (dispatch) => {
    const firebase = getFirebase();

    firebase.firestore().collection('events').doc(doc).update({
      result: result,
      detail: detail
    }).then(() => {
      console.log('Update Result Successful')
    }).catch((error) => {
      console.log('Update Result Error', error)
    })
  }
}
