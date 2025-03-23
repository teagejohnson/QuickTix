import {getFirebase} from 'react-redux-firebase';

export const createEvent = (event) => {
  return (dispatch) => {
    const firebase = getFirebase();

    firebase.firestore().collection('events').add({
      date: event.date.split('-')[1].concat('/', event.date.split('-')[2], '/', event.date.split('-')[0][2], event.date.split('-')[0][3]),
      event: event.event,
      venue: event.venue,
      section: event.section,
      row: event.row,
      seats: event.seats,
      quantity: event.quantity,
      price: event.price,
      action: 'Pending',
      result: 'Pending',
      detail: new Date().getTime(),
      authorEmail: firebase.auth().currentUser.email,
      dateSubmitted: new Date().getTime(),
    }).then(() => {
      dispatch({type: 'Create Event Successful'})
    }).catch((error) => {
      dispatch({type: 'Create Event Error', error})
    })
  }
}
