const initState = {};

const eventReducer = (state = initState, action) => {
  switch(action.type){
    case 'Create Event Successful':
      console.log('Create Event Successful')
      return state
    case 'Create Event Error':
      console.log('Create Event Error')
      return state
    default:
      return state
  }
};

export default eventReducer
