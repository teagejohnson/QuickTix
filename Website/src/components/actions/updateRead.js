import {getFirebase} from 'react-redux-firebase';

export const updateRead = (doc, dictRead) => {
  const firebase = getFirebase();

  firebase.firestore().collection('messages').doc(doc).update({
    read: dictRead
  }).then(() => {
    console.log('Read Messages Successful')
  }).catch((error) => {
    console.log('Read Messages Error', error)
  })
}
